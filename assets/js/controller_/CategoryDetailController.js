let categoryDetailForm = new Form('category_detail',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    let modal = new Modal();

    modal.show({
      'text' : 'Kategorie uložena',
      'confirm' : function() {
        location.href = '/category/edit/'
          + data;
      }
    });
  }
);
