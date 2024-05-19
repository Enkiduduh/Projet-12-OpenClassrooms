import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserPerformance } from "./Modelisation";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

function RadarStats({ UserData }) {
  const { id } = useParams();
  const userId = parseInt(id);

  console.log("L'ID DE LA PAGE :", userId);

  const [userPerformanceData, setUserPerformanceData] = useState(null);
  const [formattedData, setFormattedData] = useState(null);

  useEffect(() => {
    const userData = UserData?.user_performance;
    if (userData) {
      const data = UserData.user_performance.find(
        (user) => user.userId === userId
      )?.data;
      setUserPerformanceData(data);
    }
  }, [UserData, userId]);

  useEffect(() => {
    if (userPerformanceData) {
      const model = new UserPerformance(userPerformanceData);
      const data = model.getFormattedData();
      setFormattedData(data);
      console.log(formattedData);
    }
  }, [userPerformanceData]);

  return (
    <div className="radar-stat">
      {userPerformanceData ? (
        <ResponsiveContainer width={400} height={200}>
          <RadarChart
            cx={200}
            cy={100}
            outerRadius={130}
            width={500}
            height={500}
            data={userPerformanceData || []}
          >
            <PolarGrid stroke="white" gridType="polygon" radialLines={false} />
            <PolarAngleAxis dataKey="kind" tick={{ fill: "white" }} />
            <PolarRadiusAxis axisLine={false} tick={false} />
            <Radar
              dataKey="value"
              stroke="red"
              fill="red"
              fillOpacity={0.6}
              legendType="none"
            />
          </RadarChart>
        </ResponsiveContainer>
      ) : (
        <text x={250} y={250} textAnchor="middle" fill="#333">
          Aucune donnée disponible pour cet utilisateur.
        </text>
      )}
    </div>
  );
}

export default RadarStats;
