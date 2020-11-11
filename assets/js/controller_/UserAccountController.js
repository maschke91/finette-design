let userAccountEmailForm = new Form('user_account_email',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    var userAccountEmailVerifyPrompt = new Prompt('user_account_email_verify', data, self.input('email'),
      function() {
        console.log('prompt success'); // DEBUG

        let modal = new Modal();

        modal.show({
          'text'  : 'Přihlašovací e-mail změnen, přihlašte se novými údaji',
          'close' : function() {
            location.href = '/user/logout';
          }
        });
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
  }
);

let userAccountPasswordForm = new Form('user_account_password',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    let modal = new Modal();

    modal.show({
      'text'  : 'Heslo změneno, přihlašte se novými údaji',
      'close' : function() {
        location.href = '/user/logout';
      }
    });
  }, function (self) {
    self.resetForm();
  }
);

let userAccountPhoneForm = new Form('user_account_phone',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    var userAccountPhoneVerifyPrompt = new Prompt('user_account_phone_verify', data, self.input('phone'),
      function() {
        console.log('prompt success'); // DEBUG

        let modal = new Modal();

        modal.show({
          'text'  : 'Telefonní číslo změneno, přihlašte se novými údaji',
          'close' : function() {
            location.href = '/user/logout';
          }
        });
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
  }
);
