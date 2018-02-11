

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
    e.preventDefault();
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
$(document).on('dragend', function(ev) {
    // Remove all of the drag data
    const dt = ev.dataTransfer;
    console.log(dt);
    if (dt.items) {
        // Use DataTransferItemList interface to remove the drag data
        for (let i = 0; i < dt.items.length; i++) {
            dt.items.remove(i);
        }
    } else {
        // Use DataTransfer interface to remove the drag data
        ev.dataTransfer.clearData();
    }
});

$(document).on('drop', function(e) {
    e.preventDefault();
    hideDropOverlay();
    const files = e.originalEvent.dataTransfer.files; // Array of all files
    if (files.length !== 1) {
        return false;
    }
    let file = files[0];
    console.log(file);
    loadPDF(file, console.log);
    return false;
});

function loadPDF(file, resolve) {
    let reader = new FileReader();

    reader.onload = function(fileReadEvent) {

        let loadingTask = PDFJS.getDocument(fileReadEvent.target.result);
        loadingTask.promise.then(function(pdf) {
            const pageAmount = pdf.pdfInfo.numPages;
            let resultString = '';

            const loadPage = function(pageNumber) {
                pdf.getPage(pageNumber).then(function(page) {

                    page.getTextContent().then(function (textContent) {
                        let textItems = textContent.items;

                        // Concatenate the string of the item to the final string
                        for (let i = 0; i < textItems.length; i++) {
                            let item = textItems[i];
                            resultString += item.str + ' ';
                        }

                        if (pageNumber < pageAmount) {
                            loadPage(pageNumber + 1);
                        } else {
                            resolve(resultString);
                        }
                    });
                });
            };
            loadPage(1);

        });
    };
    reader.readAsDataURL(file); // start reading the file data.
}
