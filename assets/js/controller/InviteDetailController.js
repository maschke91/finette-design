var inviteDetailForm = new Form('invite_detail',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    var modal = new Modal();

    modal.show({
      'text'    : 'Pozvánka uložena. Odeslat?',
      'cancel'  : true,
      'confirm' : function() {
        location.href = '/invite/send/'
          + data;
      },
      'storno'  : function() {
        location.href = '/invite';
      }
    });
  }
);

if ($('[data-rates-name]').length) {
  var rates = new Rates('commission_rates');

  var productRatesForm = new Form('invite_rates',
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
