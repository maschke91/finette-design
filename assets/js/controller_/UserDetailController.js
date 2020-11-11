let userDetailForm = new Form('user_detail',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    let modal = new Modal();

    modal.show({
      'text'    : 'Uživatel uložen',
      'confirm' : function() {
        location.href = '/invite';
      }
    });
  }
);

let userDetailContractForm = new Form('user_contract',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    let modal = new Modal();

    if (data) {
      modal.show({
        'text'    : 'Smlouvy uloženy',
        'confirm' : function() {
          location.reload();
        }
      });
    } else {
      modal.show({
        'text' : 'Žádné smlouvy k nahrání'
      });
    }
  }
);

if ($('[data-rates-name]').length) {
  let rates = new Rates('commission_rates');

  let productRatesForm = new Form('user_rates',
    function (self, $self, data) {
      console.log(self, $self, data); // DEBUG

      let modal = new Modal();

      modal.show({
        'text'    : 'Provize uloženy',
        'confirm' : function() {
          location.href = '/invite';
        }
      });
    }
  );
}

$(document).on('change', '[name="self_superaffiliate"]', function() {
  let value   = $(this).is(':checked'),
      $target = $('[name="superaffiliate_id"]');

  $target.attr('disabled', value
    ? 'disabled'
    : false
  );

   if (value) {
     $target.val('');
   }
});
