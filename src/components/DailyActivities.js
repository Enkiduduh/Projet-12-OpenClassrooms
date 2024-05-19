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

function DailyActivities({ userData }) {
  // const { id } = useParams();
  // const userId = parseInt(id);

  const [userActivityData, setUserActivityData] = useState(null);
  const [minWeight, setMinWeight] = useState(null);
  const [maxWeight, setMaxWeight] = useState(100);
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    if (userData) {
      const data = userData.sessions || userData.user_activity?.sessions;
      console.log("Raw user data:", userData);
      console.log("Extracted sessions data:", data);
      setUserActivityData(data);
    }
  }, [userData]);

  useEffect(() => {
    if (userActivityData) {
      const { formattedData, minWeight, maxWeight } = new UserDailyActivity(
        userActivityData
      ).getFormattedData();
      console.log("Formatted data:", formattedData);
      setFormattedData(formattedData);
      setMinWeight(minWeight);
      setMaxWeight(maxWeight);
    }
  }, [userActivityData]);

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
      <h3>Activité quotidienne</h3>
      {formattedData.length ? (
        <ResponsiveContainer width={800} height={180}>
          <BarChart
            data={formattedData}
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
              strokeDasharray="3 3"
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
              cursor={{ fill: 'rgba(196, 196, 196, 0.5)' }}

            />
            <Legend width={300} wrapperStyle={{ top: -40, right: 30 }}  />
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

          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div style={{
          position: 'absolute',
          left: '0%',
          top: '0%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}>
        <text  textAnchor="middle" fill="#333">
          Données en cours de chargement.
        </text>
        </div>
      )}
    </div>
  );
}

export default DailyActivities;
