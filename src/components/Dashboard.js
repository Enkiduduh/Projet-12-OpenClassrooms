import React, { useState, useEffect } from "react";
import NutrimentIntel from "./NutrimentIntel";
import RadarStats from "./RadarStats";
import AverageSessions from "./AverageSessions";
import DailyActivities from "./DailyActivities";
import ScoreRadial from "./ScoreRadial";
import Bonjour from "./Bonjour";
import { useParams } from "react-router-dom";
import {
  getUser,
  getUserPerformance,
  getUserActivity,
  getAverageSessions,
} from "../data/callApi";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [userPerformanceData, setUserPerformanceData] = useState(null);
  const [userAverageSessionsData, setUserAverageSessionsData] = useState(null);
  const [userActivityData, setUserActivityData] = useState(null);

  const { id } = useParams();
  const userId = parseInt(id);

  useEffect(() => {
    const fetchData = async () => {
      const userApiData = await getUser(userId);
      setUserData(userApiData);
      const userPerfData = await getUserPerformance(userId);
      setUserPerformanceData(userPerfData);
      const userAverageData = await getAverageSessions(userId);
      setUserAverageSessionsData(userAverageData);
      const userActivData = await getUserActivity(userId);
      setUserActivityData(userActivData);
    };

    fetchData();
  }, [userId]);

  return (
    <div className="main-page-container">
      {userData && userActivityData && userAverageSessionsData && userPerformanceData ? (
        <>
          <Bonjour user={userData.userInfos.firstName} />
          <div className="main-page-infos">
            <div className="main-page-graphics">
              <div className="upper-graphics">

                <DailyActivities userData={userActivityData} />
              </div>
              <div className="lower-graphics">
                <AverageSessions userData={userAverageSessionsData} />
                <RadarStats userData={userPerformanceData} />
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
