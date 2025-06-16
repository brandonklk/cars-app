import { zodResolver } from '@hookform/resolvers/zod';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Text } from 'react-native';
import { z } from 'zod';
import { Input } from '../Input';

// Mock ThemedText to prevent errors during test
jest.mock('../../ThemedText', () => {
  const { Text } = require('react-native');
  return {
    ThemedText: ({ children, ...rest }: any) => <Text {...rest}>{children}</Text>,
  };
});

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

describe('Input component', () => {
  it('should render the input and update its value', () => {
    const TestForm = () => {
      const { control } = useForm({ defaultValues: { email: '' } });
      return <Input control={control} name="email" placeholder="E-mail" />;
    };

    const { getByPlaceholderText } = render(<TestForm />);
    const input = getByPlaceholderText('E-mail');

    fireEvent.changeText(input, 'user@test.com');
    expect(input.props.value).toBe('user@test.com');
  });

  it('should show validation error messages when fields are invalid', async () => {
    const TestForm = () => {
      const {
        control,
        handleSubmit,
      } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { email: '', password: '' },
      });

      const onSubmit = jest.fn();

      return (
        <>
          <Input control={control} name="email" placeholder="E-mail" />
          <Input control={control} name="password" placeholder="Senha" secureTextEntry />
          <Text onPress={handleSubmit(onSubmit)}>Submit</Text>
        </>
      );
    };

    const { getByPlaceholderText, getByText, findByText } = render(<TestForm />);
    const emailInput = getByPlaceholderText('E-mail');
    const passwordInput = getByPlaceholderText('Senha');

    fireEvent.changeText(emailInput, 'invalid-email');
    fireEvent.changeText(passwordInput, '123');

    fireEvent.press(getByText('Submit'));

    expect(await findByText('Invalid email')).toBeTruthy();
    expect(await findByText('Password must be at least 6 characters long')).toBeTruthy();
  });

  it('should not show validation errors when fields are valid', async () => {
    const TestForm = () => {
      const {
        control,
        handleSubmit,
      } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { email: '', password: '' },
      });

      const onSubmit = jest.fn();

      return (
        <>
          <Input control={control} name="email" placeholder="E-mail" />
          <Input control={control} name="password" placeholder="Senha" secureTextEntry />
          <Text onPress={handleSubmit(onSubmit)}>Submit</Text>
        </>
      );
    };

    const { getByPlaceholderText, getByText, queryByText } = render(<TestForm />);
    const emailInput = getByPlaceholderText('E-mail');
    const passwordInput = getByPlaceholderText('Senha');

    fireEvent.changeText(emailInput, 'user@example.com');
    fireEvent.changeText(passwordInput, '123456');

    fireEvent.press(getByText('Submit'));

    await waitFor(() => {
      expect(queryByText('Invalid email')).toBeNull();
      expect(queryByText('Password must be at least 6 characters long')).toBeNull();
    });
  });
});
