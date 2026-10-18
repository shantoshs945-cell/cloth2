const header = document.querySelector("header");
const headerRow = header?.querySelector(":scope > div:first-child > div:first-child");
const categoryNav = header?.querySelector(":scope > div:first-child > nav");

if (headerRow && categoryNav) {
  const menuButton = document.createElement("button");
  menuButton.className = "mobile-menu-toggle";
  menuButton.type = "button";
  menuButton.setAttribute("aria-label", "Open navigation menu");
  menuButton.setAttribute("aria-controls", "mobile-side-menu");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.innerHTML = "<span></span><span></span><span></span>";
  headerRow.prepend(menuButton);

  const overlay = document.createElement("div");
  overlay.className = "mobile-menu-overlay";
  overlay.hidden = true;

  const sideMenu = document.createElement("aside");
  sideMenu.id = "mobile-side-menu";
  sideMenu.className = "mobile-side-menu";
  sideMenu.hidden = true;
  sideMenu.setAttribute("aria-label", "Site navigation");

  const menuHeading = document.createElement("div");
  menuHeading.className = "flex items-center justify-between";
  const menuTitle = document.createElement("span");
  menuTitle.className = "font-headline-sm text-headline-sm font-bold text-primary";
  menuTitle.textContent = "Menu";
  const closeButton = document.createElement("button");
  closeButton.className = "w-10 h-10 rounded-lg text-on-surface hover:bg-surface-container-low";
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Close navigation menu");
  closeButton.innerHTML = '<span class="material-symbols-outlined">close</span>';
  menuHeading.append(menuTitle, closeButton);

  const menuNav = categoryNav.cloneNode(true);
  menuNav.removeAttribute("data-active-classes");
  menuNav.className = "";
  sideMenu.append(menuHeading, menuNav);
  document.body.append(overlay, sideMenu);

  const closeMenu = () => {
    sideMenu.hidden = true;
    overlay.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    document.body.style.overflow = "";
    menuButton.focus();
  };

  menuButton.addEventListener("click", () => {
    sideMenu.hidden = false;
    overlay.hidden = false;
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close navigation menu");
    document.body.style.overflow = "hidden";
    closeButton.focus();
  });
  closeButton.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);
  menuNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !sideMenu.hidden) closeMenu();
  });
}
