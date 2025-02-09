document.addEventListener("DOMContentLoaded", function () {
  const sprite = document.getElementById("sprite");
  console.log(sprite);

  let velocityX = 5;
  let velocityY = 5;

  function moveSprite() {
    console.log("moveSprite called");
    let rect = sprite.getBoundingClientRect();
    let maxX = window.innerWidth - rect.width;
    let maxY = window.innerHeight - rect.height;

    let newX = rect.left + velocityX;
    let newY = rect.top + velocityY;

    if (newX <= 0 || newX >= maxX) velocityX *= -1;
    if (newY <= 0 || newY >= maxY) velocityY *= -1;

    // ONLY use translate(x, y) here for movement
    sprite.style.transform = `translate(${newX}px, ${newY}px)`;
    console.log(newX, newY);
  }

  setInterval(moveSprite, 50);
});
