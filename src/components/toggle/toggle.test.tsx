import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Toggle } from './toggle';

describe('Toggle 컴포넌트', () => {
  it('toggle 버튼을 클릭하면, on과 off 상태가 번갈아 변경된다', () => {
    const { getByText, queryByText } = render(<Toggle />);
    const toggleButton = getByText('toggle');
    const status = queryByText(/The button is/i);

    expect(status?.textContent).toBe('The button is off');

    fireEvent.click(toggleButton);
    expect(status?.textContent).toBe('The button is on');

    fireEvent.click(toggleButton);
    expect(status?.textContent).toBe('The button is off');
  });

  it('on 버튼을 클릭하면, 상태가 on이 된다', () => {
    const { getByText } = render(<Toggle />);
    const onButton = getByText('on');
    const status = getByText(/The button is/i);

    fireEvent.click(onButton);
    expect(status.textContent).toBe('The button is on');
  });

  it('off 버튼을 클릭하면, 상태가 off가 된다', () => {
    const { getByRole } = render(<Toggle />);
    const offButton = getByRole('button', { name: 'off' });
    const status = getByRole('status');

    fireEvent.click(offButton!);
    expect(status.textContent).toBe('off');
  });
});
