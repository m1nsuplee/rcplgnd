import { render, screen } from '@testing-library/react';
import { AspectRatio } from './aspect-ratio';

describe('AspectRatio', () => {
  it('렌더링된다.', () => {
    render(<AspectRatio>Content</AspectRatio>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('기본 ratio는 1:1이다.', () => {
    const { container } = render(<AspectRatio>Content</AspectRatio>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle('padding-bottom: 100%');
  });

  it('ratio에 따라 padding-bottom 값이 변한다.', () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9}>Content</AspectRatio>,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle('padding-bottom: 56.25%');
  });

  it('as에 따라 다른 태그가 결정된다.', () => {
    render(<AspectRatio as="section">Content</AspectRatio>);
    expect(screen.getByText('Content').tagName).toBe('SECTION');
  });

  it('ref를 전달할 수 있다.', () => {
    const ref = { current: null };
    render(<AspectRatio ref={ref}>Content</AspectRatio>);
    expect(ref.current).not.toBeNull();
  });

  it('Prop이 정상적으로 전달된다.', () => {
    render(<AspectRatio data-testid="test-id">Content</AspectRatio>);
    expect(screen.getByTestId('test-id')).toBeInTheDocument();
  });
});
