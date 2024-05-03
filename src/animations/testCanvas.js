const testCanvas = (settings) => {
  const canvas = document.getElementById(settings.canvasId);
  const ctx = canvas.getContext("2d");
  canvas.width = settings.canvasWidth;
  canvas.height = settings.canvasHeight;

  ctx.drawImage(settings.myImage, 0, 0, canvas.width, canvas.height);
};

export default testCanvas;
