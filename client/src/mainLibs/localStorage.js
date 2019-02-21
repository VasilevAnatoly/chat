export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('chatStore');
    if (serializedState === null) {
      return {
        apiRequestStore: {}
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('chatStore', serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};