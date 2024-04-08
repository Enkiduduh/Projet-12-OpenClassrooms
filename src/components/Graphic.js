import React from "react";

function Graphic() {
  return (
    <>
      <div className="graph-container">
        <div id="1" className="graph"></div>
        <div className="graph-container">
          <div id="2" className="graph"></div>
          <div id="3" className="graph"></div>
          <div id="4" className="graph"></div>
        </div>
      </div>
    </>
  );
}

export default Graphic;
