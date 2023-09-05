const container = document.querySelector(".container");

export default function creatingNewFolder() {
  const navTabs = document.createElement("ul");
  navTabs.className = "nav nav-tabs";

  const newTab = document.createElement("li");
  newTab.className = "nav-item";

  const newTabLink = document.createElement("a");
  newTabLink.className = "nav-link";

  newTab.appendChild(newTabLink);
  navTabs.appendChild(newTab);

  newTabLink.contentEditable = true;
  newTabLink.focus();
  const linkContent = newTabLink.innerHTML;

  container.appendChild(navTabs);
}