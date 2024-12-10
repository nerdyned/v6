const tabsContainer = document.getElementById("tabsContainer");
const addTabBox = document.getElementById("addTabBox");
const frameWebContainer = document.querySelector(".frameWeb");

let tabs = [];
let activeTab = null;

function updateTabLimit() {
  if (tabs.length >= 20) {
    addTabBox.classList.add("disabled");
  } else {
    addTabBox.classList.remove("disabled");
  }
}

function addTab(url = "/proxy.html") {
  if (tabs.length >= 20) return;

  const absoluteUrl = new URL(url, window.location.origin).href;

  const iframe = document.createElement("iframe");
  iframe.src = absoluteUrl;
  frameWebContainer.appendChild(iframe);

  const tab = document.createElement("div");
  tab.className = "tab";
  tab.dataset.url = absoluteUrl;
  tab.dataset.title = "Loading...";
  
  const favicon = document.createElement("img");
  favicon.src = `https://www.google.com/s2/favicons?domain=${new URL(absoluteUrl).hostname}`;
  favicon.style.width = "20px";
  favicon.style.height = "20px";
  favicon.style.marginRight = "3px";
  
  tab.style.display = "flex";
  tab.style.alignItems = "center"; 
  
  const title = document.createElement("span");
  title.className = "tab-title";
  title.textContent = tab.dataset.title;
  title.style.whiteSpace = "nowrap";  
  title.style.overflow = "hidden";   
  title.style.textOverflow = "ellipsis"; 
  title.style.fontSize = "15px"; 
  title.style.textAlign = "left";  
  
  const closeBtn = document.createElement("i");
  closeBtn.className = "bx bx-x close-btn";
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    removeTab(tab, iframe);
  });
  
  tab.appendChild(favicon);
  tab.appendChild(title);
  tab.appendChild(closeBtn);
  
  tabsContainer.appendChild(tab);
  tabs.push({ tab, iframe });  

  selectTab(tab);
  updateTabLimit();

  iframe.onload = () => {
    try {
      const pageTitle = iframe.contentDocument.title || new URL(absoluteUrl).hostname;
      tab.dataset.title = pageTitle;
      title.textContent = pageTitle;
    } catch {
      const fallbackTitle = new URL(absoluteUrl).hostname;
      tab.dataset.title = fallbackTitle;
      title.textContent = fallbackTitle;
    }
  };
}

function removeTab(tab, iframe) {
  if (tabs.length <= 1) return;

  const index = tabs.findIndex((t) => t.tab === tab);
  if (index > -1) {
    
    tab.style.animation = "fadeOut 0.2s forwards";
    iframe.style.animation = "fadeOut 0.2s forwards";
    
    setTimeout(() => {
      tabs.splice(index, 1);
      tabsContainer.removeChild(tab);
      frameWebContainer.removeChild(iframe);

      if (tab.classList.contains("selected")) {
        selectTab(tabs[0]?.tab || null);
      }

      updateTabLimit();
    }, 200); 
  }
}

function selectTab(tab) {
  if (!tab) return;

  if (activeTab) activeTab.classList.remove("selected");
  tabs.forEach(({ iframe }) => (iframe.className = ""));
  const iframe = tabs.find((t) => t.tab === tab)?.iframe;

  if (iframe) {
    iframe.classList.add("active");
  }

  activeTab = tab;
  activeTab.classList.add("selected");
}

tabsContainer.addEventListener("click", (e) => {
  const clickedTab = e.target.closest(".tab");
  if (clickedTab && clickedTab !== activeTab) {
    selectTab(clickedTab);
  }
});

addTabBox.addEventListener("click", () => addTab());

function enableDragAndDrop() {
  let draggedTab = null;

  tabsContainer.addEventListener("dragstart", (e) => {
    const tab = e.target.closest(".tab"); 
    if (!tab) return;
    draggedTab = tab;
    draggedTab.classList.add("dragging");
  });

  tabsContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterTab = getDragAfterTab(tabsContainer, e.clientY);
    if (afterTab == null) {
      tabsContainer.appendChild(draggedTab);
    } else {
      tabsContainer.insertBefore(draggedTab, afterTab);
    }
  });

  tabsContainer.addEventListener("dragend", () => {
    if (draggedTab) {
      draggedTab.classList.remove("dragging");
      updateTabOrder();
      draggedTab = null;
    }
  });
}

function getDragAfterTab(container, y) {
  const draggableTabs = [...container.querySelectorAll(".tab:not(.dragging)")];

  return draggableTabs.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      return closest;
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function updateTabOrder() {
  tabs = [...tabsContainer.children].map((tab, index) => {
    const iframe = frameWebContainer.children[index];
    return { tab, iframe };
  });
}


addTab();
enableDragAndDrop();
updateTabLimit();