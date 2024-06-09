import { render, fireEvent } from '@testing-library/react';
import { Disclosure } from './disclosure';
import { describe, expect, it } from 'vitest';

describe('<Disclosure>', () => {
  it('<Disclosure> 컴포넌트의 isOpen 초기 상태는 false이다.', () => {
    const { getByText } = render(
      <Disclosure>
        {({ isOpen }) => <button>{isOpen ? 'open' : 'close'}</button>}
      </Disclosure>,
    );

    expect(getByText('close')).toBeTruthy();
  });

  it('<Disclosure> 컴포넌트의 toggle 함수를 호출하면 isOpen 상태가 토글된다.', () => {
    const { getByText } = render(
      <Disclosure>
        {({ isOpen, toggle }) => (
          <button onClick={toggle}>{isOpen ? 'open' : 'close'}</button>
        )}
      </Disclosure>,
    );

    const button = getByText('close');
    fireEvent.click(button);

    expect(getByText('open')).toBeTruthy();

    fireEvent.click(button);
    fireEvent.click(button);

    expect(getByText('open')).toBeTruthy();
  });

  it('<Disclosure> 컴포넌트의 close 함수를 호출하면 isOpen 상태가 false로 변경된다.', () => {
    const { getByText } = render(
      <Disclosure>
        {({ isOpen, close }) => (
          <button onClick={close}>{isOpen ? 'open' : 'close'}</button>
        )}
      </Disclosure>,
    );

    const button = getByText('close');
    fireEvent.click(button);

    expect(getByText('close')).toBeTruthy();
  });
});
