var userRecoveryForm = new Form('user_recovery',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    var modal = new Modal();

    modal.show({
      'text'  : 'Odkaz pro obnovení hesla byl odeslán na zadaný e-mail',
      'close' : function() {
        location.href = '/user/logout';
      }
    });
  }, function (self) {
    self.focus('email');
  }, function (self) {
    self.focus('email');
  }
);
