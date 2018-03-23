
const FLAVOUR_TITLE = (function() {
    const urlParams = window.location.search.slice(1).split('&');

    let flavour = undefined;
    for (const urlParam of urlParams) {
        const paramData = urlParam.split('=');
        if (paramData[0] === 'flavour') {
            flavour = paramData[1];
        }
    }

    if (flavour === undefined || !flavourRegistry.keys().includes(flavour)) {
        window.location.href = 'chooseFlavour.html';
        return;
    }

    flavourRegistry.load(flavour);

    return flavourRegistry.displayName(flavour);
})();
