// Waitlist link: change it once here

const WAITLIST_URL =
  "https://chat.whatsapp.com/H6MK19FBGlN5860mfNh1Pj?s=cl&p=i&mlu=4&ilr=4";
document.querySelectorAll("[data-wa]").forEach((a) => {
  a.href = WAITLIST_URL;
  a.target = "_blank";
  a.rel = "noopener";
});

// Testimonials carousel: images/testimonial-1.jpg ... testimonial-10.jpg
const TOTAL = 7;
const track = document.getElementById("track");
const dots = document.getElementById("dots");
for (let i = 1; i <= TOTAL; i++) {
  const fig = document.createElement("figure");
  const img = new Image();
  img.src = `images/testimonial-${i}.jpeg`;
  img.alt = `Student testimonial ${i}`;
  img.loading = "lazy";
  img.onerror = () => {
    img.remove();
    const d = document.createElement("div");
    d.className = "empty";
    d.textContent = `Add images/testimonial-${i}.jpg`;
    fig.appendChild(d);
  };
  fig.appendChild(img);
  track.appendChild(fig);
  const dot = document.createElement("button");

  if (dots) {
    dot.setAttribute("aria-label", `Go to slide ${i}`);
    dot.onclick = () => go(i - 1);
    dots.appendChild(dot);
  }
}
let index = 0,
  timer;
const slideW = () => track.clientWidth;
function mark() {
  if (!dots) return;
  [...dots.children].forEach((d, i) => d.classList.toggle("on", i === index));
}
function go(i) {
  index = (i + TOTAL) % TOTAL;
  track.scrollTo({ left: index * slideW(), behavior: "smooth" });
  mark();
  updateCarouselHeight();

  restart();
}
track.addEventListener("scroll", () => {
  const i = Math.round(track.scrollLeft / slideW());
  if (i !== index) {
    index = i;
    mark();
  }
});
document.getElementById("prev").onclick = () => go(index - 1);
document.getElementById("next").onclick = () => go(index + 1);

const car = document.getElementById("carousel");

function updateCarouselHeight() {
  const activeSlide = track.children[index];
  if (!activeSlide) return;

  const img = activeSlide.querySelector("img");

  if (img && img.complete && img.naturalHeight > 0) {
    car.style.height = `${img.offsetHeight}px`;
  }
}
car.addEventListener("mouseenter", () => clearInterval(timer));
car.addEventListener("mouseleave", restart);
car.addEventListener("touchstart", () => clearInterval(timer), {
  passive: true,
});
mark();
