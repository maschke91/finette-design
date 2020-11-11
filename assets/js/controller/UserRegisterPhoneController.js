var userRegisterPhoneForm = new Form('user_register_phone',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    var userRegisterPhoneVerifyPrompt = new Prompt('user_register_phone_verify', data, self.input('phone'),
      function(data) {
        console.log('prompt success', data); // DEBUG

        location.href = '/user/register/password/'
          + data;
      },
      function() {
        self.disableForm(true);
      },
      function() {
        self
          .disableForm(false)
          .resetForm();
      },
    );
  }, function (self) {
    self.focus('phone');
  }, function (self) {
    self.focus('phone');
  }
);
