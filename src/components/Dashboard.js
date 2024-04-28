import React, { useState, useEffect } from "react";
import NutrimentIntel from "./NutrimentIntel";
import Bonjour from "./Bonjour";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";
import { UserPerformance, UserAverageSessions } from "./Modelisation";

function Dashboard() {
  const [userData2, setUserData2] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(18); // UserId initial sélectionné

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

  useEffect(() => {
    // Vérifier si userData2 est défini avant d'instancier UserPerformance
    if (userData2) {
      // Créer une instance de la classe et transformer les données
      const formattedDataRadial = new UserPerformance(
        userData2
      ).getFormattedData();
      const formattedDataLineChart = new UserAverageSessions(
        userData2
      ).getFormattedData();
      // Afficher les données formatées
      console.log(formattedDataRadial);
      console.log(formattedDataLineChart);
    }
  }, [userData2]);

  return (
    <div className="main-page-container">
      {userData2 && dataName && (
        <>
          <Bonjour user={dataName.firstName} />
          <div className="main-page-infos">
            <div className="main-page-graphics">
              <div className="upper-graphics">
                <div className="activity-daily">
                  {userData2 && (
                    <BarChart
                      width={800}
                      height={220}
                      data={
                        userData2.user_activity.find(
                          (user) => user.userId === selectedUserId
                        ).sessions
                      }
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip
                        wrapperStyle={{ width: 100, backgroundColor: "#ccc" }}
                      />
                      <Legend
                        width={300}
                        wrapperStyle={{ top: 10, right: 20 }}
                      />
                      <Bar
                        dataKey="kilogram"
                        fill="#FF0000"
                        name="Poids (kg)"
                        legendType="circle"
                        barSize={10}
                        radius={[10, 10, 0, 0]}
                      />
                      <Bar
                        dataKey="calories"
                        fill="#000000"
                        name="Calories brûlées (kCal)"
                        legendType="circle"
                        barSize={10}
                        radius={[10, 10, 0, 0]}
                      />
                    </BarChart>
                  )}
                </div>
              </div>
              <div className="lower-graphics">
                <div className="average-session">
                  <>
                    {userData2 && (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          width={700}
                          height={200}
                          data={
                            userData2.user_average_sessions.find(
                              (user) => user.userId === selectedUserId
                            ).sessions
                          }
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="sessionLength"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </>
                </div>

                <div className="radar-stat">
                  {userData2 &&  (
                    <RadarChart
                      cx={300}
                      cy={250}
                      outerRadius={100}
                      width={500}
                      height={500}
                      data={
                        userData2.user_performance.find(
                          (user) => user.userId === selectedUserId
                        )?.data || [] // Utilisation de la condition optionnelle pour gérer le cas où les données ne sont pas présentes
                      }
                    >
                      {userData2.user_performance.find(
                        (user) => user.userId === selectedUserId
                      ) ? (
                        <>
                          <PolarGrid />
                          <PolarAngleAxis
                            dataKey="kind"
                            tick={{ fill: "#333" }}
                          />
                          <PolarRadiusAxis />
                          <Radar
                            name="Mike"
                            dataKey="value"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.6}
                          />
                        </>
                      ) : (
                        <text x={250} y={250} textAnchor="middle" fill="#333">
                          Aucune donnée disponible pour cet utilisateur.
                        </text>
                      )}
                    </RadarChart>
                  )}
                </div>

                <div className="radial-chart">
                  <>
                    {userData2 && (
                      // <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart
                        width={500}
                        height={300}
                        cx={150}
                        cy={150}
                        innerRadius={80}
                        outerRadius={150}
                        barSize={15}
                        data={[
                          userData2.user_main_data.find(
                            (user) => user.id === selectedUserId
                          ),
                        ]} // Fournir uniquement les données pertinentes
                      >
                        <RadialBar
                          minAngle={15}
                          label={{ position: "insideStart", fill: "#a4de6c" }}
                          background
                          clockWise
                          dataKey={(entry) => entry.todayScore * 100}
                        />
                        <Legend
                          iconSize={10}
                          width={220}
                          height={140}
                          layout="vertical"
                          verticalAlign="middle"
                          wrapperStyle={style}
                        />
                      </RadialBarChart>
                      //  <ResponsiveContainer/>
                    )}
                  </>
                </div>
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
