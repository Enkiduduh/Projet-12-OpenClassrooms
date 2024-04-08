import React from "react";
import NutrimentCards from "./NutrimentCards";
import iconProteines from "../assets/protein-icon.png";
import iconLipides from "../assets/fat-icon.png";
import iconGlucides from "../assets/carbs-icon.png";
import iconCalories from "../assets/calories-icon.png";

function NutrimentIntel() {
  return (
    <>
      <NutrimentCards
        img={iconCalories}
        string="calories"
        value="calories"
        valueName="Calories"
      />
      <NutrimentCards
        img={iconProteines}
        string="protéines"
        value="calories"
        valueName="Protéines"
      />
      <NutrimentCards
        img={iconGlucides}
        string="glucides"
        value="calories"
        valueName="Glucides"
      />
      <NutrimentCards
        img={iconLipides}
        string="lipides"
        value="calories"
        valueName="Lipides"
      />
    </>
  );
}

export default NutrimentIntel;
