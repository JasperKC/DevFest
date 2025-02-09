const sprite = document.getElementById("sprite");
let velocityX = (Math.random() - 0.5) * 10;
let velocityY = (Math.random() - 0.5) * 10;
const speed = 5;

function moveSprite() {
  let rect = sprite.getBoundingClientRect();
  let maxX = window.innerWidth - rect.width;
  let maxY = window.innerHeight - rect.height;

  let newX = rect.left + velocityX;
  let newY = rect.top + velocityY;

  // Bounce off edges
  if (newX <= 0 || newX >= maxX) velocityX *= -1;
  if (newY <= 0 || newY >= maxY) velocityY *= -1;

  sprite.style.transform = `translate(${newX}px, ${newY}px)`;
}

// Move away from cursor
document.addEventListener("mousemove", (event) => {
  let rect = sprite.getBoundingClientRect();
  let spriteX = rect.left + rect.width / 2;
  let spriteY = rect.top + rect.height / 2;

  let deltaX = spriteX - event.clientX;
  let deltaY = spriteY - event.clientY;
  let distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

  if (distance < 100) {
    // If cursor is close, move away
    velocityX += (deltaX / distance) * speed;
    velocityY += (deltaY / distance) * speed;
  }
});

// Move the sprite every 50ms
setInterval(moveSprite, 50);
