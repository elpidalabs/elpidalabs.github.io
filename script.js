const contentDiv = document.getElementById("content");
const feedUrl = "https://makeuseof.com/feed";
let feedData = "";

fetch(feedUrl)
  .then((response) => response.text())
  .then((data) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "application/xml");
    const items = xml.getElementsByTagName("item");
    for (let i = 0; i < 10; i++) {
      const item = items[i];
      const title = item.getElementsByTagName("title")[0].textContent;
      const link = item.getElementsByTagName("link")[0].textContent;
      const pubDate = new Date(item.getElementsByTagName("pubDate")[0].textContent);
      const formattedDate = pubDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      feedData += `${formattedDate} - ${title} (<a href="${link}" target="_blank">READ</a>)<br>`;
    }
    typeText(feedData);
  });

function typeText(text, index = 0) {
  if (index < text.length) {
    contentDiv.innerHTML = text.slice(0, index) + "_";
    setTimeout(() => typeText(text, index + 1), 50);
  } else {
    contentDiv.innerHTML = text;
  }
}
