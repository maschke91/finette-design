let orderProfileForm = new Form('order_profile',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    location.href = '/order/bank';
  }
);
