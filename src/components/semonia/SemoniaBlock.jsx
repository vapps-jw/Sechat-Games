import React from "react";

function SemoniaBlock(props) {
  return (
    <>
      <div className={props.data.id ? "bg-rose-500" : "bg-black"}>
        <div className="semonia-block-container-item">
          {props.data.displayOrder}
        </div>
      </div>
    </>
  );
}
export default SemoniaBlock;
