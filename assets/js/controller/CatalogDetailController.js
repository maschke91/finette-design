var orderBuyForm = new Form('order_buy',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    location.href = '/order/term';
  }
);

$(document).on('change paste keyup', 'input[name="pcs"]', function() {
  $.post('/catalog/ajax_price', {
    id  : $('#id').val(),
    pcs : $(this).val()
  }, function(data) {
    $('[data-price]').html(data);
  });
});
