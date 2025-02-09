document.addEventListener("DOMContentLoaded", function () {
  const sprite = document.getElementById("sprite");
  console.log(sprite); // Check if sprite is found

  let velocityX = 5;
  let velocityY = 5;

  function moveSprite() {
    console.log("moveSprite called"); // Confirm this is running
    let rect = sprite.getBoundingClientRect();
    let maxX = window.innerWidth - rect.width;
    let maxY = window.innerHeight - rect.height;

    let newX = rect.left + velocityX;
    let newY = rect.top + velocityY;

    if (newX <= 0 || newX >= maxX) velocityX *= -1;
    if (newY <= 0 || newY >= maxY) velocityY *= -1;

    sprite.style.transform = `translate(${newX}px, ${newY}px)`;
    console.log(newX, newY); // Check position changes
  }

  setInterval(moveSprite, 50);
});
