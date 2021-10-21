import Head from "next/head";
import React from "react";

export default function Logo() {
  const a = React.useState(90);
  const b = React.useState(70);
  const c = React.useState(60);
  const d = React.useState(60);
  const color = React.useState("#3c392a");
  const stroke = React.useState(8);
  return (
    <div
      style={{
        height: 200,
        width: 200,
        position: "relative",
        margin: "40px auto",
      }}
    >
      <Head>
        <title>Code Hike Logo</title>
        {/* <link rel="icon" href="data:image/svg+xml;utf8,<svg...>...</svg>" /> */}
      </Head>
      <style jsx global>
        {`
          body {
            background: #aaa;
          }
        `}
      </style>
      <LogoPath
        a={a[0]}
        b={b[0]}
        c={c[0]}
        d={d[0]}
        color={color[0]}
        s={stroke[0]}
      />
      <input
        type="color"
        style={{
          position: "absolute",
          bottom: -50,
          left: "50%",
          transform: "translate(-50%)",
        }}
        value={color[0]}
        onChange={(e) => color[1](e.currentTarget.value)}
      />
      <Range
        state={a}
        style={{
          position: "absolute",
          transform: "rotate(-90deg)",
          top: 0,
          right: 0,
          transformOrigin: "top right",
          width: "50%",
        }}
      />
      <Range
        state={b}
        style={{
          position: "absolute",
          width: "50%",
          right: 0,
          bottom: 0,
          transform: "translatey(16px)",
        }}
      />
      <Range
        state={c}
        style={{
          position: "absolute",
          transform: "rotate(-90deg) translatey(-16px)",
          top: 0,
          left: "-50%",
          transformOrigin: "top right",
          width: "50%",
        }}
      />
      <Range
        state={d}
        style={{
          position: "absolute",
          width: "50%",
          left: 0,
          bottom: 0,
          transform: "translatey(16px) rotate(180deg)",
        }}
      />

      <Range
        state={stroke}
        max={40}
        style={{
          position: "absolute",
          top: -16,
          left: "50%",
          transform: "translate(-50%)",
        }}
      />
    </div>
  );
}

function Range({ state, style, max = 100 }) {
  const [value, setter] = state;
  return (
    <input
      style={style}
      type="range"
      value={value}
      onChange={(e) => setter(+e.currentTarget.value)}
      min={1}
      max={max}
    />
  );
}

function LogoPath({ a, b, c, d, color, s }) {
  const k = d - (c * b) / a;
  const r = (b - k) / 2;
  const y = a / 2 - (k * a) / (2 * b);
  const bordery = ((100 - d) * c) / (d - k) - c;
  const beta = Math.atan2(r, y);
  const h = Math.sqrt(r * r + y * y) + s / Math.sin(2 * beta);
  const xx = h * Math.sin(beta) + k;
  const yy = h * Math.cos(beta);
  const xxx = xx + (r * yy) / y;

  const hh = 20;

  return (
    <svg viewBox="-105 -105 210 210" style={{ position: "absolute", top: 0 }}>
      <style jsx>{`
        g {
          // paint-order: stroke;
          stroke-linecap: round;
          fill: ${color};
          // fill: none;
          // stroke: ${color};
        }
      `}</style>
      <defs>
        <clipPath id="frame">
          <circle cx="0" cy="0" r="100" fill="none" />
        </clipPath>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F9D43D" />
          <stop offset="100%" stopColor="#F54D71" />
        </linearGradient>
        <linearGradient id="blueg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00BCFB" />
          <stop offset="100%" stopColor="#70EAF9" />
        </linearGradient>
      </defs>

      <circle
        cx="0"
        cy="0"
        r="100"
        stroke="url(#gradient)"
        strokeWidth="8"
        fill="#444"
      />
      <path
        clipPath="url(#frame)"
        fill={color}
        d={D(
          M(-100, 100),
          L(-100, bordery),
          L(-d, -c),
          L(-xx, -yy),
          L(-xxx, 0),
          L(-xx, yy),
          L(-k - r, y),
          L(-b, 0),
          L(0, -a),
          L(b, 0),
          L(k + r, y),
          L(xx, yy),
          L(xxx, 0),
          L(xx, -yy),
          L(d, -c),
          L(100, bordery),
          L(100, 100),
          "Z"
        )}
      />
      <path
        clipPath="url(#frame)"
        fill="url(#gradient)"
        d={D(
          M(-100, bordery),
          L(-d, -c),
          L(-k - r, -y),
          L(0, -a),
          L(k + r, -y),
          L(d, -c),
          L(100, bordery),
          L(100, bordery - hh),
          L(d, -c - hh),
          L(k + r, -y - hh),
          L(0, -a - hh),
          L(-k - r, -y - hh),
          L(-d, -c - hh),
          L(-100, bordery - hh),

          "Z"
        )}
      />
      <path
        clipPath="url(#frame)"
        fill="url(#blueg)"
        d={D(
          M(-xx, -yy),
          L(-xxx, 0),
          L(-xx, yy),
          L(-k - r, y),
          L(-b, 0),
          L(-k - r, -y),
          "Z"
        )}
      />
      <path
        clipPath="url(#frame)"
        fill="url(#blueg)"
        d={D(
          M(xx, -yy),
          L(xxx, 0),
          L(xx, yy),
          L(k + r, y),
          L(b, 0),
          L(k + r, -y),
          "Z"
        )}
      />
    </svg>
  );
}

function M(x, y) {
  return `M ${x} ${y}`;
}

function L(x, y) {
  return `L ${x} ${y}`;
}

function C(from, middle, to, round = 0.2) {
  const power = 1 - round;
  const [fx, fy] = from;
  const [mx, my] = middle;
  const [tx, ty] = to;
  const fdx = (mx - fx) * power;
  const fdy = (my - fy) * power;
  const tdx = (mx - tx) * power;
  const tdy = (my - ty) * power;
  return `l ${fdx} ${fdy} C ${mx} ${my}, ${mx} ${my}, ${tx + tdx} ${
    ty + tdy
  } L ${tx} ${ty}`;
}

function D(...commands) {
  return commands.join(" ");
}

function path(...pairs) {
  return pairs.map(([x, y]) => x + "," + -y).join(" ");
}

function Draw({ a, b, c, d, color, stroke }) {
  const mountain = path(
    [0, a],
    [b + (b * 100) / a, -100],
    [-b - (b * 100) / a, -100]
  );

  const k = d - (c * b) / a;
  const y = a / 2 - (k * a) / (2 * b);

  return (
    <svg viewBox="-105 -105 210 210">
      <style jsx>{`
        g {
          // paint-order: stroke;
          stroke-linecap: round;
          // fill: ${color};
          fill: none;
          stroke: ${color};
        }
      `}</style>
      <defs>
        <clipPath id="frame">
          <circle cx="0" cy="0" r="100" fill="none" />
        </clipPath>
      </defs>
      <g clipPath="url(#frame)">
        <polygon
          points={mountain}
          // fill="none"
          stroke="#fafafa"
          // strokeWidth={stroke}
          strokeLinejoin="round"
          // transform={`translate(0,${(stroke - 7) / 2})`}
        />
        <polygon
          points={mountain}
          // fill="none"
          transform={`translate(${d}, ${a - c})`}
        />
        <polygon
          points={mountain}
          // fill="none"
          transform={`translate(${-d}, ${a - c})`}
        />
        {/* <circle
          cx="0"
          cy="0"
          r="100"
          fill="none"
          strokeWidth="5"
          stroke="#233"
        /> */}
        <line x1="-100" x2="100" y1="0" y2="0" strokeWidth="1" stroke="#2338" />
        <polyline
          points={path([(k + b) / 2, y], [b, 0], [(k + b) / 2, -y])}
          stroke="#fafafa"
          // fill="none"
          strokeWidth={stroke}
        />
        <polyline
          points={path([-(k + b) / 2, y], [-b, 0], [-(k + b) / 2, -y])}
          stroke="#fafafa"
          // fill="none"
          strokeWidth={stroke}
        />
      </g>
    </svg>
  );
}
