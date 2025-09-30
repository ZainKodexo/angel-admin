'use server';
import { api } from '@/shared/lib';
import {
  type ForgetPasswordRequest,
  type ForgetPasswordResponse,
  type ResetPasswordRequest,
  type ResetPasswordResponse,
  type VerifyOTPRequest,
  type VerifyOTPResponse,
} from '../types';

const forgetPassword = async (body: ForgetPasswordRequest) => {
  const data = await api.post<ForgetPasswordResponse>('/user/forget_password', {
    ...body,
  });

  return data;
};

const verifyOtp = async (body: VerifyOTPRequest) => {
  const data = await api.post<VerifyOTPResponse>('/user/verify_otp', {
    ...body,
  });

  return data;
};

const resetPassword = async (body: ResetPasswordRequest) => {
  const data = await api.post<ResetPasswordResponse>('/user/reset_password', {
    ...body,
  });

  return data;
};

export { forgetPassword, verifyOtp, resetPassword };
