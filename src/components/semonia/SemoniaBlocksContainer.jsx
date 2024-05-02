import React, { useState } from "react";
import {
  SemoniaStoreObjects,
  useSemoniaStore,
} from "../../contexts/semoniaState";
import SemoniaBlock from "./SemoniaBlock";
import BlockDetailsModal from "./BlockDetailsModal";

function SemoniaBlocksContaincer() {
  const [state, setState] = useSemoniaStore(
    (store) => store[SemoniaStoreObjects.SEMONIA_STATE]
  );

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailedBlock, setDetailedBlock] = useState(null);

  function openDetails(block) {
    console.log("Open Details Clicked", block);
    setDetailedBlock(block);
    setDetailsOpen(true);
  }

  if (state) {
    return (
      <>
        <div className="semonia-block-container">
          {state.blocks.map((b, i) => (
            <div onClick={() => openDetails(b)}>
              <SemoniaBlock key={i} data={b} />
            </div>
          ))}
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
