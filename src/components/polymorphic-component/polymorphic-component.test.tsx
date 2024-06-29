import { PolymorphicComponent } from './polymorphic-component';
import { render } from '@testing-library/react';

describe('<PolymorphicComponent>', () => {
  it('기본 태그는 div이다.', () => {
    const { container } = render(<PolymorphicComponent />);

    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('as prop을 통해 태그를 변경할 수 있다.', () => {
    const { container } = render(<PolymorphicComponent as="button" />);

    expect(container.firstChild).toBeInstanceOf(HTMLButtonElement);
  });

  it('as를 통해 변경된 태그에는 해당 태그의 속성이 존재한다.', () => {
    const { container } = render(
      <PolymorphicComponent
        as="button"
        type="button"
      />,
    );

    expect(container.firstChild).toHaveAttribute('type', 'button');
  });
});
