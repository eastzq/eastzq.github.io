(function () {
  const canvas = document.getElementById("canvas_effects");
  const context = canvas.getContext("2d");
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  const effects = [];

  function Effect() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 20 + 5;
    this.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    this.speedX = Math.random() - 0.5;
    this.speedY = Math.random() - 0.5;
  }

  Effect.prototype.draw = function () {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > width) {
      this.speedX = -this.speedX;
    }

    if (this.y < 0 || this.y > height) {
      this.speedY = -this.speedY;
    }
  };

  function initializeEffects() {
    for (let i = 0; i < 100; i++) {
      effects.push(new Effect());
    }
  }

  function drawEffects() {
    context.clearRect(0, 0, width, height);
    effects.forEach(function (effect) {
      effect.draw();
    });
    requestAnimationFrame(drawEffects);
  }

  window.addEventListener("resize", function () {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });

  initializeEffects();
  drawEffects();
})();
