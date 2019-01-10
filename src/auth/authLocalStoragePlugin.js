// LocalStorage plugin.
const AuthLocalStoragePlugin = ({storageKey = 'paradise-soft'}) => {
  return (store) => {
    // Sync with local storage.
    if (localStorage.getItem(constants.STORAGE_KEY)) {
      const syncedState = JSON.parse(localStorage.getItem(constants.STORAGE_KEY))
      auth.state = Object.assign(auth.state, syncedState.auth)
    }

    store.subscribe((mutation, state) => {
      const syncedData = {auth: state.auth}
  
      localStorage.setItem(storageKey, JSON.stringify(syncedData))
  
      if (mutation.type === 'clear') {
        localStorage.removeItem(storageKey)
      }
    })
  }
}

export default AuthLocalStoragePlugin
