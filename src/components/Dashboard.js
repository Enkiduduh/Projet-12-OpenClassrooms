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

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [userData2, setUserData2] = useState(null);

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

  useEffect(() => {
    if (userData2) {
      const userWithId12 = userData2.user_activity.find(
        (user) => user.userId === 12
      );
      console.log(userWithId12);
    }
  }, [userData2]);

  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    const radius = 10;

    return (
      <g>
        <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
        <text
          x={x + width / 2}
          y={y - radius}
          fill="#fff"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {value.split(" ")[1]}
        </text>
      </g>
    );
  };

  const style = {
    top: 0,
    left: 350,
    lineHeight: "20px",
  };

  return (
    <div className="main-page-container">
      {userData && (
        <>
          <Bonjour user={userData.user_main_data[0].userInfos.firstName} />
          <div className="main-page-infos">
            <div className="main-page-graphics">
              <div className="upper-graphics">
                <div className="activity-daily">
                  {userData2 && (
                      <BarChart
                        width={800}
                        height={200}
                        data={
                          userData2.user_activity.find(
                            (user) => user.userId === 12
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
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="kilogram" fill="#8884d8" />
                        <Bar dataKey="calories" fill="#82ca9d" />
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
                              (user) => user.userId === 12
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
                  <RadarChart
                    cx={300}
                    cy={250}
                    outerRadius={100}
                    width={500}
                    height={500}
                    data={
                      userData2.user_performance.find(
                        (user) => user.userId === 12
                      ).data
                    }
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="kind" tick={{ fill: "#333" }} />
                    <PolarRadiusAxis />
                    <Radar
                      name="Mike"
                      dataKey="value"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
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
                            (user) => user.id === 12
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
              {userData && (
                <NutrimentIntel
                  value1={
                    (
                      userData.user_main_data[0].keyData.calorieCount / 1000
                    ).toLocaleString("fr-FR", { minimumFractionDigits: 3 }) +
                    "kCal"
                  }
                  value2={userData.user_main_data[0].keyData.proteinCount + "g"}
                  value3={
                    userData.user_main_data[0].keyData.carbohydrateCount + "g"
                  }
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
