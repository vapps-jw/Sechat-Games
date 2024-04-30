import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import IMAGES from "../../utils/AssetsRepo";
import smokeCanvas from "../../animations/smokeCanvas";

function SemoniaCard() {
  const canvasName = "semoniaGameCanvas";

  const myImage = new Image();
  myImage.crossOrigin = "Anonymous";
  myImage.src = IMAGES.TestFaceImage;

  useEffect(() => {
    myImage.addEventListener("load", function () {
      const settings = {
        canvasId: canvasName,
        myImage: myImage,
        canvasWidth: window.innerWidth,
        canvasHeight: window.innerWidth * 0.75,
      };

      smokeCanvas(settings);
    });
  }, []);

  return (
    <>
      <Link to={"/semonia"}>
        <div className="flex-col">
          <canvas id={canvasName}></canvas>
        </div>
      </Link>
    </>
  );
}

export default SemoniaCard;
