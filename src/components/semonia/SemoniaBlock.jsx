import React, { useEffect, useState } from "react";
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
  const detailsDialogId = uuidv4();

  const [detialsOpened, setDetailsOpened] = useState(false);

  const [block, setBlock] = useSemoniaStore(
    (store) => store[`block-${props.displayBlockOrder}`]
  );

  // const activeBlock = useSemoniaStore(
  //   (store) => store[SemoniaStoreObjects.ACTIVE_BLOCK]
  // );

  const bgImage = () => {
    if (block.imageUrl) {
      return block.imageUrl;
    } else {
      return IMAGES.TestImage;
    }
  };

  const myImage = new Image();
  myImage.crossOrigin = "Anonymous";

  myImage.src = bgImage();

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

  const blockSelected = () => {
    console.log("Block Clicked", block);
    document.getElementById(detailsDialogId).showModal();
  };

  const detialsClicked = () => {
    console.log("Block Details Clicked");
  };

  return (
    <>
      <div className={`block-canvas ${block.owned ? "owned-block" : ""}`}>
        <canvas onClick={() => blockSelected()} id={canvasName}></canvas>
      </div>
      <dialog id={detailsDialogId} className="modal flex-wrap">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{block?.id}</h3>
          <img src={bgImage()}></img>
          <p>Terrain: {block?.terrain}</p>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
          <button className="btn " onClick={() => detialsClicked()}>
            testButton
          </button>
        </div>
      </dialog>
    </>
  );
}
export default SemoniaBlock;
