// LocalStorage plugin.
const LocalStoragePlugin = ({
  storageKey = 'paradise-soft',
  vuexModule,
  clearWhen = (state, oldState) => {}
}) => {
  if (!vuexModule) return console.error('vuexModule is required')
  const [moduleName, moduleObject] = vuexModule

  // Sync with local storage.
  if (localStorage.getItem(storageKey)) {
    const syncedState = JSON.parse(localStorage.getItem(storageKey))
    moduleObject.state = Object.assign(moduleObject.state, syncedState[moduleName])
  }

  return (store) => {
    let oldState

    store.subscribe((mutation, state) => {
      const syncedData = {[moduleName]: state[moduleName]}

      if (oldState && clearWhen(state[moduleName], oldState && oldState[moduleName])) {
        localStorage.removeItem(storageKey)
      } else {
        localStorage.setItem(storageKey, JSON.stringify(syncedData))
      }

      oldState = JSON.parse(JSON.stringify(syncedData))
    })
  }
}

export default LocalStoragePlugin
