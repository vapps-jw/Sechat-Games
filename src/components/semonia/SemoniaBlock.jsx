import React, { useEffect } from "react";
import { GuidEnum } from "../../utils/enums";
import IMAGES from "../../utils/AssetsRepo";
import { v4 as uuidv4 } from "uuid";
import testCanvas from "../../animations/testCanvas";
import {
  SemoniaStoreObjects,
  useSemoniaStore,
} from "../../contexts/semoniaState";

function SemoniaBlock(props) {
  const canvasName = uuidv4();

  const [state, setState] = useSemoniaStore(
    (store) => store[SemoniaStoreObjects.SEMONIA_STATE]
  );

  // todo: split contexts per block
  const myImage = new Image();
  myImage.crossOrigin = "Anonymous";
  myImage.src = IMAGES.TestFaceImage;

  useEffect(() => {
    const parent = document.getElementById(props.parentId);
    myImage.addEventListener("load", function () {
      const settings = {
        canvasId: canvasName,
        myImage: myImage,
        canvasWidth: parent.offsetWidth,
        canvasHeight: parent.offsetHeight,
      };
      testCanvas(settings);
    });
  }, []);

  return (
    <>
      <canvas className="block-canvas" id={canvasName}></canvas>
    </>
  );
}
export default SemoniaBlock;
