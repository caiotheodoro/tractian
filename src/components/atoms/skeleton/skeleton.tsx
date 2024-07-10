import React from "react";

export default function Skeleton() {
  return (
    <svg
      role="img"
      width="340"
      height="640"
      aria-labelledby="loading-aria"
      viewBox="0 0 340 640"
      preserveAspectRatio="none"
      style={{
        margin: "auto",
        display: "block",
        width: "340px",
      }}
    >
      <title id="loading-aria">Loading...</title>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        clip-path="url(#clip-path)"
        style={{ fill: "url(#fill)" }}
      ></rect>
      <defs>
        <clipPath id="clip-path">
          <rect x="0" y="0" rx="6" ry="6" width="340" height="40" />
          <rect x="0" y="50" rx="3" ry="3" width="340" height="40" />
          <rect x="0" y="100" rx="3" ry="3" width="340" height="40" />
          <rect x="0" y="150" rx="3" ry="3" width="340" height="40" />
          <rect x="0" y="200" rx="3" ry="3" width="340" height="40" />
          <rect x="0" y="250" rx="3" ry="3" width="340" height="40" />
          <rect x="0" y="300" rx="3" ry="3" width="340" height="40" />
          <rect x="0" y="350" rx="3" ry="3" width="340" height="40" />
          <rect x="0" y="400" rx="3" ry="3" width="340" height="40" />
          <rect x="0" y="450" rx="3" ry="3" width="340" height="40" />
          <rect x="0" y="500" rx="3" ry="3" width="340" height="40" />
          <rect x="0" y="550" rx="3" ry="3" width="340" height="40" />
          <rect x="0" y="600" rx="3" ry="3" width="340" height="40" />
          <rect x="0" y="650" rx="3" ry="3" width="340" height="40" />
        </clipPath>
        <linearGradient id="fill">
          <stop offset="0.599964" stop-color="#f3f3f3" stop-opacity="1">
            <animate
              attributeName="offset"
              values="-2; -2; 1"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset="1.59996" stop-color="#ecebeb" stop-opacity="1">
            <animate
              attributeName="offset"
              values="-1; -1; 2"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset="2.59996" stop-color="#f3f3f3" stop-opacity="1">
            <animate
              attributeName="offset"
              values="0; 0; 3"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
}
