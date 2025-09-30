import { cookies, type UnsafeUnwrappedCookies } from 'next/headers';
import { Cookie, CookieOptions, ICookieService } from './types';
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';

class Service implements ICookieService {
  private static instance: Service | null = null;
  private currentRequestCookies?: RequestCookies;

  private constructor() {}

  public static getInstance(): Service {
    if (!Service.instance) {
      Service.instance = new Service();
    }
    return Service.instance;
  }

  public setRequestCookies(requestCookies: RequestCookies) {
    this.currentRequestCookies = requestCookies;
  }

  private async getCookieStore() {
    if (this.currentRequestCookies) {
      return this.currentRequestCookies;
    }

    try {
      return (await cookies()) as unknown as UnsafeUnwrappedCookies;
    } catch (error) {
      throw new Error('Cookie operation attempted outside request context');
    }
  }

  async setCookie(
    name: string,
    value: string,
    options: CookieOptions = {},
  ): Promise<void> {
    const cookieStore = await this.getCookieStore();
    cookieStore.set(name, value, options);
  }

  async getCookie(name: string) {
    const cookieStore = await this.getCookieStore();
    return cookieStore.get(name)?.value;
  }

  async deleteCookie(name: string): Promise<void> {
    const cookieStore = await this.getCookieStore();
    cookieStore.delete(name);
  }

  parseSetCookieHeader(cookieStr: string): Cookie | null {
    const parts = cookieStr
      .trim()
      .split(';')
      .map((part) => part.trim());
    const nameValuePart = parts[0];

    if (!nameValuePart) {
      return null;
    }

    const nameValueSplit = nameValuePart.split('=');
    if (nameValueSplit.length !== 2) {
      return null;
    }

    const [name, value] = nameValueSplit;
    const options = parts.slice(1);

    const cookieOptions: CookieOptions = {};

    options.forEach((option) => {
      const optionParts = option.split('=').map((str) => str.trim());
      const optName = optionParts[0];
      const optValue = optionParts[1];

      if (!optName) return;

      switch (optName.toLowerCase()) {
        case 'max-age':
          if (optValue) cookieOptions.maxAge = parseInt(optValue);
          break;
        case 'expires':
          if (optValue) cookieOptions.expires = new Date(optValue);
          break;
        case 'path':
          if (optValue) cookieOptions.path = optValue;
          break;
        case 'httponly':
          cookieOptions.httpOnly = true;
          break;
        case 'secure':
          cookieOptions.secure = true;
          break;
        case 'samesite':
          if (optValue) {
            const sameSite = optValue.toLowerCase();
            if (
              sameSite === 'strict' ||
              sameSite === 'lax' ||
              sameSite === 'none'
            ) {
              cookieOptions.sameSite = sameSite;
            }
          }
          break;
      }
    });

    if (!name) {
      return null;
    }

    return {
      name: name.trim(),
      value: value || '',
      options: cookieOptions,
    };
  }
}

const NextCookieService = Service.getInstance();
export { NextCookieService };
