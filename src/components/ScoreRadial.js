import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

function ScoreRadial({ userData }) {
  // const { id } = useParams();
  // const userId = parseInt(id);

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
    <div className="radial-chart">
      <>
        {userScoreData ? (
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              width={300}
              height={300}
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
              {/* White inner circle to mask the inside of the red circle
              <RadialBar
                minAngle={5}
                fill="white"
                clockWise
                data={[{ value: userScoreData[0].value }]}
                innerRadius="0%"
                outerRadius="120%"
              /> */}
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
              >
                {userScoreData[0].value}%
              </text>
              <text x={100} y={130} fill="grey">
                de votre
              </text>
              <text x={100} y={150} fill="grey">
                objectif
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        ) : (
          <text x={250} y={250} textAnchor="middle" fill="#333">
            Données en cours de chargement.
          </text>
        )}
      </>
    </div>
  );
}

export default ScoreRadial;
