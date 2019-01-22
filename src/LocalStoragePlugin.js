// LocalStorage plugin.
const LocalStoragePlugin = ({ storageKey = 'paradise-soft', vuexModule }) => {
  if (!vuexModule) return console.error('vuexModule is required');
  const [moduleName, moduleObject] = vuexModule;

  // Sync with local storage.
  if (localStorage.getItem(storageKey)) {
    const syncedState = JSON.parse(localStorage.getItem(storageKey));
    moduleObject.state = Object.assign(moduleObject.state, syncedState[moduleName]);
  }

  return (store) => {
    store.subscribe((mutation, state) => {
      const syncedData = { [moduleName]: state[moduleName] };

      localStorage.setItem(storageKey, JSON.stringify(syncedData));

      if (mutation.type.toLocaleLowerCase() === `${moduleName}/clear`) {
        localStorage.removeItem(storageKey);
      }
    });
  };
};

export default LocalStoragePlugin;
