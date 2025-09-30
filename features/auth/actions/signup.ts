'use server';
import { api } from '@/shared/lib';
import {
  CreateAccountRequest,
  CreateAccountResponse,
  GoogleSignupRequest,
  GoogleSignupResponse,
} from '../types';

const signup = async (body: CreateAccountRequest) => {
  const data = await api.post<CreateAccountResponse>('/user/register', {
    ...body,
  });

  return data;
};

const googleSignup = async (body: GoogleSignupRequest) => {
  const data = await api.post<GoogleSignupResponse>('/user/google_auth', {
    ...body,
  });

  return data;
};

const getuserInfoFromGoogle = async (access_token: string) => {
  const data = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  const response = await data.json();

  return response;
};

export { signup, googleSignup, getuserInfoFromGoogle };
