const settings = {
  username: `admin`,
  pssword:  `hola666`,
  url: function() {
    return `mongodb://${this.username}:${this.pssword}@ds237868.mlab.com:37868/prueba`
  }
}

module.exports = settings
