import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ScoreRadial({ UserData }) {
  const { id } = useParams();
  const userId = parseInt(id);

  const [userScoreData, setUserScoreData] = useState(null);

  useEffect(() => {
    if (UserData) {
      const data =
        UserData.user_main_data.find((user) => user.id === userId)
          ?.todayScore ||
        UserData.user_main_data.find((user) => user.id === userId)?.score;
      setUserScoreData(data);
    }
  }, [UserData, userId]);

  return (
    <div className="radial-chart">
      <>
        {userScoreData && (
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              width={500}
              height={300}
              cx={125}
              cy={125}
              innerRadius={90}
              outerRadius={80}
              barSize={15}
              data={[{ score: userScoreData }]}
              fill="white"
            >
              <RadialBar
                minAngle={15}
                fill="red"
                background
                clockWise
                dataKey="score"
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
                {userScoreData * 100}%
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
  );
}

export default ScoreRadial;
