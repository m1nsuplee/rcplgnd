import React from 'react';

type PolymorphicComponentProps<E extends React.ElementType> = {
  as?: E;
} & React.ComponentPropsWithoutRef<E>;

export const PolymorphicComponent = React.forwardRef(
  <E extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<E>,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const { as: Element = 'div', ...rest } = props;

    return (
      <Element
        ref={ref}
        {...rest}
      />
    );
  },
);
