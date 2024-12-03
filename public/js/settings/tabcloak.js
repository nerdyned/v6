function handleClick(box, tabName, favicon) {
    box.classList.add('clicked');
    document.title = tabName;
    const faviconLink = document.querySelector("link[rel*='icon']");
    
    if (faviconLink) {
        faviconLink.href = favicon;
        localStorage.setItem('tabName', tabName);
        localStorage.setItem('favicon', favicon);
    } else {
        console.error('Favicon link tag not found in the document. Please add <link rel="icon" href="/images/plexilearcade.png" /> in the <head>.');
    }

    setTimeout(() => {
        box.classList.remove('clicked');
    }, 500);
}

function resetCloak() {
    const originalTabName = '';
    const originalFavicon = '/plexilearcade.png';
    document.title = originalTabName;
    const faviconLink = document.querySelector("link[rel*='icon']");
    
    if (faviconLink) {
        faviconLink.href = originalFavicon;
        localStorage.setItem('tabName', originalTabName);
        localStorage.setItem('favicon', originalFavicon);
    } else {
        console.error('Favicon link tag not found in the document. Please add <link rel="icon" href="/images/plexilearcade.png" /> in the <head>.');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTabName = localStorage.getItem('tabName');
    const savedFavicon = localStorage.getItem('favicon');
    const faviconLink = document.querySelector("link[rel*='icon']");
    
    if (faviconLink) {
        if (savedTabName && savedFavicon) {
            document.title = savedTabName;
            faviconLink.href = savedFavicon;
        }
    } else {
        console.error('Favicon link tag not found in the document. Please add <link rel="icon" href="/images/plexilearcade.png" /> in the <head>.');
    }
});
