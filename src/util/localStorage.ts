const LS_STATE_KEY = "state";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LS_STATE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LS_STATE_KEY, serializedState);
  } catch (err) {
    // ignore
  }
};

export const clearState = () => localStorage.removeItem(LS_STATE_KEY);
