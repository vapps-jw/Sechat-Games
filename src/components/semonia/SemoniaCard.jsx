import React from "react";
import { Link } from "react-router-dom";
import IMAGES from "../../utils/AssetsRepo";

function SemoniaCard() {
  const imgUrl = new URL("/images/wip.jpg", import.meta.url).href;
  console.log("Image Path", imgUrl);
  return (
    <>
      <Link to={"/semonia"}>
        <div
          className={`card shadow-xl image-full bg-cover bg-center bg-['${imgUrl}']`}
        >
          <div className="card-body text-center bangers-font text-3xl p-12">
            SEMONIA
          </div>
        </div>
      </Link>
    </>
  );
}

export default SemoniaCard;
