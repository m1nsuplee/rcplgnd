import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
  ReactNode,
} from 'react';

interface AsProp<C extends ElementType> {
  as?: C;
}

type PolymorphicComponentPropsWithoutRef<
  C extends ElementType,
  Props = unknown,
> = PropsWithChildren<Props & AsProp<C> & ComponentPropsWithoutRef<C>>;

export type PolymorphicComponentProps<
  C extends ElementType,
  Props = unknown,
> = PolymorphicComponentPropsWithoutRef<C, Props> & { ref?: PolymorphicRef<C> };

export type PolymorphicRef<C extends ElementType> =
  ComponentPropsWithRef<C>['ref'];

export type PolymorphicComponentType<
  Props = unknown,
  DefaultType extends ElementType = 'div',
> = <C extends ElementType = DefaultType>(
  props: PolymorphicComponentProps<C, Props>,
) => ReactNode;
