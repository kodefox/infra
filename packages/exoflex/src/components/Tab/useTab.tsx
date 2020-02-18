import React, { useContext, createContext, ReactNode, useReducer } from 'react';

type TabState = {
  scrollPercentage: number;
};

type TabAction = {
  type: 'CHANGE_SCROLL_PERCENTAGE';
  scrollPercentage: number;
};

type Dispatch = (action: TabAction) => void;

const INITIAL_STATE: TabState = {
  scrollPercentage: 0,
};

function tabReducer(state: TabState, action: TabAction) {
  switch (action.type) {
    case 'CHANGE_SCROLL_PERCENTAGE':
      let { scrollPercentage } = action;
      return { ...state, scrollPercentage };
    default:
      return state;
  }
}

const TabStateContext = createContext<TabState | null>(null);
const TabDispatchContext = createContext<Dispatch | null>(null);

function TabProvider(props: { children: ReactNode }) {
  let [state, dispatch] = useReducer(tabReducer, INITIAL_STATE);
  return (
    <TabStateContext.Provider value={state}>
      <TabDispatchContext.Provider value={dispatch}>
        {props.children}
      </TabDispatchContext.Provider>
    </TabStateContext.Provider>
  );
}

function useTabState() {
  let context = useContext(TabStateContext);
  if (!context) {
    throw new Error('useTabState must be used within a TabProvider');
  }
  return context;
}

function useTabDispatch() {
  let context = useContext(TabDispatchContext);
  if (!context) {
    throw new Error('useTabDispatch must be used within a TabProvider');
  }
  return context;
}

function useTab() {
  let { scrollPercentage } = useTabState();
  let dispatch = useTabDispatch();

  let changeScrollPercentage = (scrollPercentage: number) =>
    dispatch({ type: 'CHANGE_SCROLL_PERCENTAGE', scrollPercentage });

  return {
    scrollPercentage,
    changeScrollPercentage,
  };
}

export {
  useTab,
  TabProvider,
  useTabState,
  useTabDispatch,
  TabStateContext,
  TabDispatchContext,
};
