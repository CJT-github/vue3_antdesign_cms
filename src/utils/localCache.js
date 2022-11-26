class cacheFZ {
  setCache(key,value) {
    window.localStorage.setItem(key,value)
  }
  getCache(key) {
  window.localStorage.getItem(key)
  }
  deleteCache(key) {
    window.localStorage.removeItem(key)
  }
  clearCache() {
    window.localStorage.clearCache()
  }
}

export default new cacheFZ()


