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
import PropTypes from "prop-types";
import {
  UserPerformance,
  UserAverageSessions,
  UserDailyActivity,
} from "./Modelisation";

function Dashboard() {
  const [userData2, setUserData2] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(12); // UserId initial sélectionné

  const [minWeight, setMinWeight] = useState(null);
  const [maxWeight, setMaxWeight] = useState(100);

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

  const dataScore =
    (userData2 &&
      userData2.user_main_data.find((user) => user.id === selectedUserId)
        ?.todayScore) ||
    (userData2 &&
      userData2.user_main_data.find((user) => user.id === selectedUserId)
        ?.score);

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
      const { formattedData, minWeight, maxWeight } = new UserDailyActivity(
        userData2.user_activity.find(
          (user) => user.userId === selectedUserId
        ).sessions
      ).getFormattedData();

      setMinWeight(minWeight);
      setMaxWeight(maxWeight);
      // Afficher les données formatées
      console.log(formattedDataRadial);
      console.log(formattedDataLineChart);
      console.log(formattedData);
      console.log(minWeight);
      console.log(maxWeight);
    }
  }, [userData2]);

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const weightValue = payload[0]?.value ?? 0;
      const calorieValue = payload[1]?.value ?? 0;

      return (
        <div className="tooltipActivity">
          <p>{weightValue + "kg"}</p>
          <p>{calorieValue + "kCal"}</p>
        </div>
      );
    }
    return null;
  };

  CustomToolTip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  };
  const formatXAxis = (value, index) => index + 1;

  const CustomToolTipSessionLength = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const sessionLentgthInMin = payload[0]?.value ?? 0;

      return (
        <div className="tooltipSessionLength">
          <p>{sessionLentgthInMin + " " + "min"}</p>
        </div>
      );
    }
    return null;
  };

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
                    <ResponsiveContainer width={800} height={180}>
                      <BarChart
                        // width={800}
                        // height={180}
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
                        barSize={10}
                        barGap={10}
                      >
                        <CartesianGrid
                          stroke="rgba(222, 222, 222, 1)"
                          strokeDasharray="2 2"
                          vertical={false}
                        />
                        <YAxis dataKey="calories" yAxisId="left" hide={true} />
                        <YAxis
                          dataKey="kilogram"
                          yAxisId="right"
                          orientation="right"
                          domain={[minWeight, maxWeight]}
                          tickCount={4}
                          tickLine={false}
                          axisLine={{ stroke: "transparent" }}
                          tick={{
                            dx: 16,
                            style: {
                              fontSize: "14px",
                              fill: "rgba(155, 158, 172, 1)",
                            },
                          }}
                        />
                        <XAxis
                          tick={{
                            dy: 16,
                            style: {
                              fontSize: "14px",
                              fill: "rgba(155, 158, 172, 1)",
                            },
                          }}
                          tickFormatter={formatXAxis}
                          tickLine={false}
                          dataKey="day"
                        />
                        <Tooltip
                          content={<CustomToolTip />}
                          wrapperStyle={{ width: 50, backgroundColor: "red" }}
                        />
                        <Legend
                          width={300}
                          wrapperStyle={{ top: -40, right: 30 }}
                        />
                        <Bar
                          dataKey="kilogram"
                          fill="#FF0000"
                          name="Poids (kg)"
                          legendType="circle"
                          radius={[10, 10, 0, 0]}
                          yAxisId="right"
                        />
                        <Bar
                          dataKey="calories"
                          fill="#000000"
                          name="Calories brûlées (kCal)"
                          legendType="circle"
                          radius={[10, 10, 0, 0]}
                          yAxisId="left"
                        />
                        <text
                          x={-20}
                          y={-10}
                          fill="#333"
                          fontWeight={500}
                          style={{ position: "absolute" }}
                        >
                          Activité quotidienne
                        </text>
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
                          width="100%"
                          height="100%"
                          data={
                            userData2.user_average_sessions.find(
                              (user) => user.userId === selectedUserId
                            ).sessions
                          }
                          margin={{
                            top: 60,
                            right: 20,
                            left: 0,
                            bottom: 10,
                          }}
                        >
                          <XAxis
                            dataKey="day"
                            axisLine={{ stroke: "transparent" }}
                            tickLine={false}
                            tick={{
                              dx: 16,
                              style: {
                                fontSize: "14px",
                                fill: "rgba(200, 200, 200, 1)",
                              },
                            }}
                            interval="preserveStartEnd"
                          />
                          <YAxis
                            dataKey="sessionLength"
                            hide={true}
                            domain={["dataMin-10", "dataMax+10"]}
                          />
                          <Tooltip
                            formatter={(value) => `${value} min`}
                            wrapperStyle={{ backgroundColor: "white" }}
                            content={<CustomToolTipSessionLength />}
                            labelFormatter={(value) => `Jour ${value}`}
                          />
                          <Legend />
                          <Line
                            type="natural"
                            dataKey="sessionLength"
                            stroke="url(#colorUv)"
                            activeDot={{
                              stroke: "#FFFFFF",
                              strokeWidth: 8,
                              r: 4,
                            }}
                            dot={false}
                            legendType="none"
                            strokeWidth={2}
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
                          <defs>
                            <linearGradient
                              id="colorUv"
                              x1="0%"
                              y1="0"
                              x2="100%"
                              y2="0"
                            >
                              <stop
                                offset="0%"
                                stopColor="rgba(255, 255, 255, 0.3)"
                              />
                              <stop
                                offset="20%"
                                stopColor="rgba(255, 255, 255, 0.4)"
                              />
                              <stop
                                offset="40%"
                                stopColor="rgba(255, 255, 255, 0.5)"
                              />
                              <stop
                                offset="60%"
                                stopColor="rgba(255, 255, 255, 0.6)"
                              />
                              <stop
                                offset="100%"
                                stopColor="rgba(255, 255, 255, 1)"
                              />
                            </linearGradient>
                          </defs>
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
                            <PolarGrid
                              stroke="white"
                              gridType="polygon"
                              radialLines={false}
                            />
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
                            {
                              ...userData2.user_main_data.find(
                                (user) => user.id === selectedUserId
                              ),
                            },
                          ]} // Fournir uniquement les données pertinentes
                          fill="white"

                        >
                          <RadialBar
                            minAngle={15}
                            fill="red"
                            background
                            clockWise
                            dataKey={
                              userData2?.user_main_data.find(
                                (user) => user.id === selectedUserId
                              )?.todayScore
                                ? "todayScore"
                                : "score"
                            }
                          />

                          <text x={20} y={30} fill="black">
                            Score
                          </text>
                          <text
                            x={105}
                            y={110}
                            fill="black"
                            stroke="black"
                            fontSize="24"
                            fontWeight={500}
                            startAngle={90}
                          >
                            {dataScore * 100}%
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
