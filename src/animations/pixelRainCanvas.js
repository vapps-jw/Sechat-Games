const pixelRainCanvas = (settings) => {
  const canvas = document.getElementById(settings.canvasId);
  const ctx = canvas.getContext("2d");
  canvas.width = settings.canvasWidth;
  canvas.height = settings.canvasHeight;

  const letters = ["M"];
  let switcher = 1;
  let counter = 0;
  setInterval(function () {
    counter++;
    if (counter % 12 === 0) {
      switcher *= -1;
    }
  }, 500);

  ctx.drawImage(settings.myImage, 0, 0, canvas.width, canvas.height);
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let particlesArray = [];
  const numberOfParticles = 2000;

  let mappedImage = [];
  for (let y = 0; y < canvas.height; y++) {
    let row = [];
    for (let x = 0; x < canvas.width; x++) {
      const red = pixels.data[y * 4 * pixels.width + x * 4];
      const green = pixels.data[y * 4 * pixels.width + (x * 4 + 1)];
      const blue = pixels.data[y * 4 * pixels.width + (x * 4 + 2)];
      const brightness = calculateRelativeBrightness(red, green, blue);
      const cell = [brightness, "rgb(" + red + "," + green + "," + blue + ")"];
      row.push(cell);
    }
    mappedImage.push(row);
  }

  function calculateRelativeBrightness(red, green, blue) {
    return (
      Math.sqrt(
        red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114
      ) / 100
    );
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.speed = 0;
      this.velocity = Math.random() * 0.5;
      this.size = Math.random() * 2.5 + 0.2;
      this.position1 = Math.floor(this.y);
      this.position2 = Math.floor(this.x);
      this.angle = 0;
      this.letter = letters[Math.floor(Math.random() * letters.length)];
      this.random = Math.random();
    }
    update() {
      this.position1 = Math.floor(this.y);
      this.position2 = Math.floor(this.x);
      if (
        mappedImage[this.position1] &&
        mappedImage[this.position1][this.position2]
      ) {
        this.speed = mappedImage[this.position1][this.position2][0];
      }
      let movement = 2.5 - this.speed + this.velocity;
      this.angle += this.speed / 40;
      this.size = this.speed * 1.5;

      this.y -= movement;
      this.x += movement + Math.sin(this.angle) * 2;
      if (this.y <= 0) {
        this.y = canvas.height;
        this.x = Math.random() * canvas.width;
      }
      if (this.x >= canvas.width) {
        this.x = 0;
        this.y = Math.random() * canvas.height;
      }
    }
    draw() {
      ctx.beginPath();
      if (
        mappedImage[this.position1] &&
        mappedImage[this.position1][this.position2]
      ) {
        ctx.fillStyle = mappedImage[this.position1][this.position2][1];
        ctx.strokeStyle = mappedImage[this.position1][this.position2][1];
      }

      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  function init() {
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }
  init();
  function animate() {
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 0.2;
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      ctx.globalAlpha = particlesArray[i].speed * 0.3;
      //ctx.globalAlpha = 1;
      particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
};

export default pixelRainCanvas;
