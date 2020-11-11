var productDetailForm = new Form('product_detail',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    var modal = new Modal();

    modal.show({
      'text' : 'Produkt uložen',
      'confirm' : function() {
        location.href = '/product/edit/'
          + data;
      }
    });
  }
);

var productPriceForm = new Form('product_price',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    self.resetForm();

    $('[data-prices]').html(data);
  }
);

var productPriceImportForm = new Form('product_price_import',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    self.resetForm();

    $('[data-prices]').html(data);
  }
);

var productRatesForm = new Form('product_rates',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG
  }
);

var productRatesInviteForm = new Form('product_rates_invite',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG
  }
);

var rates        = new Rates('commission_rates');
var rates_invite = new Rates('commission_rates_invite');

$(document).on('click', '[data-price="edit"]', function(event) {
  event.preventDefault();

  var href = $(this).attr('href');

  $.post(href, {}, function(data) {
    var modal = new Modal();

    modal.show({
      'custom'  : true,
      'content' : data,
      'confirm' : function() {
        console.log('suckess');
      }
    });

    var productPriceEditForm = new Form('product_price_edit',
      function (self, $self, data) {
        console.log(self, $self, data); // DEBUG

        $('[data-prices]').html(data);

        modal.close();
      }
    );
  });
});

$(document).on('click', '[data-price="delete"]', function(event) {
  event.preventDefault();

  var modal = new Modal(),
      href  = $(this).attr('href');

  modal.show({
    'title'   : 'Potvrzení',
    'text'    : 'Opravdu provést akci?',
    'cancel'  : true,
    'confirm' : function() {
      $.post(href, {}, function(data) {
        $('[data-prices]').html(data);
      });
    }
  });
});
