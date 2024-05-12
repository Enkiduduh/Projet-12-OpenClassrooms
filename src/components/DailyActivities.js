import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { UserDailyActivity } from "./Modelisation";

function DailyActivities({ UserData }) {
  const { id } = useParams();
  const selectedUserId = parseInt(id);

  const [minWeight, setMinWeight] = useState(null);
  const [maxWeight, setMaxWeight] = useState(100);
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    if (UserData) {
      const userData = UserData.user_activity.find(
        (user) => user.userId === selectedUserId
      );
      const { formattedData, minWeight, maxWeight } = new UserDailyActivity(
        userData.sessions
      ).getFormattedData();

      setFormattedData(formattedData);
      setMinWeight(minWeight);
      setMaxWeight(maxWeight);
    }
  }, [UserData, selectedUserId]);


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

  const formatXAxis = (value, index) => index + 1;

  CustomToolTip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  };

  return (
    <div className="activity-daily">
      {formattedData.length > 0  && (
        <ResponsiveContainer width={800} height={180}>
          <BarChart
            // width={800}
            // height={180}
            data={
              UserData.user_activity.find(
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
            <Legend width={300} wrapperStyle={{ top: -40, right: 30 }} />
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
  );
}

export default DailyActivities;
