import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";

function AverageSessions({ UserData }) {
  const { id } = useParams();
  const userId = parseInt(id);

  const [userSessionLengthData, setUserSessionLengthData] = useState(null);

  useEffect(() => {
    if (UserData) {
      const data = UserData.user_average_sessions.find(
        (user) => user.userId === userId
      )?.sessions;
      setUserSessionLengthData(data);
    }
  }, [UserData, userId]);

  console.log("L'ID DE LA PAGE :", userId);

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
    <div className="average-session">
      <>
        {userSessionLengthData ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width="100%"
              height="100%"
              data={userSessionLengthData || []}
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
                <linearGradient id="colorUv" x1="0%" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                  <stop offset="20%" stopColor="rgba(255, 255, 255, 0.4)" />
                  <stop offset="40%" stopColor="rgba(255, 255, 255, 0.5)" />
                  <stop offset="60%" stopColor="rgba(255, 255, 255, 0.6)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <text x={250} y={250} textAnchor="middle" fill="#333">
            Aucune donnée disponible pour cet utilisateur.
          </text>
        )}
      </>
    </div>
  );
}

export default AverageSessions;
