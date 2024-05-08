import React, { useState, useEffect } from "react";
import SemoniaBlock from "./SemoniaBlock";
import { v4 as uuidv4 } from "uuid";

function SemoniaBlocksContaincer() {
  const [windowSize, setWindowSize] = useState(null);

  const resize = () => {
    setWindowSize({
      h: window.innerHeight,
      w: window.innerWidth,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <>
      <div id={uuidv4()} className="semonia-block-container">
        {Array(49)
          .fill({})
          .map((b, i) => {
            const uniqueKey = uuidv4();
            return (
              <div
                className="semonia-block-container-item"
                id={uniqueKey}
                key={uniqueKey}
              >
                <SemoniaBlock parentId={uniqueKey} displayBlockOrder={i} />
              </div>
            );
          })}
      </div>
    </>
  );
}

export default SemoniaBlocksContaincer;
