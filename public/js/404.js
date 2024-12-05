if (window.self !== window.top) {
 
  const iframeElement = window.frameElement;
  if (iframeElement && (iframeElement.id === "frameWeb" || iframeElement.id === "gameFrame")) {
    window.location.href = "/static/404.html";
  }
}
