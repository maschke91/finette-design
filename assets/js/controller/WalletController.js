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

            location.href = '/wallet';
          }, function (self) {
            //
          }
        );
      }
    });
  });
});
