import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Toggle } from '../Toggle';

// Mock para evitar problemas com ThemedText e ThemedView
jest.mock('../../ThemedText', () => {
    const { Text } = require('react-native');
    return {
        ThemedText: ({ children, ...props }: any) => <Text {...props}>{children}</Text>,
    };
});

jest.mock('../../ThemedView', () => {
    const { View } = require('react-native');
    return {
        ThemedView: ({ children, ...props }: any) => <View {...props}>{children}</View>,
    };
});

describe('Toggle component', () => {
    it('should render with label', () => {
        const { getByText } = render(
            <Toggle label="Receive updates" value={false} onValueChange={() => { }} />
        );

        expect(getByText('Receive updates')).toBeTruthy();
    });

    it('should not render label if not provided', () => {
        const { queryByText } = render(
            <Toggle value={true} onValueChange={() => { }} />
        );

        expect(queryByText(/.+/)).toBeNull();
    });

    it('should reflect the value passed via props', () => {
        const { getByRole } = render(
            <Toggle label="Active" value={true} onValueChange={() => { }} />
        );

        const switchComponent = getByRole('switch');
        expect(switchComponent.props.value).toBe(true);
    });

    it('should call onValueChange when toggled', () => {
        const onValueChangeMock = jest.fn();

        const { getByRole } = render(
            <Toggle label="Notifications" value={false} onValueChange={onValueChangeMock} />
        );

        const switchComponent = getByRole('switch');
        fireEvent(switchComponent, 'valueChange', true);

        expect(onValueChangeMock).toHaveBeenCalledWith(true);
    });
});
