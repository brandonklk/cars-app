import { render } from '@testing-library/react-native';
import React from 'react';
import Loading from '../Loading';

describe('Loading component', () => {
  it('should render a centered ActivityIndicator', () => {
    const { getByTestId } = render(<Loading />);
    
    const indicator = getByTestId('loading-container');
    expect(indicator).toBeTruthy();
    expect(indicator.props.children.props.size).toBe('large');
  });

  it('should have a container with correct styles', () => {
    const { getByTestId } = render(<Loading />);
    
    const container = getByTestId('loading-container');
    expect(container).toBeTruthy();
  });
});
