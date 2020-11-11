var currencyDetailForm = new Form('currency_detail',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    var modal = new Modal();

    modal.show({
      'text' : 'Měna uložena',
      'confirm' : function() {
        location.href = '/currency/edit/'
          + data;
      }
    });
  }
);
