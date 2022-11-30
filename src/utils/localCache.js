class cacheFZ {
  setCache(key,value) {
    window.localStorage.setItem(key,JSON.stringify(value))
  }
  getCache(key) {
    const data = window.localStorage.getItem(key)
    if(data) {
      return JSON.parse(data)
    }
  }
  deleteCache(key) {
    return window.localStorage.removeItem(key)
  }
  clearCache() {
    return window.localStorage.clearCache()
  }
}

export default new cacheFZ()


