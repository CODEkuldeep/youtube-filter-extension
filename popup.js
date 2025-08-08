document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get("allowedKeywords", (data) => {
    if (data.allowedKeywords) {
      document.getElementById("keywords").value =
        data.allowedKeywords.join(", ");
    }
  });

  document.getElementById("save").addEventListener("click", () => {
    const keywords = document.getElementById("keywords").value.split(",");
    chrome.storage.sync.set({ allowedKeywords: keywords }, () => {
      alert("Keywords saved! Refresh YouTube.");
    });
  });
});
