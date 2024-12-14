const form = document.querySelector('#uv-form');
const input = document.querySelector('#uv-address'); 

const shortcuts = {
    "!yt": "https://www.youtube.com",
    "!gh": "https://github.com",
    "!rd": "https://www.reddit.com",
    "!ddg": "https://duckduckgo.com",
    "!tw": "https://twitter.com",
};

form.addEventListener('submit', async event => {
    event.preventDefault();
    
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = input.value.trim();
        
        const shortcutKey = url.split(" ")[0]; 
        if (shortcuts[shortcutKey]) {
            url = shortcuts[shortcutKey]; 
        } else if (!isUrl(url)) {
        
            url = 'https://www.google.com/search?q=' + url;
        } else if (!(url.startsWith('https://') || url.startsWith('http://'))) {
           
            url = 'http://' + url;
        }

        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});

function isUrl(val = '') {
    return /^http(s?):\/\//.test(val) || (val.includes('.') && val[0] !== ' ');
}
