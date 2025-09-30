import { IAuthService } from './types';
import { NextCookieService } from './NextCookieService';

class Service implements IAuthService {
  private static instance: Service | null = null;
  private isRefreshing: boolean = false;
  private refreshPromise: Promise<void> | null = null;

  private constructor() {}

  public static getInstance(): Service {
    if (!Service.instance) {
      Service.instance = new Service();
    }
    return Service.instance;
  }

  async handleAuthResponse(response: Response): Promise<void> {
    const setCookieHeader = response.headers.get('set-cookie');

    if (setCookieHeader) {
      const setCookieHeaders = setCookieHeader.split(',');

      setCookieHeaders.forEach((cookieStr: string) => {
        const cookieData = NextCookieService.parseSetCookieHeader(cookieStr);
        if (cookieData && cookieData.name && cookieData.value) {
          NextCookieService.setCookie(
            cookieData.name,
            cookieData.value,
            cookieData.options,
          );
        }
      });
    }
  }

  async refreshTokens(): Promise<void> {
    if (this.isRefreshing) {
      return this.refreshPromise!;
    }

    this.isRefreshing = true;
    const refreshToken = NextCookieService.getCookie('refresh_token');

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      this.refreshPromise = (async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
          {
            method: 'POST',
            credentials: 'include',
            headers: {
              Cookie: `refresh_token=${refreshToken}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Failed to refresh token');
        }

        await this.handleAuthResponse(response);
      })();

      await this.refreshPromise;
    } catch (error) {
      NextCookieService.deleteCookie('access_token');
      NextCookieService.deleteCookie('refresh_token');
      throw error;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }
}

const AuthService = Service.getInstance();
export { AuthService };
