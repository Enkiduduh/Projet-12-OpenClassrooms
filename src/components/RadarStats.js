import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

  useEffect(() => {
    const data =
      UserData &&
      UserData.user_performance.find((user) => user.userId === userId)?.data;
    setUserPerformanceData(data);
  }, [UserData, userId]);

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
