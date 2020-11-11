var userLoginForm = new Form('user_login',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    var userLoginVerifyPrompt = new Prompt('user_login_verify', data, self.input('password'),
      function() {
        console.log('prompt success'); // DEBUG

        location.href = '/user/role';
      },
      function() {
        self.disableForm(true);
      },
      function() {
        self
          .disableForm(false)
          .resetForm();
      }
    );
  }, function (self) {
    self
      .reset('password')
      .focus('password');
  }, function (self) {
    self.focus('email');
  }
);
