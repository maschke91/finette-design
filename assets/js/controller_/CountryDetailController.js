let countryDetailForm = new Form('country_detail',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    let modal = new Modal();

    modal.show({
      'text' : 'Země uložena',
      'confirm' : function() {
        location.href = '/country/edit/'
          + data;
      }
    });
  }
);
