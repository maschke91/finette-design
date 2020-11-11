var orderSummaryForm = new Form('order_summary',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    var userOrderSummaryVerifyPrompt = new Prompt('order_summary_verify', data, self.input('submit'),
      function() {
        console.log('prompt success'); // DEBUG

        location.href = '/order/payment';
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
  }
);
