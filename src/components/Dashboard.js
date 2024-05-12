import React, { useState, useEffect } from "react";
import NutrimentIntel from "./NutrimentIntel";
import RadarStats from "./RadarStats";
import AverageSessions from "./AverageSessions";
import DailyActivities from "./DailyActivities";
import ScoreRadial from "./ScoreRadial";
import Bonjour from "./Bonjour";


function Dashboard() {
  const [userData2, setUserData2] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(12); // UserId initial sélectionné


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../db.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setUserData2(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUserIdChange = (userId) => {
    setSelectedUserId(userId);
  };

  useEffect(() => {
    if (userData2) {
      const userWithSelectedId = userData2.user_activity.find(
        (user) => user.userId === selectedUserId
      );
      console.log(selectedUserId);
    }
  }, [userData2, selectedUserId]);

  const style = {
    top: 0,
    left: 350,
    lineHeight: "20px",
  };

  const dataNutriment =
    userData2 &&
    userData2.user_main_data.find((user) => user.id === selectedUserId)
      ?.keyData;

  const dataName =
    userData2 &&
    userData2.user_main_data.find((user) => user.id === selectedUserId)
      ?.userInfos;

  return (
    <div className="main-page-container">
      {userData2 && dataName && (
        <>
          <Bonjour user={dataName.firstName} />
          <div className="main-page-infos">
            <div className="main-page-graphics">
              <div className="upper-graphics">
                <DailyActivities UserData={userData2} />
              </div>
              <div className="lower-graphics">
                <AverageSessions UserData={userData2} />
                <RadarStats UserData={userData2} />
                <ScoreRadial UserData={userData2} />
              </div>
            </div>
            <div className="main-page-values">
              {dataNutriment && (
                <NutrimentIntel
                  value1={
                    (dataNutriment.calorieCount / 1000).toLocaleString(
                      "fr-FR",
                      { minimumFractionDigits: 3 }
                    ) + "kCal"
                  }
                  value2={dataNutriment.proteinCount + "g"}
                  value3={dataNutriment.carbohydrateCount + "g"}
                  value4={dataNutriment.lipidCount + "g"}
                />
              )}
            </div>
          </div>
          <div>
            <button onClick={() => handleUserIdChange(12)}>
              Utilisateur 12
            </button>
            <button onClick={() => handleUserIdChange(18)}>
              Utilisateur 18
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
