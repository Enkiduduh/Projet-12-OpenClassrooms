import React from "react";
import NutrimentCards from "./components/NutrimentCards";
import iconProteines from "./assets/protein-icon.png";
import iconLipides from "./assets/fat-icon.png";
import iconGlucides from "./assets/carbs-icon.png";
import iconCalories from ".assets/calories-icon.png";

function NutrimentIntel() {
  return (
    <>
      <NutrimentCards
        img={iconCalories}
        string="calories"
        value="xxx"
        valueName="calories"
      />
      <NutrimentCards
        img={iconProteines}
        string="protéines"
        value="xxx"
        valueName="protéines"
      />
      <NutrimentCards
        img={iconGlucides}
        string="glucides"
        value="xxx"
        valueName="glucides"
      />
      <NutrimentCards
        img={iconLipides}
        string="lipides"
        value="xxx"
        valueName="lipides"
      />
    </>
  );
}

export default NutrimentIntel;
