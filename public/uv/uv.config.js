// DO NOT Use My Bare
self.__uv$config = {
    prefix: '/static/pa/',
    bare: 'https://funanimals.vercel.app/fq/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/uv/uv.handler.js',
    bundle: '/uv/uv.bundle.js',
    config: '/uv/uv.config.js',
    sw: '/uv/uv.sw.js',
};
