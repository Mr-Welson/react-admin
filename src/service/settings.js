const SettingsService = {
  test() {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(true)
      }, 50)
    })
  }
}

export default SettingsService