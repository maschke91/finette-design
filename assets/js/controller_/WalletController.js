$(document).on('click', '.js-dialog', function (event) {
  event.preventDefault();

  let href = $(this).attr('href'),
      name = $(this).attr('data-form-name');

  $.post(href, function(data) {
    let modal = new Modal();

    modal.show({
      'custom'  : true,
      'content' : data,
      'show'    : function() {
        let form = new Form(name,
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
