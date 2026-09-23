const header = document.querySelector("[data-header]");
const menuBtn = document.querySelector("[data-menu-btn]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const form = document.querySelector("[data-form]");
const success = document.querySelector("[data-success]");
const error = document.querySelector("[data-error]");
const submitBtn = document.querySelector("[data-submit]");

const inbox = ["ryand25", "tcd.ie"].join("@");
const phoneHref = ["tel:+", "353", "83", "091", "3967"].join("");

document.querySelectorAll("[data-phone]").forEach((link) => {
  link.setAttribute("href", phoneHref);
});

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

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  if (form.elements.company?.value) {
    success.hidden = false;
    error.hidden = true;
    form.reset();
    return;
  }

  const payload = {
    name: form.elements.name.value,
    email: form.elements.email.value,
    guests: form.elements.guests.value,
    level: form.elements.level.value,
    dates: form.elements.dates.value,
    message: form.elements.message.value,
    _subject: "Harbour English enquiry",
    _template: "table",
  };

  submitBtn.disabled = true;
  error.hidden = true;

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${inbox}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("send failed");

    form.reset();
    success.hidden = false;
  } catch {
    error.hidden = false;
  } finally {
    submitBtn.disabled = false;
  }
});
