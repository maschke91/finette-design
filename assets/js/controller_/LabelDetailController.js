let labelDetailForm = new Form('label_detail',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    let modal = new Modal();

    modal.show({
      'text' : 'Štítek uložen',
      'confirm' : function() {
        location.href = '/label/edit/'
          + data;
      }
    });
  }
);
