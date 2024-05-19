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

function RadarStats({ userData }) {
  // const { id } = useParams();
  // const userId = parseInt(id);

  const [userPerfDataKind, setUserPerfDataKind] = useState(null);
  const [userPerfData, setUserPerfData] = useState(null);
  // const [userPerformanceData, setUserPerformanceData] = useState(null);
  const [formattedData, setFormattedData] = useState(null);

  useEffect(() => {
    if (userData) {
      const dataKind = userData.kind || userData.user_performance?.kind;
      const dataData = userData.data || userData.user_performance?.data;
      console.log("Raw user data:", userData);
      console.log("Extracted sessions data:", dataKind);
      console.log("Extracted sessions data:", dataData);

      setUserPerfDataKind(dataKind);
      setUserPerfData(dataData);
    }
  }, [userData]);

  useEffect(() => {
    if (userPerfData && userPerfDataKind) {
      const model = new UserPerformance({ kind: userPerfDataKind, data: userPerfData });
      const data = model.getFormattedData();
      setFormattedData(data);
      console.log("Formatted performance data:", data);
    }
  }, [userPerfData, userPerfDataKind]);

  return (
    <div className="radar-stat">
      {formattedData ? (
        <ResponsiveContainer width={400} height={200}>
          <RadarChart
            cx={200}
            cy={100}
            outerRadius={130}
            width={500}
            height={500}
            data={formattedData}
          >
            <PolarGrid stroke="white" gridType="polygon" radialLines={false}  />
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
          Données en cours de chargement.
        </text>
      )}
    </div>
  );
}

export default RadarStats;
