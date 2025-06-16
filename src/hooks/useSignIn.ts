import { signIn } from '@/services/userService';
import { SignInInput, UserAuth, UserAuthError } from '@/types/user';
import { useMutation } from '@tanstack/react-query';

type SignInResponse = UserAuth | UserAuthError;

export function useSignIn() {
  return useMutation<SignInResponse, UserAuthError, SignInInput>({
    mutationFn: signIn,
  });
}
