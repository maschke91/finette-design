let userRegisterPasswordForm = new Form('user_register_password',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    let modal = new Modal();

    modal.show({
      'text'  : 'Registrace úspěšně dokončena',
      'close' : function() {
        location.href = '/user/logout';
      }
    });
  }, function (self) {
    self.resetForm();
  }, function (self) {
    self.focus('password');
  }
);
