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
                    <ResponsiveContainer width={800} height={220}>
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
                    </ResponsiveContainer>
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
                          height={100}
                          data={
                            userData2.user_average_sessions.find(
                              (user) => user.userId === selectedUserId
                            ).sessions
                          }
                          margin={{
                            top: 60,
                            right: 10,
                            left: 10,
                            bottom: 5,
                          }}
                        >
                          <XAxis dataKey="day" />
                          <YAxis dataKey='sessionLength' hide={true} domain={['dataMin-10', 'dataMax+10']} />

                          <Tooltip formatter={(value) => `${value} min`} />
                          <Legend />
                          <Line
                            type="natural"
                            dataKey="sessionLength"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                            legendType="none"
                          />
                          <text
                            x={100}
                            y={40}
                            textAnchor="middle"
                            fill="white"
                            fillOpacity={0.6}
                          >
                            Durée moyenne des
                          </text>
                          <text
                            x={61}
                            y={60}
                            textAnchor="middle"
                            fill="white"
                            fillOpacity={0.6}
                          >
                            sessions
                          </text>
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </>
                </div>

                <div className="radar-stat">
                  {userData2 && (
                    <ResponsiveContainer width={400} height={200}>
                      <RadarChart
                        cx={200}
                        cy={100}
                        outerRadius={130}
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
                            <PolarGrid stroke="white" gridType="polygon" />
                            <PolarAngleAxis
                              dataKey="kind"
                              tick={{ fill: "white" }}
                            />
                            <PolarRadiusAxis axisLine={false} tick={false} />
                            <Radar
                              dataKey="value"
                              stroke="red"
                              fill="red"
                              fillOpacity={0.6}
                              legendType="none"
                            />
                          </>
                        ) : (
                          <text x={250} y={250} textAnchor="middle" fill="#333">
                            Aucune donnée disponible pour cet utilisateur.
                          </text>
                        )}
                      </RadarChart>
                    </ResponsiveContainer>
                  )}
                </div>

                <div className="radial-chart">
                  <>
                    {userData2 && (
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                          width={500}
                          height={300}
                          cx={125}
                          cy={125}
                          innerRadius={90}
                          outerRadius={80}
                          barSize={15}
                          data={[
                            userData2.user_main_data.find(
                              (user) => user.id === selectedUserId
                            ),
                          ]} // Fournir uniquement les données pertinentes
                          fill="white"
                        >
                          <RadialBar
                            minAngle={15}
                            fill="red"
                            label={{ position: "outside", fill: "black" }}
                            background
                            clockWise
                            dataKey="todayScore"
                          />

                          <text x={20} y={30} fill="black">
                            Score
                          </text>
                          <text x={100} y={110} fill="black" stroke="black">
                            {userData2.todayScore * 100}%
                          </text>
                          <text x={100} y={130} fill="grey">
                            de votre
                          </text>
                          <text x={100} y={150} fill="grey">
                            objectif
                          </text>
                        </RadialBarChart>
                      </ResponsiveContainer>
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
