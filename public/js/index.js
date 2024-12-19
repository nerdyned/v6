const form = document.querySelector('#uv-form');
const input = document.querySelector('#uv-address'); 

const shortcuts = {
    "!yt": "https://www.youtube.com",
    "!gh": "https://github.com",
    "!rd": "https://www.reddit.com",
    "!tw": "https://twitter.com",
    "!fb": "https://www.facebook.com",
    "!ig": "https://www.instagram.com",
    "!li": "https://www.linkedin.com",

    "!pa": "https://plexilearcade.xyz",
    "!jmw": "https://jmwubg.xyz",
    "!a1r": "https://a1rplayis.us",
    "!xn": "https://xenapsis.dev",
    "!cg": "https://crazygames.com",
    "!p": "https://poki.com",
    "!s": "https://selenite.cc",

    "!nyt": "https://www.nytimes.com",
    "!cnn": "https://www.cnn.com",
    "!bbc": "https://www.bbc.com",
    "!wp": "https://www.washingtonpost.com",

    "!amz": "https://www.amazon.com",
    "!eb": "https://www.ebay.com",
    "!et": "https://www.etsy.com",
    "!wm": "https://www.walmart.com",

    "!ms": "https://www.microsoft.com",
    "!ap": "https://www.apple.com",
    "!st": "https://stackoverflow.com",

    "!nf": "https://www.netflix.com",
    "!hb": "https://www.hbomax.com",
    "!sp": "https://open.spotify.com",
    "!dc": "https://www.discord.com",

    "!kh": "https://www.khanacademy.org",
    "!edx": "https://www.edx.org",
    "!ud": "https://www.udemy.com",
    "!cs": "https://www.codecademy.com",

    "!npm": "https://www.npmjs.com",
    "!jsf": "https://jsfiddle.net",
    "!mdn": "https://developer.mozilla.org",
    "!dev": "https://dev.to",

    "!pt": "https://www.pinterest.com",
    "!tk": "https://www.tiktok.com",
    "!sc": "https://www.snapchat.com",
    "!tm": "https://www.tumblr.com",

    "!g": "https://www.google.com",
    "!b": "https://www.bing.com",
    "!y": "https://search.yahoo.com",
    "!ba": "https://www.baidu.com",
    "!ddg": "https://duckduckgo.com",

    "!wiki": "https://en.wikipedia.org",
    "!imdb": "https://www.imdb.com",
    "!gm": "https://www.google.com/maps",
    "!oo": "https://www.onlyoffice.com",
};

form.addEventListener('submit', async event => {
    event.preventDefault();
    
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = input.value.trim();
        
        const shortcutKey = url.split(" ")[0].toLowerCase(); 
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
