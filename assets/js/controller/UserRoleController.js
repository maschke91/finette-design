var userRoleForm = new Form('user_role',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    location.href = data
      ? data
      : '/user/identity';
  }, function (self) {
    self.resetForm();
  }
);
