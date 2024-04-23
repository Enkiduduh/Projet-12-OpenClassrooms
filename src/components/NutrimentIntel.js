import React from "react";
import NutrimentCards from "./NutrimentCards";
import iconProteines from "../assets/protein-icon.png";
import iconLipides from "../assets/fat-icon.png";
import iconGlucides from "../assets/carbs-icon.png";
import iconCalories from "../assets/calories-icon.png";

function NutrimentIntel({value1, value2, value3, value4}) {
  return (
    <>
      <NutrimentCards
        img={iconCalories}
        string="calories"
        value={value1}
        valueName="Calories"
      />
      <NutrimentCards
        img={iconProteines}
        string="protéines"
        value={value2}
        valueName="Protéines"
      />
      <NutrimentCards
        img={iconGlucides}
        string="glucides"
        value={value3}
        valueName="Glucides"
      />
      <NutrimentCards
        img={iconLipides}
        string="lipides"
        value={value4}
        valueName="Lipides"
      />
    </>
  );
}

export default NutrimentIntel;
