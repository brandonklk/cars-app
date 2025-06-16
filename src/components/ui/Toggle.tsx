import React from 'react';
import { Switch, ViewStyle } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

interface ToggleProps {
    label?: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
    style?: ViewStyle;
}

export function Toggle({ label, value, onValueChange, style }: ToggleProps) {
    return (
        <ThemedView className="flex-row items-center justify-between" style={style}>
            {label && <ThemedText className="text-white text-base">{label}</ThemedText>}
            <Switch
                trackColor={{ false: '#D1D1D6', true: '#34C759' }}
                thumbColor="#ffffff"
                ios_backgroundColor="#D1D1D6"
                onValueChange={onValueChange}
                value={value}
            />
        </ThemedView>
    );
}
