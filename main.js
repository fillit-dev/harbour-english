const header = document.querySelector("[data-header]");
const menuBtn = document.querySelector("[data-menu-btn]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const form = document.querySelector("[data-form]");
const success = document.querySelector("[data-success]");

const onScroll = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
};

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

menuBtn?.addEventListener("click", () => {
  const open = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!open));
  mobileMenu.hidden = open;
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.hidden = true;
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  form.reset();
  success.hidden = false;
});
