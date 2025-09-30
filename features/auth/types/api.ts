import {
  ErrorResponse,
  SuccessNullResponse,
  SuccessResponse,
} from '@/shared/types';

type LoginData = {
  token: string;
  is_form_filled: boolean;
};

type SignupData = {
  token: string;
  email: string;
  first_name: string;
  last_name: string;
};

type CreateAccountRequest = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  address_1: string;
  address_2: string;
  country: string;
  state: string;
  phone: string;
};

type ForgetPasswordRequest = {
  email: string;
};

type VerifyOTPRequest = {
  token: number;
};

type ResetPasswordRequest = {
  email: string;
  password: string;
  confirm_password: string;
};

type GoogleSignupRequest = {
  first_name: string;
  last_name: string;
  email: string;
  google_sub: string;
};

interface LoginAccountResponse extends SuccessResponse {
  data: LoginData;
}

interface CreateAccountSuccessResponse extends SuccessResponse {
  data: SignupData;
}

type ValidatTokenResponse = SuccessNullResponse | ErrorResponse;
type LoginResponse = LoginAccountResponse | ErrorResponse;
type CreateAccountResponse = CreateAccountSuccessResponse | ErrorResponse;
type ForgetPasswordResponse = SuccessNullResponse | ErrorResponse;
type VerifyOTPResponse = SuccessNullResponse | ErrorResponse;
type ResetPasswordResponse = SuccessNullResponse | ErrorResponse;
type GoogleSignupResponse = LoginAccountResponse | ErrorResponse;

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export type {
  AuthTokens,
  CreateAccountRequest,
  CreateAccountResponse,
  LoginResponse,
  ForgetPasswordRequest,
  ForgetPasswordResponse,
  VerifyOTPRequest,
  VerifyOTPResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  GoogleSignupRequest,
  GoogleSignupResponse,
  ValidatTokenResponse,
};
