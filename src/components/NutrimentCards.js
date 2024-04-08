import React from "react";

function NutrimentCards({img, value, valueName}) {
  return (
    <div className="nutriment-cards-container">
      <div className="nutriment-cards-flex">
        <div className="nutriment-cards-img">{img}</div>
        <div className="nutriment-cards-infos">
          <div className="nutriment-cards-value">{value}</div>
          <div className="nutriment-cards-value-name">{valueName}</div>
        </div>
      </div>
    </div>
  );
}

export default NutrimentCards;
