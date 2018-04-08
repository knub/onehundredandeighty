function selectStudienordnung(identifier) {
    if (!flavourRegistry.has(identifier)) {
        alert(`onehundredandeighty ist noch nicht bereit für ${identifier}, das muss erst noch implementiert werden...`);
        return;
    }

    const selectionPreview = document.getElementById('selectionPreview');
    const selectionHeader = document.getElementById('selectionHeader');
    const selectionInformation = document.getElementById('selectionInformation');

    selectionHeader.innerText = flavourRegistry.displayName(identifier);

    let infoHtml = '';
    for (const url in flavourRegistry.urls(identifier)) {
        const name = url[0];
        const link = url[1];
        infoHtml += `<a href="${link}">${name}</a>`;
    }
    selectionInformation.innerHTML = infoHtml;

    selectionPreview.classList.remove('hidden');
}