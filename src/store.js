function Store() {
  const self = this;

  self.session = {
    isConnected: false,
    loggedIn: false,
    name: 'Mark'
  };

  return self;
}

export default new Store();
