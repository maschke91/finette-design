var userRecoveryPasswordForm = new Form('user_recovery_password',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    var modal = new Modal();

    modal.show({
      'text'  : 'Heslo změneno, přihlašte se novými údaji',
      'close' : function() {
        location.href = '/user/logout';
      }
    });
  }, function (self) {
    self
      .reset('password')
      .reset('password_check')
      .focus('password');
  }, function (self) {
    self.focus('password');
  }
);
