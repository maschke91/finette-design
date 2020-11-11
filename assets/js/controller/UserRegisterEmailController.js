var userRegisterEmailForm = new Form('user_register_email',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    var userRegisterEmailVerifyPrompt = new Prompt('user_register_email_verify', data, self.input('email'),
      function(data) {
        console.log('prompt success', data); // DEBUG

        location.href = '/user/register/phone/'
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
    self.focus('email');
  }, function (self) {
    self.focus('email');
  }
);
