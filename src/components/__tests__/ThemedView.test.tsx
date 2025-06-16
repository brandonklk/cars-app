import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { ThemedView } from '../ThemedView';

// Mock do hook useThemeColor
jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(() => ({ background: '#123456' })),
}));

describe('ThemedView component', () => {
  it('should render with background color from theme', () => {
    const { getByTestId } = render(
      <ThemedView testID="themed-view" />
    );

    const view = getByTestId('themed-view');
    expect(view.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: '#123456' })])
    );
  });

  it('should merge passed styles with theme background', () => {
    const { getByTestId } = render(
      <ThemedView testID="themed-view" style={{ padding: 10 }} />
    );

    const view = getByTestId('themed-view');
    expect(view.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: '#123456' }),
        expect.objectContaining({ padding: 10 }),
      ])
    );
  });

  it('should render children inside the view', () => {
    const { getByText } = render(
      <ThemedView>
        <Text>Hello</Text>
      </ThemedView>
    );

    expect(getByText('Hello')).toBeTruthy();
  });
});
