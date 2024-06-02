import { render, screen } from '@testing-library/react';
import { PolymorphicComponent } from './polymorphic-component';
import { describe, it, expect } from 'vitest';

describe('PolymorphicComponent', () => {
  it(`'as' prop이 전달된 대로 태그를 렌더링 할 수 있다.`, () => {
    const { container } = render(<PolymorphicComponent as="section" />);
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });

  it(`'as' prop이 전달되지 않으면, 기본적으로 div tag로 렌더링 할 수 있다.`, () => {
    const { container } = render(<PolymorphicComponent />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it(`'as' prop이 'a'로 전달되면, 'href' 속성을 전달할 수 있다.`, () => {
    const { container } = render(
      <PolymorphicComponent
        as="a"
        href="https://example.com"
      >
        am I a link?
      </PolymorphicComponent>,
    );

    expect(container.firstChild?.nodeName).toBe('A');
    expect(screen.getByRole('link')).toHaveProperty(
      'href',
      'https://example.com/',
    );
  });

  it(`'as' prop이 'button'일 경우, 'href' 속성이 무시된다.`, () => {
    const { container } = render(
      <PolymorphicComponent
        as="button"
        href="https://example.com"
      >
        am I a button?
      </PolymorphicComponent>,
    );

    expect(container.firstChild?.nodeName).toBe('BUTTON');
    expect(screen.queryByRole('link')).toBeNull();
  });
});
