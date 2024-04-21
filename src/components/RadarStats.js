import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

function RadarStats({dataPerf, valueY, userId, valueX}) {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataPerf}>
        <PolarGrid />
        <PolarAngleAxis dataKey={valueY} />
        <PolarRadiusAxis />
        <Radar
          name={userId}
          dataKey={valueX}
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export default RadarStats;
