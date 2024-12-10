document.getElementById("homeBox").addEventListener("click", function () {
  window.location.href = "/";
});

document.getElementById("fullscreenBox").addEventListener("click", function () {
  const activeIframe = document.querySelector(".frameWeb iframe.active"); 
  if (activeIframe) {
    if (activeIframe.requestFullscreen) {
      activeIframe.requestFullscreen();
    } else if (activeIframe.mozRequestFullScreen) {
      activeIframe.mozRequestFullScreen();
    } else if (activeIframe.webkitRequestFullscreen) {
      activeIframe.webkitRequestFullscreen();
    } else if (activeIframe.msRequestFullscreen) {
      activeIframe.msRequestFullscreen();
    }
  } else {
    console.error("No active iframe found for fullscreen.");
  }
});

document.getElementById("searchBox").addEventListener("click", function () {
  document.getElementById("searchOverlay").style.display = "flex";
});

document.getElementById("closeOverlayBtn").addEventListener("click", function () {
  document.getElementById("searchOverlay").style.display = "none";
});

document.getElementById("codeBox").addEventListener("click", function () {});

const searchIcon = document.querySelector(".bx-search");
const overlay = document.getElementById("searchOverlay");
const searchBar = document.getElementById("uv-address");
const closeBtn = document.getElementById("closeOverlayBtn");

function openSearch() {
  overlay.classList.add("show");
  searchBar.classList.add("visible");
  searchBar.focus();
}

searchIcon.addEventListener("click", openSearch);

closeBtn.addEventListener("click", function () {
  overlay.classList.remove("show");
  searchBar.classList.remove("visible");
});

document.addEventListener("click", function (event) {
  if (
    overlay.classList.contains("show") &&
    !overlay.contains(event.target) &&
    event.target !== searchIcon
  ) {
    overlay.classList.remove("show");
    searchBar.classList.remove("visible");
  }
});

overlay.addEventListener("click", function (event) {
  if (event.target === overlay) {
    toggleSearchOverlay();
  }
  event.stopPropagation();
});

searchBar.addEventListener("click", function (event) {
  event.stopPropagation();
});

function toggleSearchOverlay() {
  overlay.classList.toggle("show");
  const searchBarElement = document.querySelector(".search-bar");
  searchBarElement.classList.toggle("visible");
}

closeBtn.addEventListener("click", function (event) {
  event.stopPropagation();
  toggleSearchOverlay();
});

document.getElementById("codeBox").addEventListener("click", () => {
  if (window.eruda && window.eruda._isInit) {
  
    window.eruda.destroy();
    console.log("Eruda destroyed");
  } else {
    
    const erudaScript = document.createElement("script");
    erudaScript.src = "https://cdn.jsdelivr.net/npm/eruda";
    document.body.appendChild(erudaScript);

    erudaScript.onload = () => {
      
      window.eruda.init();
      window.eruda.show();
      console.log("Eruda initialized and shown");
     };
   }
 });