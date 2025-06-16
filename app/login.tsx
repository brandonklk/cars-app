import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { DismissKeyboardView } from '@/components/ui/DismissKeyboardView';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import { useSignIn } from '@/hooks/useSignIn';
import { UserAuth, UserAuthError } from '@/types/user';
import Toast from 'react-native-toast-message';

const schema = z.object({
  username: z.string({ required_error: 'Campo obrigatório' }).min(2, 'Mínimo de 2 caracteres'),
  password: z.string({ required_error: 'Campo obrigatório' }).min(3, 'Mínimo de 3 caracteres'),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const { login } = useAuth();
  const { mutateAsync, isPending } = useSignIn();

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

const onSubmit = async (data: FormData) => {
  try {
    const result = await mutateAsync({ user: data.username, password: data.password });

    if (!result.error) {
      const userData = (result as UserAuth).user;
      await login(userData);
    } else {
      const error = result as UserAuthError;
      Toast.show({
        type: 'error',
        text1: 'Erro ao fazer login',
        text2: error.message ?? 'Verifique suas credenciais',
      });
    }
  } catch (err) {
    Toast.show({
      type: 'error',
      text1: 'Erro de rede',
      text2: 'Tente novamente mais tarde',
    });
  }
};

  return (
    <DismissKeyboardView className="flex-1 items-center justify-center px-6">
      <ThemedView className="w-full max-w-md">
        <ThemedText className="mb-6 text-center text-3xl font-bold">Bem-vindo 👋</ThemedText>

        <Input control={control} name="username" placeholder="Seu nome de usuário" />
        <Input control={control} name="password" placeholder="Sua senha" secureTextEntry />

        <Button
          title="Entrar"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting || isPending}
          isLoading={isSubmitting || isPending}
        />
      </ThemedView>
    </DismissKeyboardView>
  );
}
