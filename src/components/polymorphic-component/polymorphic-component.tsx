import { forwardRef } from 'react';
import {
  PolymorphicComponentProps,
  PolymorphicComponentType,
  PolymorphicRef,
} from 'types';

export const PolymorphicComponent: PolymorphicComponentType = forwardRef(
  function PolymorphicComponentWithRef<C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C>,
    ref?: PolymorphicRef<C>,
  ) {
    const { as, ...rest } = props;

    const Component = as || 'div';

    return (
      <Component
        ref={ref}
        {...rest}
      />
    );
  },
);
