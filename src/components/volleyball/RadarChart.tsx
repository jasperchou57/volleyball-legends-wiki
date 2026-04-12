interface RadarAxis {
  label: string;
  value: number;
}

interface RadarChartProps {
  axes: RadarAxis[];
  max?: number;
  size?: number;
  strokeColor?: string;
  fillColor?: string;
}

export function RadarChart({
  axes,
  max = 10,
  size = 260,
  strokeColor = "#F97316",
  fillColor = "rgba(249, 115, 22, 0.25)",
}: RadarChartProps) {
  const center = size / 2;
  const radius = size / 2 - 36;
  const step = (Math.PI * 2) / axes.length;

  const point = (i: number, v: number) => {
    const angle = -Math.PI / 2 + step * i;
    const r = (v / max) * radius;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
  };

  const ringLevels = [0.25, 0.5, 0.75, 1];

  const dataPoints = axes.map((axis, i) => point(i, axis.value));
  const dataPath =
    dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[260px]">
      {ringLevels.map((level) => (
        <polygon
          key={level}
          points={axes
            .map((_, i) => {
              const p = point(i, max * level);
              return `${p.x},${p.y}`;
            })
            .join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={1}
        />
      ))}

      {axes.map((_, i) => {
        const end = point(i, max);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={end.x}
            y2={end.y}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={1}
          />
        );
      })}

      <path d={dataPath} fill={fillColor} stroke={strokeColor} strokeWidth={2} />

      {dataPoints.map((p, i) => (
        <circle key={`p-${i}`} cx={p.x} cy={p.y} r={3} fill={strokeColor} />
      ))}

      {axes.map((axis, i) => {
        const angle = -Math.PI / 2 + step * i;
        const labelR = radius + 18;
        const x = center + labelR * Math.cos(angle);
        const y = center + labelR * Math.sin(angle);
        return (
          <text
            key={`label-${i}`}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(255,255,255,0.7)"
            fontSize={11}
            fontWeight={600}
          >
            {axis.label}
          </text>
        );
      })}
    </svg>
  );
}
