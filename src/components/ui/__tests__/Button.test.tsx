import { Button } from '@/components/ui/Button';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

describe('Button component', () => {
    it('renders with a title', () => {
        const { getByText } = render(<Button title="Clique aqui" />);
        expect(getByText('Clique aqui')).toBeTruthy();
    });

    it('calls onPress when pressed', () => {
        const onPressMock = jest.fn();
        const rolerName = "button"

        const { getByRole } = render(<Button title="Entrar" accessibilityRole={rolerName} onPress={onPressMock} />);
        const button = getByRole(rolerName);

        fireEvent.press(button);
        expect(onPressMock).toHaveBeenCalled();
    });

    it('renders loading indicator when isLoading is true', () => {
        const testID = 'loading-indicator'
        const title = "Carregando"

        const { queryByText, getByTestId } = render(<Button title={title} testID={testID} isLoading />);
        expect(queryByText(title)).toBeNull();
        expect(getByTestId(testID)).toBeTruthy();
    });

    it('disables button when isLoading is true', () => {
        const title = "Carregando"
        const rolerName = "button"
        const { getByRole } = render(<Button title={title} accessibilityRole={rolerName} isLoading />);
        const button = getByRole(rolerName);
        expect(button).toBeDisabled();
    });
});
