import auth from './store'

// LocalStorage plugin.
const authLocalStoragePlugin = ({storageKey = 'paradise-soft'}) => {
  // Sync with local storage.
  if (localStorage.getItem(constants.STORAGE_KEY)) {
    const syncedState = JSON.parse(localStorage.getItem(constants.STORAGE_KEY))
    auth.state = Object.assign(auth.state, syncedState.auth)
  }

  return (store) => {
    store.subscribe((mutation, state) => {
      const syncedData = {auth: state.auth}
  
      localStorage.setItem(storageKey, JSON.stringify(syncedData))
  
      if (mutation.type === 'clear') {
        localStorage.removeItem(storageKey)
      }
    })
  }
}

export default authLocalStoragePlugin
