import React, { useState } from "react";
import SemoniaBlock from "./SemoniaBlock";
import BlockDetailsModal from "./BlockDetailsModal";
import { v4 as uuidv4 } from "uuid";

function SemoniaBlocksContaincer() {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailedBlock, setDetailedBlock] = useState(null);

  function openDetails(block) {
    console.log("Open Details Clicked", block);
    setDetailedBlock(block);
    setDetailsOpen(true);
  }

  if (true) {
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
                  <SemoniaBlock
                    parentId={uniqueKey}
                    displayBlockOrder={i}
                    openDetails={openDetails}
                  />
                </div>
              );
            })}
        </div>
        <BlockDetailsModal
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
        >
          <div className="text-center w-56">
            <div className="mx-auto my-4 w-48">
              <h3 className="text-lg font-black text-gray-800">
                {detailedBlock?.id}
              </h3>
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this item?
              </p>
            </div>
            <button
              className="btn btn-light w-full"
              onClick={() => setDetailsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </BlockDetailsModal>
      </>
    );
  } else {
    return (
      <>
        <div>No State</div>
      </>
    );
  }
}

export default SemoniaBlocksContaincer;
