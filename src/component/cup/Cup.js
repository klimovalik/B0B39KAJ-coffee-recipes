import './Cup.css';
import React from "react";

// function Cup() {
//   return (
//       <div className="cupContainer">
//         <div className="cup">
//           <span className="steam"></span>
//           <span className="steam"></span>
//           <span className="steam"></span>
//           <div className="cup-handle"></div>
//         </div>
//       </div>
//   );
// }

function Cup(props) {
  const cupFor = props.cupFor;

  // "#86563a" coffee
  // "#faebd7" milk
  // "#fdf5e6" milk foam
  // "#fffaf0" wh.cream

  let coffeeColors = [];
  cupFor.colors.forEach((color) => {
    coffeeColors.push(<stop offset={color.offset} stopColor={color.stopColor} stopOpacity="100%"/>)
  });

  return (
      <div className="cupContainer">
        <svg viewBox="0 0 200 200">
          <defs>
            <mask id="coffee-mask">
              <rect className="mask-rect"
                    x="50" y="0"
                    width="110" height="110"
                    transform="rotate(-180 100 100)"
                    fill="#ffffff"/>
            </mask>
            <linearGradient id="solids" x1="0%" y1="0%" x2="0%" y2="100%">
              {coffeeColors}
            </linearGradient>
          </defs>

          <path d="M 55 75 l 10 100 a 6,6 0 0 0 6,6 h 48 a 6,6 0 0 0 6,-6 l 10 -100"
                mask="url(#coffee-mask)"
                fill="url(#solids)"
                id="coffee"
          />

          <path d="M 50 70 l 10 110 a 7,7 0 0 0 7,7 h 56 a 7,7 0 0 0 7,-7 l 10 -110"
                fill="transparent"
                stroke="black"
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
                id="cup"
          />

          <rect x="43" y="50" rx="7" ry="7" width="104" height="20"
                fill="transparent"
                stroke="black"
                strokeWidth="3"
          />

          <path d="M 54 50 l 7 -15 a 7,7 0 0 1 6,-4 h 56 a 7,7 0 0 1 6,4 l 7 15"
                fill="transparent"
                stroke="black"
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
          />
        </svg>
      </div>
  );
}

function CupWindow(props) {
  const cupFor = props.cupFor;

  return (
      <div className="cupWindow">
        <h1>{cupFor.name}</h1>
        <Cup cupFor={cupFor} />
      </div>
  );
}

export default CupWindow;