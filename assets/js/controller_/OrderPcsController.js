let orderPcsForm = new Form('order_pcs',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    if (data) {
      location.href = '/order/profile';
    } else {
      location.reload();
    }
  }
);

$(document).on('change paste keyup', '[name="pcs"]', function() {
  orderPcsForm
    .input('submit')
    .val('Přepočítat')
    .attr('data-value-default', 'Přepočítat')
    .attr('data-value-action', 'Přepočítávám...');
});
