let orderBankForm = new Form('order_bank',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    location.href = '/order/summary';
  }
);


function loadBank(value) {
  $.post('/order/ajax_bank_load', {'id' : value}, function(data) {
    console.log(data); // DEBUG

    data = $.parseJSON(data);

    if (data) {
      orderBankForm.setValues(data);
    } else {
      orderBankForm.resetForm();
      orderBankForm.setValues({'id' : 0});
    }
  });
}

loadBank($('[data-bank][data-value]:not([data-value=""]):first').data('value'));

$(document).on('click', '[data-bank]', function() {
  let value = $(this).attr('data-value');

  loadBank(value);
});
