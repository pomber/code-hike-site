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

  const hs = s / 2;

  return (
    <svg
      viewBox="-105 -105 210 210"
      style={{
        position: "absolute",
        top: 0,
        outline: "2px solid #633",
        background: "white",
      }}
    >
      <style jsx>{`
        g {
          // paint-order: stroke;
          stroke-linecap: round;
          fill: ${color};
          // fill: none;
          // stroke: ${color};
        }
        path {
          filter: drop-shadow(1px 0px 3px rgba(0, 0, 0, 0.8));
        }
      `}</style>
      <defs>
        <clipPath id="frame">
          {/* <circle cx="0" cy="0" r="100" fill="none" /> */}
          <path
            fill="#66AAD0"
            d={D(
              M(100 - hs, bordery),
              L(100 + hs, bordery),
              L(d + hs, -c),
              L(d - hs, -c),
              "Z"
            )}
          />
          <path
            fill="#00BCFB"
            d={D(
              M(d - hs, -c),
              L(d + hs, -c),
              L(k + r + hs, -y),
              L(k + r - hs, -y),
              "Z"
            )}
          />
          <path
            fill="#66AAD0"
            d={D(
              M(k + r + hs, -y),
              L(k + r - hs, -y),
              L(-hs, -a),
              L(hs, -a),
              "Z"
            )}
          />
          <path
            fill="#00BCFB"
            d={D(
              M(-k - r + hs, -y),
              L(-k - r - hs, -y),
              L(-hs, -a),
              L(hs, -a),
              "Z"
            )}
          />
          <path
            fill="#66AAD0"
            d={D(
              M(-d - hs, -c),
              L(-d + hs, -c),
              L(-k - r + hs, -y),
              L(-k - r - hs, -y),
              "Z"
            )}
          />
          <path
            fill="#00BCFB"
            d={D(
              M(-100 - hs, bordery),
              L(-100 + hs, bordery),
              L(-d + hs, -c),
              L(-d - hs, -c),
              "Z"
            )}
          />
        </clipPath>
      </defs>

      <circle
        cx="0"
        cy="0"
        r="100"
        // stroke="url(#gradient)"
        strokeWidth="8"
        fill="#fafafa"
      />
      <g clipPath="url(#frame)">
        <path
          fill="#66AAD0"
          d={D(
            M(100 - hs, bordery),
            L(100 + hs, bordery),
            L(d + hs, -c),
            L(d - hs, -c),
            "Z"
          )}
        />
        <path
          fill="#00BCFB"
          d={D(
            M(d - hs, -c),
            L(d + hs, -c),
            L(k + r + hs, -y),
            L(k + r - hs, -y),
            "Z"
          )}
        />
        <path
          fill="#66AAD0"
          d={D(
            M(k + r + hs, -y),
            L(k + r - hs, -y),
            L(-hs, -a),
            L(hs, -a),
            "Z"
          )}
        />
        <path
          fill="#00BCFB"
          d={D(
            M(-k - r + hs, -y),
            L(-k - r - hs, -y),
            L(-hs, -a),
            L(hs, -a),
            "Z"
          )}
        />
        <path
          fill="#66AAD0"
          d={D(
            M(-d - hs, -c),
            L(-d + hs, -c),
            L(-k - r + hs, -y),
            L(-k - r - hs, -y),
            "Z"
          )}
        />
        <path
          fill="#00BCFB"
          d={D(
            M(-100 - hs, bordery),
            L(-100 + hs, bordery),
            L(-d + hs, -c),
            L(-d - hs, -c),
            "Z"
          )}
        />
      </g>
    </svg>
  );
}

function M(x, y) {
  return `M ${x} ${y}`;
}

function L(x, y) {
  return `L ${x} ${y}`;
}

function D(...commands) {
  return commands.join(" ");
}
