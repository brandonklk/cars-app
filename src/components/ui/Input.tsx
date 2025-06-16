import { Controller } from 'react-hook-form';
import { TextInput, View } from 'react-native';
import { ThemedText } from '../ThemedText';

interface InputProps {
  control: any;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
}

export function Input({ control, name, placeholder, secureTextEntry = false }: InputProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className="mb-4 w-full">
          <TextInput
            className={`w-full rounded border p-6
              text-black dark:text-white
              bg-white dark:bg-gray-800
              ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            placeholder={placeholder}
            placeholderTextColor="#999"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={secureTextEntry}
          />
          {error && (
            <ThemedText type="title">
              {error.message}
            </ThemedText>
          )}
        </View>
      )}
    />
  );
}
