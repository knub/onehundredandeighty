

let abortTimer;
let dragTimer;

$(document).on('dragover', function(e) {
    const dt = e.originalEvent.dataTransfer;
    if (dt.types && (dt.types.indexOf ? dt.types.indexOf('Files') !== -1 : dt.types.contains('Files'))) {
        window.clearTimeout(dragTimer);
        window.clearTimeout(abortTimer);
        $("#dropHint").css('display', 'initial');
        dragTimer = setTimeout(function() {
            $("#dropHint").addClass('dropHintActive');
        }, 50);
    }
    return false;
});

function hideDropOverlay() {
    window.clearTimeout(dragTimer);
    window.clearTimeout(abortTimer);
    abortTimer = window.setTimeout(function() {
        $("#dropHint").removeClass('dropHintActive');
        setTimeout(function() {
            $("#dropHint").css('display', 'none');
        }, 500)
    }, 25);
    return false;
}

$(document).on('dragleave', hideDropOverlay);

$(document).on('drop', function(e) {
    alert("Dropped!");
    hideDropOverlay();
    return false;
});