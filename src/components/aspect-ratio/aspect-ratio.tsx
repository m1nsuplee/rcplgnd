import { ElementType, forwardRef } from 'react';
import {
  PolymorphicComponentProps,
  PolymorphicComponentType,
  PolymorphicRef,
} from 'types';

interface AspectRatioProps {
  ratio?: number;
}

type AspectRatioComponentType = PolymorphicComponentType<AspectRatioProps>;

export const AspectRatio: AspectRatioComponentType = forwardRef(
  function AspectRatioWithRef<C extends ElementType = 'div'>(
    props: PolymorphicComponentProps<C> & AspectRatioProps,
    ref?: PolymorphicRef<C>,
  ) {
    const { as, ratio = 1 / 1, style, ...rest } = props;

    const Component = as || 'div';

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: `${100 / ratio}%`,
        }}
      >
        <Component
          {...rest}
          ref={ref}
          style={{
            ...style,
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        />
      </div>
    );
  },
);
