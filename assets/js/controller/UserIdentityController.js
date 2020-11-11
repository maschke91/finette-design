var userIdentityForm = new Form('user_identity',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    if (data.content) {
      var modal = new Modal();

      modal.show({
        'custom'  : true,
        'content' : data.content,
        'show'    : function() {
          self.disableForm(true);
        },
        'close'   : function() {
          self.disableForm(false);
        }
      });

      var userIdentityTypeForm = new Form('user_identity_type',
        function (self, $self, data) {
          console.log(self, $self, data); // DEBUG

          location.href = data;
        }, function (self) {
          self.resetForm();
        }
      );
    } else {
      location.href = data.landing;
    }
  }, function (self) {
    self.resetForm();
  }
);
