var profileForm = new Form('profile',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    var modal = new Modal();

    modal.show({
      'text' : 'Profil uložen',
      'close' : function() {
        location.reload();
      }
    });
  }
);

var profileContractForm = new Form('profile_contract',
  function (self, $self, data) {
    console.log(self, $self, data); // DEBUG

    $('#generate').replaceWith('<a href="/profile/contract" target="_blank" class="btn">Zobrazit smlouvu</a>');

    var modal = new Modal();

    modal.show({
      'text' : 'Smlouva vygenerována'
    });
  }
);

$(document).on('click', '#generate', function(event) {
  event.preventDefault();

  $(this)
    .closest('form')
    .attr('action', '/profile/ajax_contract')
    .attr('data-name', 'profile_contract')
    .submit();
});

$(document).on('click', '#save', function(event) {
  event.preventDefault();

  $(this)
    .closest('form')
    .attr('action', '/profile/ajax_save')
    .attr('data-name', 'profile')
    .submit();
});
