import { useReducer } from 'react';

enum DisclosureStates {
  Open,
  Closed,
}

interface DisclosureStateDefinition {
  state: DisclosureStates;
}

enum DisclosureActionTypes {
  Toggle,
  Close,
}

type DisclosureActions = {
  type: DisclosureActionTypes;
};

function disclosureReducer(
  { state: prevState }: DisclosureStateDefinition,
  action: DisclosureActions,
): DisclosureStateDefinition {
  switch (action.type) {
    case DisclosureActionTypes.Toggle:
      return {
        state:
          prevState === DisclosureStates.Open
            ? DisclosureStates.Closed
            : DisclosureStates.Open,
      };
    case DisclosureActionTypes.Close:
      return {
        state: DisclosureStates.Closed,
      };
    default:
      throw new Error(`Unsupported action type: ${action}`);
  }
}

function useDisclosureReducer(
  defaultOpen: boolean = false,
): [DisclosureStateDefinition, (action: DisclosureActions) => void] {
  return useReducer(disclosureReducer, {
    state: defaultOpen ? DisclosureStates.Open : DisclosureStates.Closed,
  });
}

function useDisclosure(defaultOpen: boolean = false): {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
} {
  const [{ state }, dispatch] = useDisclosureReducer(defaultOpen);

  const toggle = () => {
    dispatch({
      type: DisclosureActionTypes.Toggle,
    });
  };
  const close = () => {
    dispatch({
      type: DisclosureActionTypes.Close,
    });
  };

  return {
    isOpen: state === DisclosureStates.Open,
    toggle,
    close,
  };
}

interface DisclosureProps {
  defaultOpen?: boolean;
  children: (props: {
    isOpen: boolean;
    toggle: () => void;
    close: () => void;
  }) => JSX.Element;
}

export function Disclosure({
  defaultOpen = false,
  children,
}: DisclosureProps): JSX.Element {
  const disclosureProps = useDisclosure(defaultOpen);

  return children(disclosureProps);
}
