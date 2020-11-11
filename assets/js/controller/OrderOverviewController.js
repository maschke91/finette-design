$(document).on('click', '.js-dialog', function (event) {
  event.preventDefault();

  var href = $(this).attr('href'),
      name = $(this).attr('data-form-name');

  $.post(href, function(data) {
    var modal = new Modal();

    modal.show({
      'custom'  : true,
      'content' : data,
      'show'    : function() {
        var form = new Form(name,
          function (self, $self, data) {
            console.log(self, $self, data); // DEBUG

            location.href = '/order/overview';
          }, function (self) {
            self.focus('amount');
          }
        );

        $.each($('[data-range-name]'), function() {
          new Range($(this).attr('data-range-name'));
        });
      }
    });
  });
});

$(document).on('click', '.js-filter', function (event) {
  event.preventDefault();

  $.post('/order/ajax_filter', function(data) {
    var modal = new Modal();

    modal.show({
      'custom'  : true,
      'content' : data,
      'show'    : function() {
        new Form('order_filter', null, null, null, true);
      }
    });
  });
});
