let isClickoffCloakingEnabled = JSON.parse(localStorage.getItem('clickoffCloaking')) ?? false;

const originalTitle = document.title;
const originalFavicon = getFavicon();

document.addEventListener('visibilitychange', () => {
    if (isClickoffCloakingEnabled && document.hidden) {
        document.title = 'Google Slides';
        updateFavicon('/images/settings-images/googleslides.ico');
    } else if (isClickoffCloakingEnabled) {
        resetTitleAndFavicon();
    }
});

window.addEventListener('focus', () => {
    if (!document.hidden) {
        resetTitleAndFavicon();
    }
});

document.getElementById('toggleClickoffCloaking')?.addEventListener('change', (e) => {
    isClickoffCloakingEnabled = e.target.checked;
    localStorage.setItem('clickoffCloaking', JSON.stringify(isClickoffCloakingEnabled));

    alert(isClickoffCloakingEnabled ? 'Clickoff Cloaking enabled.' : 'Clickoff Cloaking disabled.');
});

function resetTitleAndFavicon() {
    document.title = originalTitle;
    updateFavicon(originalFavicon);
}

function getFavicon() {
    const faviconLink = document.querySelector("link[rel*='icon']");
    return faviconLink ? faviconLink.href : '/plexilearcade.png';
}
