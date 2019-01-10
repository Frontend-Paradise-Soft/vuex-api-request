// LocalStorage plugin.
const AuthLocalStoragePlugin = ({
  storageKey = 'paradise-soft',
  authModule,
  removeLocalStorageMutationType = 'clear'
}) => {
  if (!authModule) console.error('authModule is required')

  // Sync with local storage.
  if (localStorage.getItem(storageKey)) {
    const syncedState = JSON.parse(localStorage.getItem(storageKey))
    authModule.state = Object.assign(authModule.state, syncedState.auth)
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

export default AuthLocalStoragePlugin
