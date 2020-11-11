var orderTermForm = new Form('order_term',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    location.href = '/order/pcs';
  }
);
