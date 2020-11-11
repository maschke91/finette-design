$.each($('input[type="checkbox"][name$="all"]'), function() {
  var all = true;

  $.each($(this).closest('nav').find('input[type="checkbox"]:not([name$="all"])'), function() {
    if (!$(this).is(':checked')) {
      all = false;
    }
  });

  if (all) {
    $(this).closest('nav').find('input[type="checkbox"][name$="all"]').prop('checked', 'checked');
  }
});

$(document).on('change', 'input[type="checkbox"][name$="all"]', function() {
  var state = $(this).is(':checked');

  $(this)
    .closest('nav')
    .find('input[type="checkbox"]:not(:first)')
    .prop('checked', state ? 'checked' : false);

  $(document).trigger('filterRefresh');
});

$(document).on('click', 'input[type="checkbox"]:not([name$="all"])', function() {
  $(document).trigger('filterRefresh');
});

$(document).on('filterRefresh', function() {
  var result = {
    'category' : [],
    'label'    : [],
    'state'    : []
  };

  $.each($('input[type="checkbox"]:not([name$="all"])'), function() {
    if ($(this).is(':checked')) {
      var group = $(this).attr('name').split('_')[0];

      result[group].push($(this).val());
    }
  });

  result['filter'] = 1;

  location.search = $.param(result);
});
