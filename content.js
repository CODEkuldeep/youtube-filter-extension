let allowedKeywords = [];

chrome.storage.sync.get("allowedKeywords", (data) => {
  if (data.allowedKeywords) {
    allowedKeywords = data.allowedKeywords.map((k) => k.trim().toLowerCase());
    filterVideos();
  }
});

function filterVideos() {
  const videos = document.querySelectorAll(
    "ytd-video-renderer, ytd-grid-video-renderer, ytd-rich-item-renderer"
  );

  videos.forEach((video) => {
    const title =
      video.querySelector("#video-title")?.innerText.toLowerCase() || "";
    const matches = allowedKeywords.some((keyword) => title.includes(keyword));

    if (!matches) {
      video.style.display = "none";
    }
  });
}

const observer = new MutationObserver(filterVideos);
observer.observe(document.body, { childList: true, subtree: true });
