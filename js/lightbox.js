// Image lightbox on the native <dialog>. Focus returns to the element that opened it.
const dialog = document.getElementById("lightbox");
const img = dialog.querySelector("img");
const caption = dialog.querySelector(".lightbox-caption");
const counter = dialog.querySelector(".lightbox-counter");
const prev = dialog.querySelector("[data-lb-prev]");
const next = dialog.querySelector("[data-lb-next]");

let items = [];
let index = 0;
let opener = null;

function render() {
  const item = items[index];
  img.src = item.src;
  img.alt = item.alt || "";
  caption.textContent = item.caption || "";
  counter.textContent = index + 1 + " / " + items.length;
  const single = items.length < 2;
  prev.hidden = next.hidden = counter.hidden = single;
}

function step(delta) {
  if (items.length < 2) return;
  index = (index + delta + items.length) % items.length;
  render();
}

export function openLightbox(list, startIndex, trigger) {
  items = list;
  index = startIndex;
  opener = trigger;
  render();
  dialog.showModal();
}

prev.addEventListener("click", () => step(-1));
next.addEventListener("click", () => step(1));
dialog.querySelector("[data-lb-close]").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
dialog.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") step(-1);
  if (e.key === "ArrowRight") step(1);
});
dialog.addEventListener("close", () => {
  if (opener && opener.isConnected) opener.focus();
  opener = null;
});
