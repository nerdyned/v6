function handleClick(box, tabName, favicon) {
    box.classList.add('clicked');
    document.title = tabName;
    updateFavicon(favicon);

    localStorage.setItem('tabName', tabName);
    localStorage.setItem('favicon', favicon);

    setTimeout(() => {
        box.classList.remove('clicked');
    }, 500);
}

function resetCloak() {
    const originalTabName = '';
    const originalFavicon = '/plexilearcade.png';

    document.title = originalTabName;
    updateFavicon(originalFavicon);

    localStorage.setItem('tabName', originalTabName);
    localStorage.setItem('favicon', originalFavicon);
}

function updateFavicon(faviconUrl) {
    let faviconLink = document.querySelector("link[rel*='icon']");
    if (!faviconLink) {
        faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        document.head.appendChild(faviconLink);
    }
    faviconLink.href = faviconUrl;
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTabName = localStorage.getItem('tabName');
    const savedFavicon = localStorage.getItem('favicon');

    if (savedTabName && savedFavicon) {
        document.title = savedTabName;
        updateFavicon(savedFavicon);
    }
});
