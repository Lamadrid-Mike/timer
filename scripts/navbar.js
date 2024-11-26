const openBtn = document.querySelector(".open__btn");
const closeBtn = document.querySelector(".close__btn");
const openTab = document.querySelector(".mobile__open-tab");
const bodyElement = document.querySelector("body");

openBtn.addEventListener("click", function (e) {
  openTab.style.animation = `forwards 0.4s to-open`;
  setTimeout(() => {
    openTab.style.animationPlayState = "paused";
  }, 700);
  bodyElement.style.overflow = "hidden";
});

closeBtn.addEventListener("click", function () {
  openTab.style.animation = `forwards 0.4s to-close`;
  setTimeout(() => {
    openTab.style.animationPlayState = "paused";
  }, 500);
  bodyElement.style.overflow = "";
});
