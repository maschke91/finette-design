let productDetailForm = new Form('product_detail',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    let modal = new Modal();

    modal.show({
      'text' : 'Produkt uložen',
      'confirm' : function() {
        location.href = '/product/edit/'
          + data;
      }
    });
  }
);

let productPriceForm = new Form('product_price',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    self.resetForm();

    $('[data-prices]').html(data);
  }
);

let productRatesForm = new Form('product_rates',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG
  }
);

let productRatesInviteForm = new Form('product_rates_invite',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG
  }
);

let rates        = new Rates('commission_rates');
let rates_invite = new Rates('commission_rates_invite');

$(document).on('click', '[data-price="edit"]', function(event) {
  event.preventDefault();

  let href = $(this).attr('href');

  $.post(href, {}, function(data) {
    let modal = new Modal();

    modal.show({
      'custom'  : true,
      'content' : data,
      'confirm' : function() {
        console.log('suckess');
      }
    });

    let productPriceEditForm = new Form('product_price_edit',
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

  let modal = new Modal(),
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
