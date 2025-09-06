const pieceComponents = {
  // White pieces with black outlines and white fill
  K: (
    <svg viewBox="0 0 45 45" className="w-full h-full">
      <g
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 22.5,11.63 L 22.5,6" strokeLinejoin="miter" />
        <path
          d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
        <path d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 5.5,19.5 C 2.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z" />
        <path d="M 20,8 L 25,8" strokeLinejoin="miter" />
        <path
          d="M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.51,26.6 L 22.5,24.5 C 20,18 9.906,14 6.997,19.85 C 4.5,25.5 11.85,28.85 11.85,28.85"
          fill="none"
        />
        <path
          d="M 11.5,30 C 17,27 27,27 32.5,30 M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5 M 11.5,37 C 17,34 27,34 32.5,37"
          fill="none"
        />
      </g>
    </svg>
  ),
  Q: (
    <svg viewBox="0 0 45 45" className="w-full h-full">
      <g
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g stroke="none">
          <circle cx="6" cy="12" r="2.75" />
          <circle cx="14" cy="9" r="2.75" />
          <circle cx="22.5" cy="8" r="2.75" />
          <circle cx="31" cy="9" r="2.75" />
          <circle cx="39" cy="12" r="2.75" />
        </g>
        <path
          d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"
          strokeLinecap="butt"
        />
        <path
          d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"
          strokeLinecap="butt"
        />
        <path
          d="M 11,38.5 A 35,35 1 0 0 34,38.5"
          fill="none"
          strokeLinecap="butt"
        />
        <path d="M 11,29 A 35,35 1 0 1 34,29" fill="none" />
        <path d="M 12.5,31.5 L 32.5,31.5" fill="none" />
        <path d="M 11.5,34.5 A 35,35 1 0 0 33.5,34.5" fill="none" />
        <path d="M 10.5,37.5 A 35,35 1 0 0 34.5,37.5" fill="none" />
      </g>
    </svg>
  ),
  R: (
    <svg viewBox="0 0 45 45" className="w-full h-full">
      <g
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z" />
        <path d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z" />
        <path d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z" />
        <path d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z" />
        <path d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z" />
        <path d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z" />
        <path d="M 12,35.5 L 33,35.5" fill="none" />
        <path d="M 13,31.5 L 32,31.5" fill="none" />
        <path d="M 14,29.5 L 31,29.5" fill="none" />
        <path d="M 14,16.5 L 31,16.5" fill="none" />
        <path d="M 11,14 L 34,14" fill="none" />
      </g>
    </svg>
  ),
  B: (
    <svg viewBox="0 0 45 45" className="w-full h-full">
      <g
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g strokeLinecap="butt">
          <path d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z" />
          <path d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" />
          <path d="M 25,8 A 2.5,2.5 0 1 1 20,8 A 2.5,2.5 0 1 1 25,8 z" />
        </g>
        <path
          d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"
          fill="none"
          strokeLinejoin="miter"
        />
      </g>
    </svg>
  ),
  N: (
    <svg viewBox="0 0 45 45" className="w-full h-full">
      <g
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18" />
        <path d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10" />
        <path d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5,0.5 0 1 1 9.5 25.5 z" />
        <path
          d="M 15 15.5 A 0.5 1.5 0 1 1 14,15.5 A 0.5,1.5 0 1 1 15 15.5 z"
          transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"
        />
      </g>
    </svg>
  ),
  P: (
    <svg viewBox="0 0 45 45" className="w-full h-full">
      <g
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 22.5,9 C 19.5,9 17,11.5 17,14.5 C 17,17.5 19.5,20 22.5,20 C 25.5,20 28,17.5 28,14.5 C 28,11.5 25.5,9 22.5,9 z" />
        <path d="M 22.5,20 C 18.5,20 15.5,23 15.5,25.5 C 15.5,25.5 15.5,25.5 15.5,25.5 C 17.5,25.5 18.5,24.5 22.5,24.5 C 26.5,24.5 27.5,25.5 29.5,25.5 C 29.5,25.5 29.5,25.5 29.5,25.5 C 29.5,23 26.5,20 22.5,20 z" />
        <path d="M 15.5,30.5 C 15.5,30.5 18,29 22.5,29 C 27,29 29.5,30.5 29.5,30.5 C 29.5,28.5 27.5,25.5 22.5,25.5 C 17.5,25.5 15.5,28.5 15.5,30.5 z" />
        <path d="M 15.5,32 C 15.5,32 19.5,34 22.5,34 C 25.5,34 29.5,32 29.5,32 L 29.5,30.5 C 29.5,30.5 27,29 22.5,29 C 18,29 15.5,30.5 15.5,30.5 L 15.5,32 z" />
        <path d="M 15.5,32 L 29.5,32 L 29.5,35 L 15.5,35 L 15.5,32 z" />
      </g>
    </svg>
  ),

  // Black pieces with dark gray fill and black outline
  k: (
    <svg viewBox="0 0 45 45" className="w-full h-full">
      <g
        fill="#555555"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 22.5,11.63 L 22.5,6" strokeLinejoin="miter" />
        <path
          d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
        <path d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 5.5,19.5 C 2.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z" />
        <path d="M 20,8 L 25,8" strokeLinejoin="miter" />
        <path
          d="M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.51,26.6 L 22.5,24.5 C 20,18 9.906,14 6.997,19.85 C 4.5,25.5 11.85,28.85 11.85,28.85"
          fill="none"
        />
        <path
          d="M 11.5,30 C 17,27 27,27 32.5,30 M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5 M 11.5,37 C 17,34 27,34 32.5,37"
          fill="none"
        />
      </g>
    </svg>
  ),
  q: (
    <svg viewBox="0 0 45 45" className="w-full h-full">
      <g
        fill="#555555"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g stroke="none">
          <circle cx="6" cy="12" r="2.75" />
          <circle cx="14" cy="9" r="2.75" />
          <circle cx="22.5" cy="8" r="2.75" />
          <circle cx="31" cy="9" r="2.75" />
          <circle cx="39" cy="12" r="2.75" />
        </g>
        <path
          d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"
          strokeLinecap="butt"
        />
        <path
          d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"
          strokeLinecap="butt"
        />
        <path
          d="M 11,38.5 A 35,35 1 0 0 34,38.5"
          fill="none"
          strokeLinecap="butt"
        />
        <path d="M 11,29 A 35,35 1 0 1 34,29" fill="none" />
        <path d="M 12.5,31.5 L 32.5,31.5" fill="none" />
        <path d="M 11.5,34.5 A 35,35 1 0 0 33.5,34.5" fill="none" />
        <path d="M 10.5,37.5 A 35,35 1 0 0 34.5,37.5" fill="none" />
      </g>
    </svg>
  ),
  r: (
    <svg viewBox="0 0 45 45" className="w-full h-full">
      <g
        fill="#555555"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z" strokeLinecap="butt" />
        <path
          d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
        <path d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z" />
        <path d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z" />
        <path
          d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
        <path
          d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
        <path d="M 12,35.5 L 33,35.5" fill="none" />
        <path d="M 13,31.5 L 32,31.5" fill="none" />
        <path d="M 14,29.5 L 31,29.5" fill="none" />
        <path d="M 14,16.5 L 31,16.5" fill="none" />
        <path d="M 11,14 L 34,14" fill="none" />
      </g>
    </svg>
  ),
  b: (
    <svg viewBox="0 0 45 45" className="w-full h-full">
      <g
        fill="#555555"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g strokeLinecap="butt">
          <path d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z" />
          <path d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" />
          <path d="M 25,8 A 2.5,2.5 0 1 1 20,8 A 2.5,2.5 0 1 1 25,8 z" />
        </g>
        <path
          d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"
          fill="none"
          strokeLinejoin="miter"
        />
      </g>
    </svg>
  ),
  n: (
    <svg viewBox="0 0 45 45" className="w-full h-full">
      <g
        fill="#555555"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18" />
        <path d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10" />
        <path
          d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5,0.5 0 1 1 9.5 25.5 z"
          fill="#ffffff"
        />
        <path
          d="M 15 15.5 A 0.5 1.5 0 1 1 14,15.5 A 0.5,1.5 0 1 1 15 15.5 z"
          transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"
          fill="#ffffff"
        />
      </g>
    </svg>
  ),
  p: (
    <svg viewBox="0 0 45 45" className="w-full h-full">
      <g
        fill="#555555"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 22.5,9 C 19.5,9 17,11.5 17,14.5 C 17,17.5 19.5,20 22.5,20 C 25.5,20 28,17.5 28,14.5 C 28,11.5 25.5,9 22.5,9 z" />
        <path d="M 22.5,20 C 18.5,20 15.5,23 15.5,25.5 C 15.5,25.5 15.5,25.5 15.5,25.5 C 17.5,25.5 18.5,24.5 22.5,24.5 C 26.5,24.5 27.5,25.5 29.5,25.5 C 29.5,25.5 29.5,25.5 29.5,25.5 C 29.5,23 26.5,20 22.5,20 z" />
        <path d="M 15.5,30.5 C 15.5,30.5 18,29 22.5,29 C 27,29 29.5,30.5 29.5,30.5 C 29.5,28.5 27.5,25.5 22.5,25.5 C 17.5,25.5 15.5,28.5 15.5,30.5 z" />
        <path d="M 15.5,32 C 15.5,32 19.5,34 22.5,34 C 25.5,34 29.5,32 29.5,32 L 29.5,30.5 C 29.5,30.5 27,29 22.5,29 C 18,29 15.5,30.5 15.5,30.5 L 15.5,32 z" />
        <path d="M 15.5,32 L 29.5,32 L 29.5,35 L 15.5,35 L 15.5,32 z" />
      </g>
    </svg>
  ),
};

export default pieceComponents;
