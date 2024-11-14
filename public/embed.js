"use strict";
let destination = "";

try {

  let hashValue = location.hash.slice(1);
  let decodedHashValue = decodeURIComponent(hashValue);

  if (!decodedHashValue.startsWith("http://") && !decodedHashValue.startsWith("https://")) {
    decodedHashValue = "https://" + decodedHashValue;
  }

  destination = new URL(decodedHashValue).toString();
} catch (err) {
  alert(`Invalid URL format in hash. Error:\n${err}`);
  throw err;
}

async function registerSW() {
  try {
    await window.navigator.serviceWorker.register("/sw.js", {
      scope: __uv$config.prefix,
    });
    window.open(
      __uv$config.prefix + __uv$config.encodeUrl(destination),
      "_self"
    );
  } catch (err) {
    alert(`Failed to register Service Worker or redirect. Error:\n${err}`);
  }
}

registerSW();
