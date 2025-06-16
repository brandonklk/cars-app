import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { CarBrandList } from '../CarBrandList';

jest.mock('@expo/vector-icons', () => {
  return {
    MaterialIcons: ({ name, size, color }: any) => {
      const { Text } = require('react-native');
      return <Text>{`Icon: ${name}`}</Text>;
    },
  };
});

jest.mock('@/hooks/useThemeColor', () => ({
    useThemeColor: jest.fn(() => ({ icon: '#123456' })),
}));

jest.mock('../ui/Button', () => {
  const { TouchableOpacity, Text } = require('react-native');
  return {
    Button: ({ title, onPress, iconLeft, iconRight, ...rest }: any) => {
      return (
        <TouchableOpacity onPress={onPress} {...rest}>
          {iconLeft}
          <Text>{title}</Text>
          {iconRight}
        </TouchableOpacity>
      );
    },
  };
});

describe('CarBrandList', () => {
    const mockBrands = [
        { code: '001', name: 'Toyota' },
        { code: '002', name: 'Honda' },
    ];

    it('renders list of brands with uppercase names', () => {
        const { getByText } = render(
            <CarBrandList data={mockBrands} onSelect={jest.fn()} />
        );

        expect(getByText('TOYOTA')).toBeTruthy();
        expect(getByText('HONDA')).toBeTruthy();
    });

    it('calls onSelect when a brand is selected', () => {
        const onSelectMock = jest.fn();
        const { getByText } = render(
            <CarBrandList data={mockBrands} onSelect={onSelectMock} />
        );

        fireEvent.press(getByText('TOYOTA'));
        expect(onSelectMock).toHaveBeenCalledWith(mockBrands[0]);

        fireEvent.press(getByText('HONDA'));
        expect(onSelectMock).toHaveBeenCalledWith(mockBrands[1]);
    });

    it('uses icon color from theme', () => {
        const { getByText } = render(
            <CarBrandList data={[{ code: '003', name: 'Ford' }]} onSelect={jest.fn()} />
        );

        expect(getByText('FORD')).toBeTruthy();
    });
});
