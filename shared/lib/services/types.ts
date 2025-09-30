interface CookieOptions {
  maxAge?: number;
  expires?: Date;
  path?: string;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

interface Cookie {
  name: string;
  value: string;
  options: CookieOptions;
}

interface ICookieService {
  setCookie(name: string, value: string, options: CookieOptions): void;
  getCookie(name: string): Promise<string | undefined>;
  deleteCookie(name: string): void;
  parseSetCookieHeader(cookieHeader: string): Cookie | null;
}

interface IAuthService {
  handleAuthResponse(response: Response): Promise<void>;
  refreshTokens(): Promise<void>;
}

export type { IAuthService, ICookieService, Cookie, CookieOptions };
