let bankDetailForm = new Form('bank_detail',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    let modal = new Modal();

    modal.show({
      'text' : 'Bankovní účet uložen',
      'confirm' : function() {
        location.href = '/bank/edit/'
          + data;
      }
    });
  }
);
