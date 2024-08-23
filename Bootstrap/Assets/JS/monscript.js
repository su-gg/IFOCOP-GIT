document.addEventListener("DOMContentLoaded", function () {
  //console.log("fichier script.js");
  //On parcourt les classes .progress
  let progress = document.querySelectorAll(".progress");
  //console.log("progress" + progress);
  for (let bar of progress) {
    let targetValue = bar.getAttribute("aria-valuenow");
    //console.log("valeur cible:" + bar.getAttribute ("aria-valuenow"));
    bar.querySelector(".progress-bar").style.width = targetValue + "%";
  }

  document.getElementById("btn-first").addEventListener("click", (event) => {
    const myCarousel = document.querySelector("#carouselExample");
    const carousel = bootstrap.Carousel.getInstance(myCarousel);
    carousel.to(0);
  });

  document.getElementById("btn-prev").addEventListener("click", (event) => {
    const myCarousel = document.querySelector("#carouselExample");
    const carousel = bootstrap.Carousel.getInstance(myCarousel);
    carousel.prev();
  });

  document.getElementById("btn-pause").addEventListener("click", (event) => {
    const myCarousel = document.querySelector("#carouselExample");
    const carousel = bootstrap.Carousel.getInstance(myCarousel);
    carousel.pause();
  });

  document.getElementById("btn-next").addEventListener("click", (event) => {
    const myCarousel = document.querySelector("#carouselExample");
    const carousel = bootstrap.Carousel.getInstance(myCarousel);
    carousel.next();
  });

  document.getElementById("btn-last").addEventListener("click", (event) => {
    const myCarousel = document.querySelector("#carouselExample");
    const carousel = bootstrap.Carousel.getInstance(myCarousel);
    carousel.to(document.querySelectorAll(".carousel-item").length - 1);
  });
});
