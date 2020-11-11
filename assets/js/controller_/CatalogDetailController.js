let orderBuyForm = new Form('order_buy',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    location.href = '/order/term';
  }
);
