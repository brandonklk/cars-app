import { VehicleYear } from '@/types/cars';
import { render } from '@testing-library/react-native';
import React from 'react';
import { VehicleModelList } from '../VehicleModelList';

jest.mock('@expo/vector-icons', () => {
  return {
    MaterialIcons: ({ name, size, color }: any) => {
      const { Text } = require('react-native');
      return <Text>{`Icon: ${name}`}</Text>;
    },
  };
});

jest.mock('@/hooks/useThemeColor', () => ({
    useThemeColor: jest.fn(() => ({
        icon: '#000000',
        backgroudCard: '#ffffff',
        text: '#333333',
    })),
}));

jest.mock('@/components/ThemedText', () => {
  const { Text } = require('react-native');
  return {
    ThemedText: ({ children, ...props }: any) => <Text {...props}>{children}</Text>
  };
});

jest.mock('@/components/ThemedView', () => {
  const { View } = require('react-native');
  return {
    ThemedView: ({ children, ...props }: any) => <View {...props}>{children}</View>
  };
});

describe('VehicleModelList', () => {
    const mockModels = [
        { name: 'Modelo A', code: 1 },
        { name: 'Modelo B', code: 2 },
    ];

    const years: VehicleYear[] = []

    it('renders list of vehicle models', () => {
        const { getByText } = render(<VehicleModelList years={years} models={mockModels} />);

        expect(getByText('Modelos disponíveis')).toBeTruthy();
        expect(getByText('Modelo A')).toBeTruthy();
        expect(getByText('Modelo B')).toBeTruthy();
    });

    it('renders empty list message when no models are provided', () => {
        const { getByText } = render(<VehicleModelList years={years} models={[]} />);

        expect(getByText('Nenhum modelo encontrado.')).toBeTruthy();
    });

    it('renders subtitle as list header', () => {
        const { getByText } = render(<VehicleModelList years={years} models={[]} />);
        expect(getByText('Modelos disponíveis')).toBeTruthy();
    });

    it('applies correct styles from useThemeColor', () => {
        const { getByText } = render(<VehicleModelList years={years} models={[{ name: 'Modelo X', code: 99 }]} />);

        const itemText = getByText('Modelo X');
        expect(itemText.props.style).toEqual(
            expect.objectContaining({
                color: '#333333',
                fontSize: 16,
                fontWeight: '600',
                flex: 1,
            })
        );
    });
});
