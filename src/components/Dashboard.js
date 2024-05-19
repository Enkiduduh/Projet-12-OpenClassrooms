import React, { useState, useEffect } from "react";
import NutrimentIntel from "./NutrimentIntel";
import RadarStats from "./RadarStats";
import AverageSessions from "./AverageSessions";
import DailyActivities from "./DailyActivities";
import ScoreRadial from "./ScoreRadial";
import Bonjour from "./Bonjour";
import { useParams } from "react-router-dom";

function Dashboard() {
  // const [userData2, setUserData2] = useState(null);
  // const [userNutriment, setUserNutriment] = useState(null);
  // const [userName, setUserName] = useState(null);
  const [apiUserData, SetApiUserData] = useState(null);
  const [localUserData, SetLocalUserData] = useState(null);

  const { id } = useParams();
  const userId = parseInt(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch API data");
        }
        const userData = await response.json();
        console.log("API data:", userData);
        SetApiUserData(userData.data);
      } catch (error) {
        console.error("Error fetching API data:", error);
        try {
          const response = await fetch(`../db.json`);
          if (!response.ok) {
            throw new Error("Failed to fetch local data");
          }
          const allUserData = await response.json();
          console.log("Local data:", allUserData);
          const user = allUserData.user_main_data.find(
            (user) => user.id === userId
          );
          if (user) {
            SetLocalUserData(user);
            console.log(localUserData)
          } else {
            throw new Error("User not found in local data");
          }
        } catch (error) {
          console.error("Error fetching local data:", error);
        }
      }
    };

    fetchData();
  }, [userId]);

  const userData = apiUserData || localUserData;
  return (
    <div className="main-page-container">
      {userData ? (
        <>
          <Bonjour user={userData.userInfos.firstName} />
          <div className="main-page-infos">
            <div className="main-page-graphics">
              <div className="upper-graphics">
                <DailyActivities userData={userData} />
              </div>
              <div className="lower-graphics">
                <AverageSessions userData={userData} />
                <RadarStats userData={userData} />
                <ScoreRadial userData={userData} />
              </div>
            </div>
            <div className="main-page-values">
              <NutrimentIntel
                value1={
                  (userData.keyData.calorieCount / 1000).toLocaleString(
                    "fr-FR",
                    {
                      minimumFractionDigits: 3,
                    }
                  ) + "kCal"
                }
                value2={userData.keyData.proteinCount + "g"}
                value3={userData.keyData.carbohydrateCount + "g"}
                value4={userData.keyData.lipidCount + "g"}
              />
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
