import React, { useState, useEffect } from "react";
import NutrimentIntel from "./NutrimentIntel";
import Bonjour from "./Bonjour";

function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../db.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(userData);

  useEffect(() => {
    if (userData) {
      const userWithId12 = userData.user_main_data.find(
        (user) => user.id === 12
      );
      console.log(userWithId12);
    }
  }, [userData]);

  return (
    <div className="main-page-container">
      {userData && (
        <>
          <Bonjour />
          <div className="main-page-infos">
            <div className="main-page-graphics">
              <div className="upper-graphics">
                <div className="activity-daily"></div>
              </div>
              <div className="lower-graphics">
                <div className="average-session"></div>
                <div className="radar-stat"></div>
                <div className="radial-chart"></div>
              </div>
            </div>
            <div className="main-page-values">
              {userData && (
                <NutrimentIntel
                  value1={(userData.user_main_data[0].keyData.calorieCount / 1000).toLocaleString('fr-FR', { minimumFractionDigits: 3 }) + "kCal"}
                  value2={userData.user_main_data[0].keyData.proteinCount + "g"}
                  value3={userData.user_main_data[0].keyData.carbohydrateCount + "g"}
                  value4={userData.user_main_data[0].keyData.lipidCount + "g"}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );

}

export default Dashboard;
