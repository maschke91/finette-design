var userDetailForm = new Form('user_detail',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    var modal = new Modal();

    modal.show({
      'text'    : 'Uživatel uložen',
      'confirm' : function() {
        location.href = '/invite';
      }
    });
  }
);

var userDetailContractForm = new Form('user_contract',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    var modal = new Modal();

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
  var rates = new Rates('commission_rates');

  var productRatesForm = new Form('user_rates',
    function (self, $self, data) {
      console.log(self, $self, data); // DEBUG

      var modal = new Modal();

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
  var value   = $(this).is(':checked'),
      $target = $('[name="superaffiliate_id"]');

  $target.attr('disabled', value
    ? 'disabled'
    : false
  );

   if (value) {
     $target.val('');
   }
});
