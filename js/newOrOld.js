/**
 * This file defines which 'Studienordnung' is followed
 *
 * the old one:
 * https://hpi.de/fileadmin/user_upload/hpi/navigation/80_intern/05_studium/studien_pruefungsordnung_2010_01.pdf
 * or
 * the new one:
 * https://hpi.de/fileadmin/user_upload/hpi/navigation/80_intern/05_studium/StudOrd_Bachelor_2016.pdf
 *
 *
 */

let switchStudienordnung;
const NEUE_STUDIENORDNUNG = (function() {
    const urlParams = window.location.search.slice(1).split('&');

    let renewed = true;
    for (const urlParam of urlParams) {
        const paramData = urlParam.split('=');
        if (paramData[0] === 'neu') {
            if (paramData[1] === 'false') {
                renewed = false;
            }
        }
    }

    switchStudienordnung = function() {
        let search = [];
        for (const urlParam of urlParams) {
            if (urlParam.split('=')[0] !== 'neu') {
                search.push(urlParam);
            }
        }
        search.push('neu=' + !NEUE_STUDIENORDNUNG);
        window.location.search = search.join('&');

    };

    return renewed;
})();
