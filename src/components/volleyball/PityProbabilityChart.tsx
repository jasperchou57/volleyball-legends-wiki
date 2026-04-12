interface PityCurve {
  label: string;
  color: string;
  rate: number;
  pity: number;
}

interface PityProbabilityChartProps {
  curves: PityCurve[];
  maxSpins?: number;
  height?: number;
}

function cumulativeProbability(spins: number, rate: number, pity: number): number {
  if (spins >= pity) return 1;
  return 1 - Math.pow(1 - rate, spins);
}

export function PityProbabilityChart({
  curves,
  maxSpins = 200,
  height = 260,
}: PityProbabilityChartProps) {
  const width = 520;
  const padL = 48;
  const padR = 16;
  const padT = 16;
  const padB = 36;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;

  const xFor = (spin: number) => padL + (spin / maxSpins) * plotW;
  const yFor = (p: number) => padT + plotH - p * plotH;

  const buildPath = (curve: PityCurve) => {
    const pts: string[] = [];
    const stepSize = Math.max(1, Math.floor(maxSpins / 80));
    for (let s = 0; s <= maxSpins; s += stepSize) {
      const p = cumulativeProbability(s, curve.rate, curve.pity);
      pts.push(`${pts.length === 0 ? "M" : "L"}${xFor(s).toFixed(2)},${yFor(p).toFixed(2)}`);
    }
    return pts.join(" ");
  };

  const gridY = [0, 0.25, 0.5, 0.75, 1];
  const gridX = [0, 0.25, 0.5, 0.75, 1];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      {gridY.map((g) => (
        <g key={`gy-${g}`}>
          <line
            x1={padL}
            x2={padL + plotW}
            y1={yFor(g)}
            y2={yFor(g)}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={1}
          />
          <text
            x={padL - 8}
            y={yFor(g)}
            textAnchor="end"
            dominantBaseline="middle"
            fill="rgba(255,255,255,0.55)"
            fontSize={10}
          >
            {Math.round(g * 100)}%
          </text>
        </g>
      ))}

      {gridX.map((g) => {
        const spin = Math.round(maxSpins * g);
        return (
          <g key={`gx-${g}`}>
            <line
              x1={xFor(spin)}
              x2={xFor(spin)}
              y1={padT}
              y2={padT + plotH}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth={1}
            />
            <text
              x={xFor(spin)}
              y={padT + plotH + 16}
              textAnchor="middle"
              fill="rgba(255,255,255,0.55)"
              fontSize={10}
            >
              {spin}
            </text>
          </g>
        );
      })}

      <text
        x={padL + plotW / 2}
        y={height - 6}
        textAnchor="middle"
        fill="rgba(255,255,255,0.55)"
        fontSize={10}
      >
        Lucky spins used
      </text>

      {curves.map((curve) => (
        <g key={curve.label}>
          <path d={buildPath(curve)} fill="none" stroke={curve.color} strokeWidth={2} />
          <line
            x1={xFor(curve.pity)}
            x2={xFor(curve.pity)}
            y1={padT}
            y2={padT + plotH}
            stroke={curve.color}
            strokeDasharray="4 4"
            strokeWidth={1}
            opacity={0.6}
          />
        </g>
      ))}

      <g transform={`translate(${padL + 12}, ${padT + 12})`}>
        {curves.map((curve, i) => (
          <g key={`legend-${curve.label}`} transform={`translate(0, ${i * 16})`}>
            <rect width={10} height={10} fill={curve.color} rx={2} />
            <text x={16} y={9} fill="rgba(255,255,255,0.85)" fontSize={11} fontWeight={600}>
              {curve.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
