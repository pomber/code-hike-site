import React from "react";

export default function Page() {
  const [config, setConfig] = React.useState({
    y0: -60,
    x1: 57,
    y1: 27,
    y3: 70,
    c: "#2563eb",
    s: 30,
  });

  return (
    <div>
      <Editor config={config} setConfig={setConfig} />
      <ShowLogo config={config} />
      <ShowLogo config={config} circle />
      <ShowLogo config={config} dark />
      <ShowLogo config={config} favicon />
      <ShowLogo config={config} favicon dark />
      <ShowTitle config={config} />
      <ShowLogo config={config} paths />
      <ShowLogo config={config} paths circle />
      <ShowLogo config={config} paths dark />
      <ShowLogo config={config} paths favicon />
      <ShowLogo config={config} paths favicon dark />
      <ShowTitle config={config} paths />
    </div>
  );
}

function ShowLogo({ config, circle, dark, favicon, ...rest }) {
  const points = getPoints(config);

  const border = "#222";
  const bg = dark ? "#222" : "#fafafa";
  return (
    <div
      style={{
        width: favicon ? 16 : 160,
        height: favicon ? 16 : 160,
        border: "1px solid black",
        background: circle ? border : bg,
        display: "inline-block",
      }}
    >
      <Logo points={points} color={config.c} circle={circle && bg} {...rest} />
    </div>
  );
}
function ShowTitle({ config, ...rest }) {
  const points = getPoints(config);

  return (
    <div className="text-3xl m-4 flex align-center gap-2">
      <div
        style={{
          width: "1.2em",
          height: "1.2em",
          display: "inline-block",
        }}
      >
        <Logo points={points} color={config.c} {...rest} />
      </div>
      <h1 className="text-3xl font-bold inline-block">Code Hike</h1>
    </div>
  );
}
function Editor({ config, setConfig }) {
  return (
    <div style={{ margin: 10 }}>
      <input
        type="color"
        value={config["c"]}
        onChange={(e) => setConfig({ ...config, c: e.currentTarget.value })}
      />
      <Range {...{ config, setConfig, v: "y0", min: -100 }} />
      <Range {...{ config, setConfig, v: "x1" }} />
      <Range {...{ config, setConfig, v: "y1" }} />
      <Range {...{ config, setConfig, v: "y3" }} />
      <Range {...{ config, setConfig, v: "s", max: 50 }} />
    </div>
  );
}

function Range({ config, setConfig, v, style, min = 1, max = 100 }) {
  function setter(newValue) {
    setConfig({ ...config, [v]: newValue });
  }
  return (
    <label style={{ display: "block" }}>
      {v}
      <input
        style={style}
        type="range"
        value={config[v]}
        onChange={(e) => setter(+e.currentTarget.value)}
        min={min}
        max={max}
      />
      {config[v]}
    </label>
  );
}

function Logo({ points, color, circle, axis, paths }) {
  const { x0, y0, x1, y1, x2, y2, x3, y3, s } = points;
  return (
    <svg viewBox="-105 -105 210 210">
      <defs>
        <clipPath id="frame">
          <circle cx="0" cy="0" r="100" />
        </clipPath>
      </defs>
      <g clipPath={circle && "url(#frame)"}>
        {circle && <circle cx="0" cy="0" r="100" fill={circle} />}

        {paths ? (
          <Paths points={points} color={color} />
        ) : (
          <polyline
            points={`${x0} ${y0}, ${x1} ${y1}, ${x2} ${y2}, ${x3} ${y3}, ${-x2} ${y2}, ${-x1} ${y1},${-x0} ${y0}`}
            fill="none"
            stroke={color}
            strokeWidth={s}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}
        {axis && (
          <>
            <circle cx={x0} cy={y0} r="2" fill="red" />
            <circle cx={x1} cy={y1} r="2" fill="red" />
            <circle cx={x2} cy={y2} r="2" fill="green" />
            <circle cx={x3} cy={y3} r="2" fill="red" />
            <circle cx={points.r0} cy={0} r="2" fill="orange" />
            <circle cx={points.r1} cy={0} r="2" fill="orange" />
          </>
        )}
      </g>
    </svg>
  );
}

function Paths({ points, color }) {
  const { x0, y0, x1, y1, x2, y2, x3, y3, s } = points;
  return (
    <>
      <Polygon d={[x0, y0, x1, y1]} s={s} color={color} />
      <Polygon d={[x2, y2, x1, y1]} s={s} color={color} />
      <Polygon d={[x2, y2, x3, y3]} s={s} color={color} />
      <Polygon d={[-x2, y2, x3, y3]} s={s} color={color} />
      <Polygon d={[-x2, y2, -x1, y1]} s={s} color={color} />
      <Polygon d={[-x0, y0, -x1, y1]} s={s} color={color} />
    </>
  );
}

function Polygon({ d, s, color }) {
  const [x0, y0, x1, y1] = d;
  return (
    <path
      fill={color}
      d={`M ${x0 - s / 2} ${y0} L ${x1 - s / 2} ${y1} L ${x1 + s / 2} ${y1} L ${
        x0 + s / 2
      } ${y0} Z`}
    />
  );
}

function getPoints({ y0, x1, y1, y3, s }) {
  const x0 = 100 - s / 2;
  const x3 = 0;
  const p = (x0 - x1) / (y1 - y0);
  const r0 = x1 - p * y1;
  const r1 = p * y3;
  const x2 = (r0 + r1) / 2;
  const y2 = (x2 - r0) / p;
  return { x0, y0: -y0, x1, y1: -y1, x2, y2: -y2, x3, y3: -y3, s, r0, r1 };
}
