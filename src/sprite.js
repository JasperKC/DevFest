document.addEventListener("DOMContentLoaded", function () {
  const sprite = document.getElementById("sprite");

  let velocityX = 10; // Increased speed
  let velocityY = 10; // Increased speed

  function moveSprite() {
    let rect = sprite.getBoundingClientRect();
    let maxX = window.innerWidth - rect.width;
    let maxY = window.innerHeight - rect.height;

    let newX = rect.left + velocityX;
    let newY = rect.top + velocityY;

    if (newX <= 0 || newX >= maxX) velocityX *= -1;
    if (newY <= 0 || newY >= maxY) velocityY *= -1;

    sprite.style.transform = `translate(${newX}px, ${newY}px)`;
  }

  document.addEventListener("mousemove", function (event) {
    let rect = sprite.getBoundingClientRect();
    let spriteX = rect.left + rect.width / 2;
    let spriteY = rect.top + rect.height / 2;

    let deltaX = spriteX - event.clientX;
    let deltaY = spriteY - event.clientY;

    let distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    if (distance < 150) {
      // Increase sensitivity range
      velocityX = (deltaX / distance) * 20; // Increase speed
      velocityY = (deltaY / distance) * 20; // Increase speed
    }
  });

  setInterval(moveSprite, 30); // Reduced interval for smoother movement
});
