import { render } from '@testing-library/react-native';
import React from 'react';
import { ThemedText } from '../ThemedText';

// Mock do hook useThemeColor
jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(() => ({ text: '#000000' })),
}));

describe('ThemedText component', () => {
  it('should render default text', () => {
    const { getByText } = render(<ThemedText>Default Text</ThemedText>);
    const text = getByText('Default Text');

    expect(text).toBeTruthy();
    expect(text.props.className).toContain('text-base');
  });

  it('should apply "title" type styles', () => {
    const { getByText } = render(<ThemedText type="title">Title</ThemedText>);
    const text = getByText('Title');

    expect(text.props.className).toContain('text-4xl');
    expect(text.props.className).toContain('font-bold');
    expect(text.props.className).toContain('leading-9');
  });

  it('should apply "defaultSemiBold" type styles', () => {
    const { getByText } = render(
      <ThemedText type="defaultSemiBold">SemiBold</ThemedText>
    );
    const text = getByText('SemiBold');

    expect(text.props.className).toContain('font-semibold');
    expect(text.props.className).toContain('leading-6');
  });

  it('should apply "subtitle" type styles', () => {
    const { getByText } = render(<ThemedText type="subtitle">Subtitle</ThemedText>);
    const text = getByText('Subtitle');

    expect(text.props.className).toContain('text-xl');
    expect(text.props.className).toContain('font-bold');
    expect(text.props.className).toContain('leading-7');
  });

  it('should apply "link" type styles', () => {
    const { getByText } = render(<ThemedText type="link">Link</ThemedText>);
    const text = getByText('Link');

    expect(text.props.className).toContain('text-blue-600');
    expect(text.props.className).toContain('underline');
  });

  it('should merge custom className and style', () => {
    const { getByText } = render(
      <ThemedText className="custom-class" style={{ fontSize: 20 }}>
        Styled
      </ThemedText>
    );
    const text = getByText('Styled');

    expect(text.props.className).toContain('custom-class');
    expect(text.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ fontSize: 20 })])
    );
  });
});
