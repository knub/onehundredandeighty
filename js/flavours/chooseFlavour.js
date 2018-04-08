function selectStudienordnung(identifier) {
    const selectionPreview = document.getElementById('selectionPreview');
    if (!flavourRegistry.has(identifier)) {
        selectionPreview.classList.add('hidden');
        alert(`onehundredandeighty ist noch nicht bereit für ${identifier}, das muss erst noch implementiert werden...`);
        return;
    }
    const selectionHeader = document.getElementById('selectionHeader');
    const selectionInformation = document.getElementById('selectionInformation');
    const selectionSelect = document.getElementById('selectionSelect');

    selectionHeader.innerText = flavourRegistry.displayName(identifier);

    let infoHtml = '';
    const urls = flavourRegistry.urls(identifier);
    for (let i = 0; i < urls.length; i++) {
        [name, link] = urls[i];
        infoHtml += `<a target="_blank" href="${link}">${name}</a><br><br>`;
    }
    selectionInformation.innerHTML = infoHtml;

    selectionSelect.href = `index.html?flavour=${identifier}`;

    selectionPreview.classList.remove('hidden');
}