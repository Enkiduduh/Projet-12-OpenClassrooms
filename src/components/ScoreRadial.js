import React, { useState, useEffect } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

function ScoreRadial({ userData }) {
  const [userScoreData, setUserScoreData] = useState(null);

  useEffect(() => {
    if (userData) {
      const score =
        userData.score ||
        userData.user_main_data?.score ||
        userData.todayScore ||
        userData.user_main_data?.todayScore;
      console.log("Raw user data:", userData);
      console.log("Extracted sessions data:", score);

      if (score) {
        setUserScoreData([{ name: "score", value: score * 100 }]);
      }
    }
  }, [userData]);

  return (
    <div className="radial-chart" style={{ position: "relative" }}>
      <>
        {userScoreData ? (
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              // width={300}
              // height={300}
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="80%"
              barSize={10}
              data={userScoreData}
              startAngle={90}
              endAngle={90 + 360 * (userScoreData[0].value / 100)}
            >
              <RadialBar
                minAngle={15}
                fill="red"
                background
                clockWise
                dataKey="value"
                cornerRadius={10}
              />
              <circle cx="50%" cy="50%" r="70" fill="white" />{" "}
              {/* Cercle blanc pour masquer l'intérieur */}
              <text x={20} y={30} fill="black"  fontSize="16">
                Score
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        ) : (
          <text x={250} y={250} textAnchor="middle" fill="#333">
            Données en cours de chargement.
          </text>
        )}
        {userScoreData && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            {/* <text
                x={105}
                y={110}
                fill="black"
                stroke="black"
                fontSize="24"
                fontWeight={500}
              >
                {userScoreData[0].value}%
              </text>
              <text x={100} y={130} fill="grey">
                de votre
              </text>
              <text x={100} y={150} fill="grey">
                objectif
              </text> */}
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "black" }}
            >
              {userScoreData[0].value}%
            </div>
            <div style={{ fontSize: "14px", color: "grey" }}>de votre</div>
            <div style={{ fontSize: "14px", color: "grey" }}>objectif</div>
          </div>
        )}
      </>
    </div>
  );
}

export default ScoreRadial;
