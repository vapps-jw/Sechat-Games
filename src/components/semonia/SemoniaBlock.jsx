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

  const [blockState, setBlockState] = useSemoniaStore(
    (store) => store[`block-${props.displayBlockOrder}`]
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
      {/* <div>{JSON.stringify(blockState.terrain)}</div> */}
      <canvas
        onClick={() => props.openDetails(blockState)}
        className="block-canvas"
        id={canvasName}
      ></canvas>
    </>
  );
}
export default SemoniaBlock;
