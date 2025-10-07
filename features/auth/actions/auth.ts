'use server';
import { api } from '@/shared/lib';
import {
  Profile,
  type ForgetPasswordRequest,
  type ForgetPasswordResponse,
  type ResetPasswordRequest,
  type ResetPasswordResponse,
  type VerifyOTPRequest,
  type VerifyOTPResponse,
} from '../types';
import { cookies } from 'next/headers';

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const data = await api.post('/admin/auth/login', {
    email,
    password,
  });

  return data;
};

const forgetPassword = async (body: ForgetPasswordRequest) => {
  const data = await api.post<ForgetPasswordResponse>(
    '/admin/auth/forgot-password',
    {
      ...body,
    },
  );

  return data;
};

const verifyOtp = async (body: VerifyOTPRequest) => {
  const data = await api.post<VerifyOTPResponse>(
    '/admin/auth/verify-reset-password-otp',
    {
      ...body,
    },
  );

  return data;
};

const resetPassword = async (body: ResetPasswordRequest) => {
  const data = await api.post<ResetPasswordResponse>(
    '/admin/auth/reset-password',
    {
      ...body,
    },
  );

  return data;
};

const getProfile = async () => {
  const data = await api.get<Profile>('/admin/auth/profile');
  return data;
};

const logout = async () => {
  const cookieStore = await cookies();

  cookieStore.set('access_token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 0,
  });

  cookieStore.set('refresh_token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 0,
  });
  return {
    success: true,
    message: 'Logout successfully',
    data: '',
    status: 200,
  };
};
export { login, forgetPassword, verifyOtp, resetPassword, getProfile, logout };
