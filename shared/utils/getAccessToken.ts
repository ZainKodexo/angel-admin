'use server';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

const getAccessToken = () => {
  try {
    const accessToken = getCookie('access_token', { cookies });

    return {
      accessToken,
    };
  } catch (error) {
    return {
      accessToken: null,
    };
  }
};
export { getAccessToken };
