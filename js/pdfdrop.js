let dragTimer;
$(document).dragover(function(e) {
  const dt = e.originalEvent.dataTransfer;
  if (dt.types && (dt.types.indexOf ? dt.types.indexOf('Files') !== -1 : dt.types.contains('Files'))) {
    $("#dropHint").addClass('dropHintActive');
    window.clearTimeout(dragTimer);
  }
});
$(document).dragleave(function(e) {
  dragTimer = window.setTimeout(function() {
    $("#dropHint").removeClass('dropHintActive');
  }, 25);
});
