document.addEventListener("DOMContentLoaded", function () {
  let sprite = document.getElementById("sprite");

  // If sprite element is missing, create it dynamically
  if (!sprite) {
    sprite = document.createElement("div");
    sprite.id = "sprite";
    document.body.appendChild(sprite);
  }

  let velocityX = 500;
  let velocityY = 500;
  let posX = window.innerWidth / 2; // Start at center
  let posY = window.innerHeight / 2;

  function moveSprite() {
    let maxX = window.innerWidth - sprite.offsetWidth;
    let maxY = window.innerHeight - sprite.offsetHeight;

    posX += velocityX;
    posY += velocityY;

    if (posX <= 0 || posX >= maxX) velocityX *= -1;
    if (posY <= 0 || posY >= maxY) velocityY *= -1;

    sprite.style.transform = `translate(${posX}px, ${posY}px)`;
  }

  setInterval(moveSprite, 50);
});
