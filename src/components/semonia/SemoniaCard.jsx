import React from "react";
import { Link } from "react-router-dom";
import IMAGES from "../../utils/AssetsRepo";

function SemoniaCard() {
  return (
    <>
      <Link to={"/semonia"}>
        <div
          className={`card shadow-xl image-full bg-cover bg-center bg-[url('${IMAGES.SemoniaCardImage}')]`}
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
