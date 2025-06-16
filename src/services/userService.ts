import { SignInInput, UserAuth, UserAuthError } from '@/types/user';
import axiosInstance from './axios';

const BASE_URL = 'https://test-api-y04b.onrender.com';

export async function signIn(data: SignInInput): Promise<UserAuth | UserAuthError> {
  const response = await axiosInstance.post(`${BASE_URL}/signIn`, data);
  console.log('signIn ', {response, data});
  
  return response.data;
}
