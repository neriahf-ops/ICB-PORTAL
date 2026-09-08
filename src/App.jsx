import { useState } from "react";

const C = {
  bg: "#f2f0ed", surface: "#ffffff", surfaceAlt: "#ece9e4",
  border: "#ddd9d3", accent: "#b8976a", text: "#3d3d3d",
  muted: "#888888", success: "#4a7c59", danger: "#c0392b",
};

const GLOBAL_STYLE = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #f2f0ed; color: #3d3d3d; font-family: Georgia, serif; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #f2f0ed; }
  ::-webkit-scrollbar-thumb { background: #ddd9d3; border-radius: 2px; }
`;

// ── LINE BODY DIAGRAMS ──────────────────────────────────────────────────────
// Each returns an SVG showing a simplified body silhouette with the fascial
// line highlighted in its signature colour and labelled.

function LineBodySVG({ lineId }) {
  const cfg = {
    sfl: {
      color: "#4a90d9", label: "Superficial Front Line",
      path: "M170 88 Q168 130 165 175 Q162 220 160 290 Q158 320 160 355",
      desc: "Runs up the entire front"
    },
    sbl: {
      color: "#e05c5c", label: "Superficial Back Line",
      path: "M150 88 Q148 140 150 195 Q152 250 150 310 Q148 335 150 360",
      desc: "Runs up the entire back"
    },
    ll: {
      color: "#f5a623", label: "Lateral Line",
      leftPath: "M138 95 Q128 160 130 230 Q132 280 135 350",
      rightPath: "M182 95 Q192 160 190 230 Q188 280 185 350",
      dual: true, desc: "Runs down both sides"
    },
    spl: {
      color: "#7ed321", label: "Spiral Line",
      path: "M185 88 Q175 120 155 155 Q140 185 145 220 Q148 250 160 280 Q170 310 165 355",
      path2: "M135 88 Q145 120 165 155 Q180 185 175 220 Q172 250 160 280 Q150 310 155 355",
      spiral: true, desc: "Wraps around the body"
    },
    dfl: {
      color: "#e74c3c", label: "Deep Front Line",
      path: "M160 355 Q162 310 163 265 Q163 210 163 160 Q162 130 160 92",
      desc: "Deep inner core pathway"
    },
    fl: {
      color: "#1abc9c", label: "Functional Lines",
      path: "M130 120 Q148 170 160 210 Q172 250 182 300",
      path2: "M190 120 Q172 170 160 210 Q148 250 138 300",
      spiral: true, desc: "Cross-body connections"
    },
    al: {
      color: "#9b59b6", label: "Arm Lines",
      leftArm: "M138 128 Q112 155 95 185 Q82 210 78 240",
      rightArm: "M182 128 Q208 155 225 185 Q238 210 242 240",
      arms: true, desc: "Through the arms and hands"
    }
  };

  const c = cfg[lineId];
  if (!c) return null;

  // Body silhouette points (side neutral posture)
  const HEAD_CX = 160, HEAD_CY = 52, HEAD_RX = 24, HEAD_RY = 29;
  const NECK_X = 152, NECK_Y = 79, NECK_W = 16, NECK_H = 14;
  // Torso as path
  const TORSO = "M136 93 Q126 105 124 140 Q122 180 126 220 Q128 255 130 290 L190 290 Q192 255 194 220 Q198 180 196 140 Q194 105 184 93 Z";
  // Pelvis
  const PELVIS = "M128 290 Q130 315 135 330 Q148 345 160 347 Q172 345 185 330 Q190 315 192 290 Z";
  // Left leg
  const LLEG = "M135 330 Q130 370 128 405 Q127 425 130 440 L150 440 Q152 425 152 405 Q153 370 152 330 Z";
  // Right leg
  const RLEG = "M168 330 Q168 370 167 405 Q166 425 169 440 L189 440 Q192 425 192 405 Q193 370 190 330 Z";
  // Arms
  const LARM = "M126 105 Q108 130 98 165 Q90 195 88 225 L102 228 Q104 200 112 172 Q120 140 138 115 Z";
  const RARM = "M194 105 Q212 130 222 165 Q230 195 232 225 L218 228 Q216 200 208 172 Q200 140 182 115 Z";

  const bodyFill = "#f5e8d5";
  const bodyStroke = "#c8a882";
  const sw = "1.2";

  return (
    <svg width="100%" viewBox="0 0 320 480" style={{display:"block",maxWidth:"220px",margin:"0 auto"}}>
      {/* Body silhouette */}
      <ellipse cx={HEAD_CX} cy={HEAD_CY} rx={HEAD_RX} ry={HEAD_RY} fill={bodyFill} stroke={bodyStroke} strokeWidth={sw}/>
      <rect x={NECK_X} y={NECK_Y} width={NECK_W} height={NECK_H} rx="4" fill={bodyFill} stroke={bodyStroke} strokeWidth={sw}/>
      <path d={TORSO} fill={bodyFill} stroke={bodyStroke} strokeWidth={sw}/>
      <path d={PELVIS} fill={bodyFill} stroke={bodyStroke} strokeWidth={sw}/>
      <path d={LLEG} fill={bodyFill} stroke={bodyStroke} strokeWidth={sw}/>
      <path d={RLEG} fill={bodyFill} stroke={bodyStroke} strokeWidth={sw}/>
      <path d={LARM} fill={bodyFill} stroke={bodyStroke} strokeWidth={sw}/>
      <path d={RARM} fill={bodyFill} stroke={bodyStroke} strokeWidth={sw}/>

      {/* Fascial line overlay */}
      {c.dual && <>
        <path d={c.leftPath} fill="none" stroke={c.color} strokeWidth="5" strokeLinecap="round" opacity="0.85"/>
        <path d={c.rightPath} fill="none" stroke={c.color} strokeWidth="5" strokeLinecap="round" opacity="0.85"/>
      </>}
      {c.spiral && <>
        <path d={c.path} fill="none" stroke={c.color} strokeWidth="4" strokeLinecap="round" opacity="0.85"/>
        <path d={c.path2} fill="none" stroke={c.color} strokeWidth="4" strokeLinecap="round" opacity="0.65" strokeDasharray="8 4"/>
      </>}
      {c.arms && <>
        <path d={c.leftArm} fill="none" stroke={c.color} strokeWidth="5" strokeLinecap="round" opacity="0.85"/>
        <path d={c.rightArm} fill="none" stroke={c.color} strokeWidth="5" strokeLinecap="round" opacity="0.85"/>
        <path d="M160 93 Q160 120 160 160 Q160 200 160 240" fill="none" stroke={c.color} strokeWidth="4" strokeLinecap="round" opacity="0.6"/>
      </>}
      {!c.dual && !c.spiral && !c.arms && c.path && (
        <path d={c.path} fill="none" stroke={c.color} strokeWidth="5" strokeLinecap="round" opacity="0.85"/>
      )}

      {/* Label */}
      <rect x="10" y="450" width="300" height="22" rx="3" fill={c.color} opacity="0.15"/>
      <text x="160" y="465" textAnchor="middle" fontSize="11" fontFamily="Georgia,serif" fill={c.color} fontWeight="bold">{c.label}</text>
    </svg>
  );
}


// ── POSTURE DYSFUNCTION DIAGRAMS ─────────────────────────────────────────────

function PostureDiagram({ type }) {
  const mkr = (id) => (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </marker>
    </defs>
  );

  const bodyFill = "#f5e8d5", bodyStroke = "#c8a882", bw = "1.2";

  if (type === "sfl_sbl") return (
    <svg width="100%" viewBox="0 0 320 460" style={{display:"block",maxWidth:"280px",margin:"0 auto"}}>
      {mkr("a1")}
      {/* plumb line */}
      <line x1="120" y1="10" x2="120" y2="450" stroke="#999" strokeWidth="0.5" strokeDasharray="5 4" opacity="0.5"/>
      <text x="120" y="8" textAnchor="middle" fontSize="9" fill="#999" fontFamily="Georgia,serif">plumb</text>
      {/* head forward */}
      <ellipse cx="185" cy="52" rx="26" ry="31" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      <rect x="174" y="81" width="14" height="14" rx="4" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      {/* spine exaggerated curve */}
      <path d="M168 95 Q155 145 158 195 Q153 248 158 308" fill="none" stroke="#8a6e4e" strokeWidth="2.5" strokeLinecap="round"/>
      {/* torso collapsed */}
      <path d="M144 95 Q132 118 130 155 Q128 195 130 235 Q132 262 135 290 L183 290 Q186 262 188 235 Q190 195 188 155 Q186 118 174 95 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      {/* pelvis anterior tilt */}
      <path d="M133 290 Q133 314 138 328 Q150 342 160 344 Q170 342 182 328 Q187 314 187 290 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      {/* legs - knee hyperextended */}
      <path d="M137 328 Q134 365 133 398 Q132 418 135 432 L153 432 Q155 418 155 398 Q156 365 155 328 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      <path d="M165 328 Q168 355 172 385 Q174 405 172 432 L190 432 Q190 405 188 385 Q186 355 185 328 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      {/* SFL line */}
      <path d="M185 83 Q180 130 175 175 Q170 228 168 290" fill="none" stroke="#4a90d9" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
      {/* SBL line */}
      <path d="M153 83 Q148 138 150 190 Q152 245 153 300" fill="none" stroke="#e05c5c" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
      {/* annotations */}
      <line x1="162" y1="52" x2="115" y2="50" stroke="#4a90d9" strokeWidth="1.2" markerEnd="url(#a1)"/>
      <text x="111" y="47" textAnchor="end" fontSize="10" fill="#4a90d9" fontFamily="Georgia,serif">Head forward</text>
      <line x1="130" y1="168" x2="85" y2="155" stroke="#4a90d9" strokeWidth="1.2" markerEnd="url(#a1)"/>
      <text x="81" y="152" textAnchor="end" fontSize="10" fill="#4a90d9" fontFamily="Georgia,serif">Chest collapsed</text>
      <line x1="133" y1="305" x2="88" y2="295" stroke="#4a90d9" strokeWidth="1.2" markerEnd="url(#a1)"/>
      <text x="84" y="292" textAnchor="end" fontSize="10" fill="#4a90d9" fontFamily="Georgia,serif">Pelvis forward</text>
      <line x1="172" y1="380" x2="210" y2="372" stroke="#e05c5c" strokeWidth="1.2" markerEnd="url(#a1)"/>
      <text x="214" y="376" fontSize="10" fill="#e05c5c" fontFamily="Georgia,serif">Knee locked</text>
      {/* legend */}
      <rect x="220" y="30" width="10" height="3" rx="1" fill="#4a90d9"/><text x="234" y="35" fontSize="9" fill="#4a90d9" fontFamily="Georgia,serif">SFL</text>
      <rect x="220" y="44" width="10" height="3" rx="1" fill="#e05c5c"/><text x="234" y="49" fontSize="9" fill="#e05c5c" fontFamily="Georgia,serif">SBL</text>
    </svg>
  );

  if (type === "ll_spl") return (
    <svg width="100%" viewBox="0 0 320 460" style={{display:"block",maxWidth:"280px",margin:"0 auto"}}>
      {mkr("a2")}
      <ellipse cx="168" cy="50" rx="24" ry="30" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw} transform="rotate(-4,168,50)"/>
      <rect x="157" y="78" width="14" height="14" rx="4" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      <path d="M142 92 Q132 115 130 152 Q128 192 130 230 Q132 260 134 288 L184 288 Q186 260 188 230 Q190 192 188 152 Q186 115 176 92 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      <path d="M132 288 Q132 312 137 326 Q149 340 160 342 Q171 340 183 326 Q188 312 188 288 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw} transform="rotate(3,160,315)"/>
      <path d="M136 326 Q132 364 131 396 Q130 416 133 430 L150 430 Q152 416 152 396 Q152 364 151 326 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      <path d="M169 326 Q170 364 170 396 Q170 416 172 430 L190 430 Q192 416 192 396 Q192 364 191 326 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      {/* right foot flare */}
      <path d="M172 430 L188 434 L198 440" stroke={bodyStroke} strokeWidth="7" strokeLinecap="round" fill="none"/>
      {/* LL line - right side underperforming */}
      <path d="M188 295 Q198 245 196 180 Q194 128 192 88" fill="none" stroke="#f5a623" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
      {/* SPL line */}
      <path d="M140 290 Q148 245 158 195 Q168 148 178 92" fill="none" stroke="#7ed321" strokeWidth="4" strokeLinecap="round" opacity="0.75" strokeDasharray="8 4"/>
      {/* annotations */}
      <line x1="132" y1="305" x2="90" y2="315" stroke="#f5a623" strokeWidth="1.2" markerEnd="url(#a2)"/>
      <text x="86" y="319" textAnchor="end" fontSize="10" fill="#f5a623" fontFamily="Georgia,serif">Hip drops (left)</text>
      <line x1="193" y1="437" x2="220" y2="444" stroke="#7ed321" strokeWidth="1.2" markerEnd="url(#a2)"/>
      <text x="224" y="448" fontSize="10" fill="#7ed321" fontFamily="Georgia,serif">Foot flare</text>
      <line x1="200" y1="128" x2="238" y2="115" stroke="#f5a623" strokeWidth="1.2" markerEnd="url(#a2)"/>
      <text x="242" y="119" fontSize="10" fill="#f5a623" fontFamily="Georgia,serif">Hip higher R</text>
      <rect x="10" y="30" width="10" height="3" rx="1" fill="#f5a623"/><text x="24" y="35" fontSize="9" fill="#f5a623" fontFamily="Georgia,serif">LL</text>
      <rect x="10" y="44" width="10" height="3" rx="1" fill="#7ed321"/><text x="24" y="49" fontSize="9" fill="#7ed321" fontFamily="Georgia,serif">SPL</text>
    </svg>
  );

  if (type === "sfl_al") return (
    <svg width="100%" viewBox="0 0 320 460" style={{display:"block",maxWidth:"280px",margin:"0 auto"}}>
      {mkr("a3")}
      <ellipse cx="185" cy="50" rx="24" ry="30" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      <rect x="174" y="78" width="14" height="14" rx="4" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      <path d="M144 92 Q132 115 130 152 Q128 192 130 232 Q132 262 135 290 L183 290 Q186 262 188 232 Q190 192 188 152 Q186 115 174 92 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      {/* shoulders rolled forward */}
      <path d="M130 108 Q105 135 96 168 Q90 196 90 224 L104 226 Q104 200 110 175 Q118 145 136 118 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      <path d="M188 108 Q213 135 222 168 Q228 196 228 224 L214 226 Q214 200 208 175 Q200 145 184 118 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      {/* palms face back indicator circles */}
      <circle cx="93" cy="228" r="8" fill="none" stroke="#9b59b6" strokeWidth="2"/>
      <circle cx="225" cy="228" r="8" fill="none" stroke="#9b59b6" strokeWidth="2"/>
      <path d="M135 290 Q134 314 138 326 Q150 340 160 342 Q170 340 182 326 Q186 314 185 290 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      <path d="M138 326 Q135 364 134 395 Q133 415 136 430 L153 430 Q154 415 154 395 Q154 364 153 326 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      <path d="M167 326 Q168 364 168 395 Q168 415 170 430 L188 430 Q190 415 190 395 Q190 364 189 326 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      {/* SFL */}
      <path d="M183 80 Q178 130 172 175 Q166 228 162 285" fill="none" stroke="#4a90d9" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
      {/* AL - arms */}
      <path d="M130 108 Q112 142 102 175 Q94 202 93 222" fill="none" stroke="#9b59b6" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
      <path d="M190 108 Q208 142 218 175 Q226 202 225 222" fill="none" stroke="#9b59b6" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
      <line x1="162" y1="50" x2="215" y2="36" stroke="#4a90d9" strokeWidth="1.2" markerEnd="url(#a3)"/>
      <text x="219" y="40" fontSize="10" fill="#4a90d9" fontFamily="Georgia,serif">Head forward</text>
      <line x1="130" y1="130" x2="80" y2="115" stroke="#9b59b6" strokeWidth="1.2" markerEnd="url(#a3)"/>
      <text x="76" y="111" textAnchor="end" fontSize="10" fill="#9b59b6" fontFamily="Georgia,serif">Shoulders rolled</text>
      <line x1="93" y1="238" x2="60" y2="245" stroke="#9b59b6" strokeWidth="1.2" markerEnd="url(#a3)"/>
      <text x="56" y="249" textAnchor="end" fontSize="10" fill="#9b59b6" fontFamily="Georgia,serif">Palm faces back</text>
      <rect x="220" y="30" width="10" height="3" rx="1" fill="#4a90d9"/><text x="234" y="35" fontSize="9" fill="#4a90d9" fontFamily="Georgia,serif">SFL</text>
      <rect x="220" y="44" width="10" height="3" rx="1" fill="#9b59b6"/><text x="234" y="49" fontSize="9" fill="#9b59b6" fontFamily="Georgia,serif">AL</text>
    </svg>
  );

  if (type === "dfl") return (
    <svg width="100%" viewBox="0 0 320 460" style={{display:"block",maxWidth:"280px",margin:"0 auto"}}>
      {mkr("a4")}
      <ellipse cx="185" cy="50" rx="24" ry="30" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      <rect x="174" y="78" width="14" height="14" rx="4" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      {/* hyperlordotic spine */}
      <path d="M168 92 Q182 130 186 168 Q184 210 170 245 Q162 278 165 310" fill="none" stroke="#8a6e4e" strokeWidth="2.5" strokeLinecap="round"/>
      {/* torso - belly forward */}
      <path d="M144 92 Q132 115 128 152 Q126 192 132 232 Q136 262 140 290 L180 290 Q184 262 190 232 Q196 192 196 152 Q194 115 176 92 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      {/* belly bulge */}
      <ellipse cx="170" cy="245" rx="28" ry="22" fill="#fae8d0" stroke={bodyStroke} strokeWidth="1" opacity="0.8"/>
      <path d="M138 290 Q138 312 142 326 Q153 340 163 342 Q173 340 185 326 Q190 312 188 290 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      <path d="M140 326 Q138 364 137 395 Q136 415 140 430 L156 430 Q158 415 158 395 Q158 364 157 326 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      <path d="M170 326 Q171 364 171 395 Q171 415 173 430 L191 430 Q193 415 192 395 Q192 364 191 326 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      {/* DFL deep inner line */}
      <path d="M163 315 Q164 265 164 215 Q163 165 162 118 Q162 102 164 90" fill="none" stroke="#e74c3c" strokeWidth="4" strokeLinecap="round" opacity="0.85" strokeDasharray="10 4"/>
      <line x1="196" y1="165" x2="240" y2="148" stroke="#e74c3c" strokeWidth="1.2" markerEnd="url(#a4)"/>
      <text x="244" y="152" fontSize="10" fill="#e74c3c" fontFamily="Georgia,serif">Hyperlordosis</text>
      <line x1="196" y1="244" x2="238" y2="236" stroke="#e74c3c" strokeWidth="1.2" markerEnd="url(#a4)"/>
      <text x="242" y="240" fontSize="10" fill="#e74c3c" fontFamily="Georgia,serif">Belly pushes out</text>
      <line x1="140" y1="305" x2="92" y2="295" stroke="#e74c3c" strokeWidth="1.2" markerEnd="url(#a4)"/>
      <text x="88" y="299" textAnchor="end" fontSize="10" fill="#e74c3c" fontFamily="Georgia,serif">Pelvis tips forward</text>
      <line x1="186" y1="50" x2="228" y2="36" stroke="#888" strokeWidth="1.2" markerEnd="url(#a4)"/>
      <text x="232" y="40" fontSize="10" fill="#888" fontFamily="Georgia,serif">Head forward</text>
      <rect x="10" y="30" width="10" height="3" rx="1" fill="#e74c3c"/><text x="24" y="35" fontSize="9" fill="#e74c3c" fontFamily="Georgia,serif">DFL</text>
    </svg>
  );

  if (type === "spl_fl") return (
    <svg width="100%" viewBox="0 0 320 460" style={{display:"block",maxWidth:"280px",margin:"0 auto"}}>
      {mkr("a5")}
      <ellipse cx="168" cy="50" rx="24" ry="30" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw} transform="rotate(7,168,50)"/>
      <rect x="157" y="78" width="14" height="14" rx="4" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      {/* torso rotated */}
      <path d="M138 92 Q126 115 126 152 Q126 192 128 232 Q130 262 134 290 L182 290 Q186 262 188 232 Q192 192 192 152 Q192 115 180 92 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw} transform="rotate(5,160,190)"/>
      {/* left shoulder driven forward */}
      <path d="M126 108 Q102 135 92 168 Q86 196 86 224 L100 226 Q100 200 106 175 Q114 145 132 118 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      <path d="M188 108 Q212 135 218 168 Q222 196 222 224 L210 226 Q210 200 204 175 Q198 145 186 118 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw} opacity="0.7"/>
      <path d="M132 288 Q132 312 136 326 Q148 340 160 342 Q172 340 183 326 Q188 312 186 288 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw} transform="rotate(6,160,315)"/>
      <path d="M134 326 Q131 364 130 396 Q129 416 132 430 L150 430 Q152 416 152 396 Q152 364 151 326 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      <path d="M168 326 Q170 364 170 396 Q170 416 172 430 L190 430 Q192 416 192 396 Q192 364 191 326 Z" fill={bodyFill} stroke={bodyStroke} strokeWidth={bw}/>
      {/* left foot flare */}
      <path d="M132 430 L120 436 L110 442" stroke={bodyStroke} strokeWidth="7" strokeLinecap="round" fill="none"/>
      {/* SPL */}
      <path d="M126 118 Q140 155 154 192 Q164 228 158 272 Q154 300 158 320" fill="none" stroke="#7ed321" strokeWidth="4" strokeLinecap="round" opacity="0.85"/>
      {/* FL cross diagonal */}
      <path d="M126 118 Q142 165 158 210 Q172 255 180 295" fill="none" stroke="#1abc9c" strokeWidth="3" strokeLinecap="round" opacity="0.7" strokeDasharray="8 4"/>
      <line x1="120" y1="118" x2="82" y2="100" stroke="#7ed321" strokeWidth="1.2" markerEnd="url(#a5)"/>
      <text x="78" y="96" textAnchor="end" fontSize="10" fill="#7ed321" fontFamily="Georgia,serif">L shoulder forward</text>
      <line x1="116" y1="440" x2="80" y2="446" stroke="#7ed321" strokeWidth="1.2" markerEnd="url(#a5)"/>
      <text x="76" y="450" textAnchor="end" fontSize="10" fill="#7ed321" fontFamily="Georgia,serif">L foot flare</text>
      <line x1="188" y1="290" x2="230" y2="278" stroke="#1abc9c" strokeWidth="1.2" markerEnd="url(#a5)"/>
      <text x="234" y="282" fontSize="10" fill="#1abc9c" fontFamily="Georgia,serif">Hip rotated</text>
      <rect x="220" y="30" width="10" height="3" rx="1" fill="#7ed321"/><text x="234" y="35" fontSize="9" fill="#7ed321" fontFamily="Georgia,serif">SPL</text>
      <rect x="220" y="44" width="10" height="3" rx="1" fill="#1abc9c"/><text x="234" y="49" fontSize="9" fill="#1abc9c" fontFamily="Georgia,serif">FL</text>
    </svg>
  );
  return null;
}


// ── DATA ─────────────────────────────────────────────────────────────────────

const LINES = [
  { id:"sfl", name:"Superficial Front Line", abbr:"SFL", color:"#4a90d9",
    path:"Tops of feet → shins → quadriceps → abdominals → chest → neck → back of skull",
    purpose:"The SFL controls the front of the body. It is the body's forward-pull system. It resists falling backward and powers all flexion movements — pulling the knee to the chest, sitting up, bringing the chin down.",
    simple:"This is the line running up the entire front of the body from toes to skull. When overworked, everything on the front tightens and pulls forward: the head, the chest, the hips.",
    when_dominant:["Forward head — head pushed ahead of the shoulders","Rounded, collapsed chest","Tight hip flexors — front of the hips always feel short","Overuse of the quads when squatting or walking","Rib flare — ribs pushed forward and out","Chronic neck and upper shoulder tension"],
    posture_cues:"Side view: head sits forward of the ear, chest caved in, pelvis tilted forward (anterior tilt), knees pushed back (hyperextended).",
    gait_cues:"Foot strikes far ahead of the body, quads visibly working hard with each step, limited hip extension — back leg does not fully straighten behind the body.",
    programming:"Do not reinforce forward flexion or quad-dominant movements. Prioritize thoracic extension, hip flexor lengthening through movement, and posterior chain activation (glutes, hamstrings, upper back).",
    avoid:"Crunches, sit-ups, leg press, quad-dominant squats without postural correction first." },
  { id:"sbl", name:"Superficial Back Line", abbr:"SBL", color:"#e05c5c",
    path:"Soles of feet → calves → hamstrings → sacrum → entire spine → back of skull",
    purpose:"The SBL holds the body upright against gravity. It runs the full length of the back — from the soles of the feet to the back of the head. It controls extension and protects against collapsing forward.",
    simple:"This is the line running up the entire back. When poorly coordinated, the back becomes rigid, the lower back takes on too much load, and the hamstrings feel perpetually tight no matter how much they are stretched.",
    when_dominant:["Stiff, rigid posture — the back looks locked, not fluid","Chronic low back tension and compression","Hamstrings that feel tight regardless of how often they are stretched","Glutes that are not firing or contributing to movement","Difficulty bending forward without discomfort or pulling"],
    posture_cues:"Side view: flat lower back (no natural curve), pelvis tucked under (tailbone tucked), locked-out knees. The back looks board-straight, not curved.",
    gait_cues:"Very short, stiff stride length. Minimal hip extension — the back leg barely goes behind the body. Upper back barely rotates. Feet barely leave the ground.",
    programming:"Do not aggressively stretch this line — stretching an overworked SBL often increases tension. Restore coordination between front and back first. Slow, controlled movements that teach the SBL to work with the SFL rather than fight it.",
    avoid:"Aggressive hamstring stretching before tone is reduced. Heavy deadlifts before alignment is established. Movements that add spinal compression without core stability." },
  { id:"ll", name:"Lateral Line", abbr:"LL", color:"#f5a623",
    path:"Outer foot → peroneals → outer knee → IT band → outer hip (TFL/glute med) → lateral ribs → neck → skull",
    purpose:"The LL is the body's side stabilizer. It balances the front and back and keeps the body from falling sideways. It is critical for walking — every single step requires standing on one leg, and the LL is what holds the body upright in that moment.",
    simple:"This line runs down the outside of the entire body — both sides. When it is underperforming, one side doesn't stabilize properly and you see it immediately in how someone walks: one hip drops with every step.",
    when_dominant:["One hip visibly higher than the other at rest","IT band tightness — outer thigh and knee","Knees caving inward during squats or walking (valgus)","Lateral lean of the trunk to one side","Poor balance when standing on one leg","Hip dropping with every step on the opposite side (Trendelenburg)"],
    posture_cues:"Back view: one hip noticeably higher, trunk leaning to one side, one shoulder lower. The body looks like it is leaning into one leg.",
    gait_cues:"Hip drops on one side with every step. The dropping side reveals which Lateral Line is underperforming — if the LEFT hip drops, the RIGHT LL is not doing its job (the standing leg side).",
    programming:"Use split stance work, step patterns, and single-leg stability exercises. Single-leg deadlifts, lateral band walks, step-ups, and contralateral loading are primary tools.",
    avoid:"Bilateral symmetrical loading before single-leg stability is confirmed. Heavy side-loaded carries without core control." },
  { id:"spl", name:"Spiral Line", abbr:"SPL", color:"#7ed321",
    path:"Skull → wraps to opposite shoulder → crosses ribs → same-side hip → outer knee → arch of foot → back up the other side",
    purpose:"The SPL is the body's rotation system. It wraps around the body like a double helix — creating and controlling rotation in walking, throwing, kicking, and every rotational sport movement.",
    simple:"Picture a diagonal sash worn from one shoulder across the body to the opposite hip. The Spiral Line does that on both sides simultaneously, crossing each other. It controls how the body rotates when walking.",
    when_dominant:["One foot rotated outward significantly more than the other","One hip rotated clearly forward compared to the other","Rotational asymmetry in the ribcage — one side more flared","Knee tracking issues — knee collapses inward or outward during movement","Scoliotic tendencies — spine curves to one side"],
    posture_cues:"Front and back views: one foot significantly more turned out, one hip rotated forward, one shoulder driven forward. The body appears twisted at rest.",
    gait_cues:"One arm crossing the midline more than the other. Asymmetrical foot flare side-to-side. One shoulder driving forward aggressively with each step.",
    programming:"Rotational and contralateral movements. Diagonal chops and lifts, rotational presses, half-kneeling rotation, single-leg patterns that challenge the spiral.",
    avoid:"Purely symmetrical bilateral training that ignores the rotational pattern. Address rotation before adding load." },
  { id:"dfl", name:"Deep Front Line", abbr:"DFL", color:"#e74c3c",
    path:"Inner arch of foot → inner leg → inner hip → deep core (psoas, iliacus) → diaphragm → deep neck flexors → skull",
    purpose:"The DFL is the deepest stabilizing system in the body. It supports the spine from the inside, regulates breathing, controls the internal abdominal pressure that protects the lower back, and manages pelvic floor function. Every other line depends on the DFL functioning.",
    simple:"Think of the DFL as the body's inner core — the deep muscles no one can see that hold everything together from the inside. When this system is not working, every other system compensates and fatigues.",
    when_dominant:["Excessive lumbar lordosis — exaggerated lower back arch","Low back pain that does not respond to conventional strengthening","Poor rib-to-pelvis control — ribs flare or belly drops with any effort","Balance and coordination problems","Fatigue with simple, low-load tasks","Difficulty bracing the core without holding the breath"],
    posture_cues:"Side view: exaggerated lower back arch, rib flare, belly pushing forward, forward head. The client cannot find a neutral spine even when verbally cued.",
    gait_cues:"Excessive trunk sway side to side. Low back fatigue appears before muscular fatigue anywhere else. Cannot complete single-leg balance for more than 2–3 seconds.",
    programming:"Slow everything down. Core control must precede all loading. Focus on breathing mechanics first — can the client exhale fully without losing spinal position? Dead bugs, heel slides, bird dogs, supported single-leg balance.",
    avoid:"Heavy loading before DFL is functioning. Breath-holding during exercise — it defeats DFL activation. High-rep fatiguing work that collapses the internal pressure system." },
  { id:"fl", name:"Functional Lines", abbr:"FL", color:"#1abc9c",
    path:"Back FL: right shoulder → across upper back → left hip. Front FL: right shoulder → across chest → left hip. (And mirrored on both sides.)",
    purpose:"The Functional Lines extend the Arm Lines across the trunk to connect opposite shoulder and hip. They power throwing, kicking, and the cross-body force transfer that makes athletic movement possible — and they are why your opposite arm and leg swing together when you walk.",
    simple:"When you throw a ball with your right hand, your left hip drives forward. That cross-body connection is a Functional Line. Walking with no arm swing feels wrong because you have switched off the Functional Lines.",
    when_dominant:["Asymmetrical power output from side to side","Difficulty with contralateral coordination — opposite arm and leg","One side of the body appearing noticeably more coordinated","Reduced athletic transfer of force from lower to upper body"],
    posture_cues:"Less visible at rest — most evident during movement. Look for asymmetry in how upper and lower body connect during dynamic tasks.",
    gait_cues:"Right arm should swing forward as left leg steps forward — and vice versa. When this pattern is absent or asymmetrical, Functional Lines are not engaging properly.",
    programming:"Contralateral loading is the primary tool. Single-arm single-leg patterns, diagonal chops and lifts, rotational medicine ball throws, step patterns requiring opposite-side coordination.",
    avoid:"Exclusively bilateral and symmetrical training for clients who show contralateral coordination problems." },
  { id:"al", name:"Arm Lines", abbr:"AL", color:"#9b59b6",
    path:"Four lines — Deep Front, Superficial Front, Deep Back, Superficial Back — running from the trunk through the shoulder, arm, and into the fingers.",
    purpose:"The Arm Lines connect the shoulder girdle and arm to the trunk. They influence shoulder position, neck tension, and all upper body mechanics — from carrying groceries to pressing overhead to typing at a desk.",
    simple:"The arms are extensions of the trunk. Tension in the shoulder does not start at the shoulder — it starts in the trunk and travels through these lines into the arm, elbow, and hand. This is why neck tension and wrist tension often connect.",
    when_dominant:["Rounded, internally rotated shoulders — palms face backward when arms hang at rest","Chronic neck and upper trap tension","Elbow or wrist tension that persists despite local treatment","Difficulty reaching overhead without compensating","Shoulder impingement patterns"],
    posture_cues:"Front view: palms facing backward when arms hang (internal rotation). Both shoulders rolled forward. Neck compressed on one or both sides.",
    gait_cues:"Arms crossing the midline when walking. One or both arms held close to the body with limited swing. Shoulder does not rotate freely with each step.",
    programming:"Prioritize scapular control, external rotation, and thoracic extension before any pressing or pulling. Wall slides, band pull-aparts, face pulls, thoracic rotation are the foundation.",
    avoid:"Heavy pressing before scapular stability is established. Internally rotation-dominant exercises before the posterior shoulder line is active." },
];

const SCENARIOS = [
  { id:"s1", name:"Margaret, 58",
    complaint:"Chronic low back pain, always feels stiff in the morning, cannot touch her toes",
    posture_findings:["Head forward of the shoulders by 2+ inches","Chest collapsed and rounded","Excessive lower back arch (hyperlordosis)","Pelvis tilted forward (anterior tilt)","Knees hyperextended","Hamstrings always feel tight despite regular stretching"],
    gait_findings:["Short, stiff stride length","Minimal hip extension — back leg barely goes behind the body","Upper back barely rotates","Glutes visually not engaging during push-off"],
    dominant_lines:["Superficial Front Line (SFL) — dominant and pulling everything forward","Superficial Back Line (SBL) — overworking as a compensation"],
    why:"The SFL is pulling everything forward — forward head, collapsed chest, anterior pelvic tilt. The SBL is overworking to hold her upright against this constant forward pull, which is why the hamstrings are chronically tight and the lower back is compressed. Stretching the hamstrings increases SBL tone — it does not fix the problem.",
    programming_priorities:["MFR: thoracic spine, hip flexors, calves — in that order","Mobility: thoracic extension, hip flexor lengthening through movement","Strength: posterior chain — glutes and hamstrings in hip extension, upper back retraction"],
    avoid_list:["Aggressive hamstring stretching — will increase SBL tone and worsen the pattern","Crunches or sit-ups — directly reinforces SFL dominance","Heavy squats or deadlifts before alignment is established"],
    svg_type:"sfl_sbl" },
  { id:"s2", name:"Robert, 63",
    complaint:"Right knee pain, right IT band tightness, feels unstable going down stairs",
    posture_findings:["Right hip visibly higher than left","Trunk leaning slightly to the right","Right foot turned out more than left","Left shoulder lower than right"],
    gait_findings:["Left hip drops noticeably with every step onto the right foot — Trendelenburg sign","Right foot flares outward","Reduced left arm swing","Body shifts right with each step"],
    dominant_lines:["Lateral Line (LL) — underperforming on the RIGHT side","Spiral Line (SPL) — asymmetrical, contributing to foot flare and rotation"],
    why:"Robert's right Lateral Line is not stabilizing during single-leg stance. Every time he steps onto his right foot, his left hip drops — this is the Trendelenburg sign and it tells us directly that the right LL is not doing its job. The foot flare and hip rotation also indicate a Spiral Line imbalance on the right side. The IT band tightness is the LL's response to being asked to do too much with too little coordination.",
    programming_priorities:["MFR: right IT band, right TFL, right peroneals — reduce tone before loading","Mobility: hip internal rotation, ankle mobility right side","Strength: right-side single-leg stability — step-ups, single-leg deadlifts, lateral band walks"],
    avoid_list:["Bilateral squats and lunges before single-leg stability is confirmed","Heavy lateral loading without core control","Ignoring the foot flare — it will continue driving the knee pain"],
    svg_type:"ll_spl" },
  { id:"s3", name:"Diane, 52",
    complaint:"Shoulder pain right side, chronic neck tension both sides, cannot reach overhead without pain",
    posture_findings:["Both shoulders rolled forward and internally rotated","Palms face backward when arms hang at rest","Head forward of the shoulders","Right shoulder more elevated than left","Upper back (thoracic spine) very rounded"],
    gait_findings:["Both arms held close to the body — minimal swing","Right arm crosses the midline with each step","Upper body stiff — not rotating freely"],
    dominant_lines:["Superficial Front Line (SFL) — collapsing the chest and pulling shoulders forward","Arm Lines (AL) — overworking in both arms, more severe on the right"],
    why:"The SFL dominance is collapsing the chest and pulling the shoulders into internal rotation. The Arm Lines are overworking to maintain arm function in this compromised position, which drives chronic neck and shoulder tension. The fact that the right arm crosses the midline when walking tells us the right Arm Lines are compensating for the left Functional Lines not engaging.",
    programming_priorities:["MFR: chest, anterior shoulder, suboccipitals (base of skull)","Mobility: thoracic extension, shoulder external rotation — wall slides, sleeper stretch","Strength: scapular retraction and depression, face pulls, band pull-aparts"],
    avoid_list:["Any pressing before scapular stability is restored","Overhead work before thoracic extension is meaningfully improved","Internal rotation-dominant exercises"],
    svg_type:"sfl_al" },
  { id:"s4", name:"James, 67",
    complaint:"Low back fatigue within 15 minutes of any exercise, poor balance, has fallen twice in the past year",
    posture_findings:["Excessive lumbar lordosis — exaggerated lower back arch","Rib flare visible from the side","Belly pushing forward significantly","Cannot find neutral spine even when verbally cued for 2 minutes","Forward head"],
    gait_findings:["Excessive trunk sway from side to side","Lower back visibly working hard to maintain upright position","Cannot complete single-leg balance for more than 2 seconds","Steps are short and cautious — fear of falling"],
    dominant_lines:["Deep Front Line (DFL) — severely underperforming"],
    why:"James's DFL is not functioning as an internal stabilizer. The exaggerated arch, rib flare, belly protrusion, and trunk sway all indicate that the deep core system is not regulating internal pressure. His lower back muscles are compensating — doing the DFL's job — which is why they fatigue in 15 minutes. Loading any exercise on top of this pattern will make things worse, not better.",
    programming_priorities:["MFR: inner thighs, hip flexors, thoracic spine","Breathing mechanics first — can he exhale fully without his spine position collapsing?","Strength: dead bugs, heel slides, bird dogs, supported balance — nothing standing unsupported until DFL is active"],
    avoid_list:["Heavy loading of any kind before DFL is functioning","Breath-holding during exercise — defeats DFL activation","High-rep fatiguing work — collapses the internal pressure system further","Standing balance challenges without support before baseline is established"],
    svg_type:"dfl" },
  { id:"s5", name:"Sandra, 55",
    complaint:"Left hip pain when walking, feels like she always leads with her right side, difficulty with sport",
    posture_findings:["Left foot significantly more turned out than right","Left hip rotated forward compared to right","Left shoulder driven forward at rest","Asymmetrical rib position — left side more flared forward"],
    gait_findings:["Left arm crosses the midline aggressively with each step","Right arm barely swings","Left foot flares significantly more than right","Body appears to twist left with each step","Poor force transfer from lower to upper body on the right side"],
    dominant_lines:["Spiral Line (SPL) — left side dominant, creating whole-body rotation","Functional Lines (FL) — asymmetrical, left side driving, right side passive"],
    why:"Sandra has a dominant left Spiral Line creating a whole-body rotation pattern that she cannot consciously override. The foot flare, hip rotation, shoulder rotation, and arm crossing the midline are all connected through the same fascial pathway that wraps around the left side of the body. The Functional Lines are asymmetrical — her left side is the driver in every movement and her right side barely participates.",
    programming_priorities:["MFR: left IT band, left TFL, left thoracic rotators","Mobility: left hip internal rotation, right thoracic rotation","Strength: contralateral patterns — right arm left leg; rotational chops and lifts; anti-rotation core work"],
    avoid_list:["Purely symmetrical bilateral training — reinforces the rotational pattern","Heavy loading before the rotation is addressed","Sport-specific training before the pattern is corrected"],
    svg_type:"spl_fl" },
];

const QUIZ_QUESTIONS = [
  { q:"What is the Superficial Front Line's primary function?", options:["Control rotation through the body","Hold the body upright against gravity","Control flexion of the front body and resist backward falling","Stabilize the body from side to side"], correct:2, explanation:"The SFL runs up the entire front of the body and controls forward flexion. It is the body's forward-pull system." },
  { q:"A client has a forward head, collapsed chest, and tight hip flexors. Which line is most dominant?", options:["Superficial Back Line","Lateral Line","Deep Front Line","Superficial Front Line"], correct:3, explanation:"All three findings — forward head, collapsed chest, tight hip flexors — trace directly to the SFL pathway." },
  { q:"What does tensegrity mean in the context of the human body?", options:["Muscles work in isolation to produce movement","The skeleton carries all structural load","The body is a continuous tension network where no part works alone","Fascia is separate from muscle and has no mechanical role"], correct:2, explanation:"Tensegrity: a structure held together by continuous tension. The body's fascial web means tension in one area affects the whole system." },
  { q:"A client's LEFT hip drops every time they step onto their RIGHT foot. Which line is underperforming?", options:["Spiral Line — left side","Lateral Line — RIGHT side","Superficial Back Line","Deep Front Line"], correct:1, explanation:"When the hip drops on the opposite side during single-leg stance (Trendelenburg), the Lateral Line on the STANDING leg side is underperforming. Left hip drops = right LL weak." },
  { q:"Why should you NOT aggressively stretch the Superficial Back Line when it is dominant?", options:["Stretching is never useful","It causes immediate injury","Stretching an overworked SBL often increases tone rather than reducing it","The SBL cannot be lengthened"], correct:2, explanation:"When the SBL is overworking as a compensation pattern, aggressive stretching increases tone rather than reducing it. Restore the pattern before stretching." },
  { q:"What is the ICB methodology sequence?", options:["Load → Reduce Tone → Restore Alignment","Restore Alignment → Load → Reduce Tone","Reduce Tone → Restore Alignment → Then Load","Assess → Load → Reassess"], correct:2, explanation:"Always: Reduce Tone (MFR) → Restore Alignment (mobility/activation) → Then Load (strength). This order is non-negotiable." },
  { q:"A client has one foot turned out significantly more than the other and one shoulder rotated forward. Which line is most involved?", options:["Superficial Back Line","Deep Front Line","Superficial Front Line","Spiral Line"], correct:3, explanation:"The Spiral Line wraps around the body like a double helix and controls rotation. Rotational asymmetries in foot and shoulder are classic SPL findings." },
  { q:"What is the Deep Front Line's primary role?", options:["Control side-to-side stability","Power rotation","Stabilize the spine from the inside and regulate internal pressure","Connect opposite shoulder and hip"], correct:2, explanation:"The DFL is the body's innermost system — diaphragm, deep core, pelvic floor. It regulates the internal pressure that protects the lumbar spine." },
  { q:"What is fascia?", options:["A type of muscle fiber","The continuous connective tissue web surrounding and connecting every structure in the body","The outer layer of skin","Cartilage between joints"], correct:1, explanation:"Fascia is continuous connective tissue that surrounds every muscle, organ, bone, and nerve. It transmits force and holds the body's structural patterns." },
  { q:"What does contralateral training mean?", options:["Training one limb at a time","Working opposite arm and leg together as in walking","Training front and back on separate days","Training only the dominant side first"], correct:1, explanation:"Contralateral training works opposite limbs together — right arm with left leg, left arm with right leg — mirroring natural gait mechanics." },
  { q:"A client has palms facing backward when arms hang at rest and chronic neck tension. Which line is dominant?", options:["Superficial Back Line","Functional Lines","Arm Lines","Lateral Line"], correct:2, explanation:"Palms facing backward = shoulder internal rotation. Combined with neck tension, this is a classic Arm Lines (AL) presentation." },
  { q:"What is the primary purpose of MFR at the start of every session?", options:["Strengthen weak muscles","Increase cardiovascular output","Reduce tone in overactive areas so the nervous system accepts new movement patterns","Aggressively stretch tight muscles"], correct:2, explanation:"MFR reduces resting tone. The goal is making the nervous system more receptive to new patterns before loading. Preparation, not treatment." },
  { q:"Which three views should every postural assessment capture?", options:["Front, back, and diagonal","Anterior, lateral, and posterior","Standing, seated, and walking","Overhead, side, and behind"], correct:1, explanation:"Anterior (front), Lateral (side), and Posterior (back) views — each revealing different asymmetries that are not visible from other angles." },
  { q:"A client cannot balance on one leg for more than 2 seconds, has excessive lower back arch, and their low back fatigues within 15 minutes. Which line?", options:["Superficial Front Line","Lateral Line","Deep Front Line","Superficial Back Line"], correct:2, explanation:"All classic DFL findings. The deep stabilizing system is not regulating internal pressure, so the lower back compensates and fatigues rapidly." },
  { q:"What is the Spiral Line's primary function?", options:["Control forward flexion","Hold the body upright","Create and control rotation through the body","Stabilize the arms"], correct:2, explanation:"The SPL wraps around the body like a double helix, creating and controlling rotation in walking, throwing, kicking, and all rotational movement." },
  { q:"Why does ICB observe gait in addition to static posture?", options:["Gait is easier to observe","Clients can hold compensations at rest that only appear under the load of movement","Gait is required by licensing boards","Static posture is unreliable"], correct:1, explanation:"Static posture allows compensation and masking. Gait forces continuous movement — the body cannot hide its patterns when it has to keep moving forward." },
  { q:"What to look for when watching arm swing during gait?", options:["How fast the arms move","Whether right arm swings forward as left leg steps — and vice versa","Whether arms are held at 90 degrees","Whether arms cross in front of the body"], correct:1, explanation:"Contralateral arm-leg coordination is fundamental gait mechanics controlled by the Functional Lines. When absent or asymmetrical, FLs are not engaging." },
  { q:"Client: chronic IT band tightness right side, left hip drops when walking, poor right single-leg balance. Which line?", options:["Spiral Line — right side","Superficial Front Line","Lateral Line — right side","Deep Front Line"], correct:2, explanation:"IT band tightness, contralateral hip drop, poor single-leg balance — all Lateral Line findings on the standing leg (right) side." },
  { q:"What does the Coach Snapshot document?", options:["The client's workout plan only","Dominant and underperforming lines, coaching priorities, MFR targets, and what to avoid","The client's nutrition","How much weight the client can lift"], correct:1, explanation:"The Coach Snapshot is the complete biomechanical picture — readable by any ICB practitioner who picks up the client." },
  { q:"Which exercises to AVOID for a client with dominant Superficial Front Line?", options:["Hip extensions and rows","Thoracic extensions and face pulls","Crunches, leg press, and quad-dominant squats","Single-leg deadlifts"], correct:2, explanation:"Crunches, leg press, and quad-dominant squats all reinforce SFL dominance — increasing the pattern you are trying to reduce." },
  { q:"What is the Lateral Line's primary job during walking?", options:["Power the forward stride","Control breathing mechanics","Stabilize the body during single-leg stance so the opposite hip does not drop","Connect the arms to the trunk"], correct:2, explanation:"Every step = single-leg stance. The LL on the standing leg holds the pelvis level. Without it, the opposite hip drops — Trendelenburg." },
  { q:"A client with Functional Line asymmetry leads every step with the same shoulder. What is the starting point?", options:["Heavy bilateral squats","Contralateral loading — single-arm single-leg patterns and diagonal movements","Isolated core exercises","Aggressive shoulder stretching"], correct:1, explanation:"Functional Lines are trained through contralateral patterns that require opposite arm and leg to coordinate — mirroring natural gait." },
  { q:"What does 'dominant line' mean at ICB?", options:["The strongest line in the body","A line that is overworked, shortened, or thickened — pulling the body out of optimal position","The line needing the most strengthening","The line closest to the surface"], correct:1, explanation:"A dominant line has become overactive or shortened — from repetitive patterns, injury, or sedentary habits. It pulls the body out of balance." },
  { q:"Why is foam rolling limited to 60–90 seconds per area?", options:["It is painful beyond 90 seconds","The research specifies exactly 90 seconds","Longer does not improve tone reduction and may agitate the tissue","It takes too much session time"], correct:2, explanation:"60–90 seconds is sufficient to influence resting tone. Longer does not improve outcomes and risks irritating the tissue." },
  { q:"Side view: exaggerated lower back curve, ribs flaring forward, belly pushing out. Primary finding?", options:["Spiral Line dominance","Lateral Line underperformance","Deep Front Line dysfunction","Superficial Back Line dominance"], correct:2, explanation:"Hyperlordosis + rib flare + belly protrusion are classic DFL dysfunction. The internal system is not regulating pressure, so the lower back extends excessively as compensation." },
];


const TENSEGRITY_SECTIONS = [
  {label:"What Is Tensegrity?", text:"Tensegrity combines tension and integrity. It describes a structure that gains stability not from rigid compression — like a brick wall stacked on itself — but from a continuous network of tension throughout its entire form.\n\nThink of a tent. The poles do not touch each other. They are held in place entirely by the tension of the fabric and ropes. Remove one rope and the whole tent changes shape. That is tensegrity."},
  {label:"Why This Changes How You Think About the Body", text:"Most people — and many trainers — think of the body as a skeleton stacked on top of itself, like a building. Muscles attach to bones and pull on them to create movement. Pain in the knee means something is wrong at the knee.\n\nTensegrity says that is incomplete. The body is held together by a continuous fascial web — connective tissue wrapping every muscle, organ, bone, and nerve. This web is always under tension, and that tension is continuous. Nothing in the body is isolated.\n\nA restriction anywhere in the fascial web pulls on everything connected to it. This is why a tight calf can show up as low back pain. Why a forward head can create knee problems. Why poor breathing mechanics can cause shoulder tension."},
  {label:"What Is Fascia?", text:"Fascia is the connective tissue that surrounds and connects every structure in the body. It is not just a wrapping — it is a living, adaptable tissue that transmits force, responds to stress, and holds the body's structural memory.\n\nWhen someone is sedentary, injured, or moving in repetitive patterns, fascia thickens and becomes less pliable in certain areas. This changes how force is distributed through the body — and how that person stands, walks, and moves."},
  {label:"How Tensegrity Connects to the Myofascial Lines", text:"The Anatomy Trains lines are the specific pathways of continuous myofascial tension mapped through the body. When one region of a line becomes dominant — overworked, shortened, or thickened — it affects the tension of the entire line. And through the fascial web, it affects other lines as well.\n\nThis is why a client with a dominant SFL also often shows changes in the SBL, the LL, and sometimes the DFL. The web is continuous."},
  {label:"What This Means for How You Coach", text:"You are not a muscle trainer. You are a pattern trainer.\n\nWhen a client has tight hip flexors, the question is not 'how do I stretch the hip flexors?' The question is: why is the Superficial Front Line dominant? What is not working on the back of the body that is allowing the front to overwork?\n\nYou fix patterns, not parts. You reduce tension in dominant lines and restore coordination in underperforming lines. You do not treat the symptom — you address the system. This is what separates ICB from every other coaching approach."},
];

const POSTURE_SECTIONS = [
  {label:"The Three Views", text:"Every postural assessment at ICB captures three views:\n\nAnterior (Front): Look for left-right asymmetries — one hip higher, one shoulder lower, head tilted, feet turned out unevenly.\n\nLateral (Side): Look for front-back relationships — forward head, rounded chest, pelvic tilt, knee position relative to the plumb line.\n\nPosterior (Back): Look for spinal alignment, shoulder blade position, hip height, and foot position from behind."},
  {label:"Front View — What to Ask", text:"— Are the feet even, or is one turned out more? (Spiral Line)\n— Are the knees straight, or do they fall inward? (Lateral Line)\n— Is one hip higher than the other? (Lateral Line)\n— Are the shoulders level? (Lateral Line, Arm Lines)\n— Is the head centered or tilted? (Lateral Line, Spiral Line)"},
  {label:"Side View — What to Ask", text:"— Where is the head relative to the shoulder? If forward of the ear — SFL\n— Is the chest open or collapsed? If caved — SFL\n— Is the lower back arched excessively? — SFL dominance + DFL underperforming\n— Is the pelvis tilted forward or tucked under? — SFL (forward) or SBL (tucked)\n— Are the knees locked back (hyperextended)? — SBL"},
  {label:"Back View — What to Ask", text:"— Does the spine curve to one side? (Spiral Line)\n— Are the shoulder blades even and controlled? (Arm Lines)\n— Is one hip higher or rotated forward? (Lateral Line, Spiral Line)\n— Are the feet even from behind? (Spiral Line)"},
  {label:"Connecting Findings to Lines", text:"Forward head + tight hip flexors + quad dominance → SFL\n\nRigid posture + hamstrings always tight + glutes not firing → SBL\n\nOne hip higher + knee caves inward + poor single-leg balance → LL\n\nFoot turned out on one side + one shoulder rotated forward → SPL\n\nExcessive lower back arch + poor core control + low back pain → DFL\n\nRounded shoulders + neck tension + limited overhead → AL\n\nAsymmetrical arm swing + poor contralateral coordination → FL\n\nYou are looking for CLUSTERS of findings that trace to the same line — not isolated observations."},
];

const GAIT_SECTIONS = [
  {label:"Why Gait Matters More Than Posture Alone", text:"Walking is the most fundamental human movement pattern. Every other movement — squatting, lifting, running, reaching — is built on top of it.\n\nGait reveals what posture cannot. A client can compensate and hold still in a postural assessment. They cannot compensate the same way when walking — the body has to keep moving, and the patterns become visible."},
  {label:"The Four Questions", text:"Watch the client walk at a natural pace from front, side, and behind. Ask:\n\n1. Do the opposite arm and leg swing together?\nRight arm forward as left leg steps. Left arm swings as right leg steps. When absent or asymmetrical — Functional Lines.\n\n2. Does each hip fully extend behind the body?\nAt end of each step, the back leg should straighten behind. If the hip does not extend — SBL (glutes not contributing) or SFL (hip flexors too tight).\n\n3. Does the trunk rotate freely?\nUpper and lower body should move in opposite directions with each step. Rigid trunk — SBL. Asymmetrical rotation — Spiral Line.\n\n4. Are both feet hitting the ground the same way?\nOne foot turning out significantly more, landing differently — Spiral Line or Lateral Line."},
  {label:"Common Gait Patterns and What They Mean", text:"Hip drops on one side with each step → LL underperforming on the STANDING leg side\n\nAnterior pelvic tilt increases while walking → SFL dominant, DFL underperforming\n\nExcessive trunk sway side to side → LL bilaterally, DFL not stabilizing\n\nShortened stride on one side → SPL asymmetry or SBL restriction\n\nNo arm swing → FL disengaged, AL restricted\n\nFoot flare one or both sides → SPL on the flared side\n\nKnee caves inward during push-off → LL underperforming, SFL dominant"},
];

const PAGES = [
  {id:"home",title:"Home",status:"complete",icon:"⌂",videoId:"ADBgQJL4jZ4",content:{heading:"Welcome to ICB",body:"This portal is your single source of truth for how Iron City Biomechanics operates — how we train clients, how we communicate, how we assess movement, and what we expect from every practitioner who carries this name.\n\nWork through each section in order. Complete sections unlock the next.",sections:[{label:"Portal Purpose",text:"This is not a general reference. It is the operational standard. When in doubt, come back here."},{label:"How to Use",text:"Navigate using the sidebar. Complete sections unlock as you progress."}]}},
  {id:"mission",title:"Mission, Standards & Doctrine",status:"complete",icon:"◈",content:{heading:"Mission, Standards & Doctrine",body:"This document is doctrine — not a reading assignment. Every decision you make as an ICB Practitioner is governed by what is written here. Understand it. Internalize it. Execute it.",sections:[{label:"The Mission",text:"\"We help people move without pain and stay active for life.\"\n\nThis is the operating directive for every ICB coach. When uncertain about a coaching decision, ask whether your decision serves this mission. If it does not, it is the wrong decision."},{label:"Who We Serve",text:"Men and women, ages 40–70. Primary need: move without pain, maintain independence, stay active for life. Most come with chronic pain, past injuries, post-surgical recovery, long gaps in training, or PT discharge with no clear next step.\n\nWhat they fear: making things worse, wasting money, being treated like a number. What they need: precision, explanation, a plan that makes sense, and a practitioner who takes their history seriously."},{label:"What ICB Is — and Is Not",text:"ICB is a premium boutique biomechanics coaching practice. A bridge between healthcare and high-performance fitness. A posture and gait-informed, precision-based training system.\n\nICB is not a volume gym, a physical therapy clinic, or a generic personal training business. We do not diagnose or treat."},{label:"The Six Non-Negotiables",text:"01 — We do not chase fatigue.\n02 — We coach movement quality. When quality drops, the set ends.\n03 — We prioritize posture and gait-informed strength.\n04 — Quality overrides load. Load is a reward for quality.\n05 — Every decision supports long-term client independence.\n06 — Consistency protects the client. Follow the system."},{label:"The ICB Methodology Sequence",text:"Reduce Tone → Restore Alignment → Then Load.\n\nThis sequence governs every session without exception. MFR first. Mobility and alignment second. Strength only once the pattern is clean."},{label:"Practitioner Identity",text:"You are a movement specialist — clinical-adjacent, precision-focused, systems-driven. Not a personal trainer in the traditional sense.\n\nAn ICB Practitioner arrives prepared, coaches movement quality, documents every session, and follows the SOP."},{label:"Scope of Practice",text:"Within scope: observe and describe movement patterns, design programs based on assessment findings, recommend clients see a healthcare provider when warranted.\n\nNever: diagnose, prescribe treatment, or produce clinical reports. When in doubt — stop, document, escalate."}]}},
  {id:"client-journey",title:"Client Journey",status:"complete",icon:"→",content:{heading:"Client Journey",body:"The client journey is not a sales funnel. It is a care pathway. Eight stages. Every practitioner must know every stage.",sections:[{label:"Stage 1 — Lead Makes Contact",text:"Respond within 2 hours. Log in GLM immediately. Begin calling cadence within 24 hours if no immediate booking.\n\nHandoff trigger: Lead contacted, call or NSI scheduled."},{label:"Stage 2 — Lead Call",text:"Use the approved call script. Offer two options: Movement Assessment or No Sweat Intro. Book before ending the call.\n\nHandoff trigger: Appointment booked."},{label:"Stage 3 — No Sweat Intro (NSI)",text:"RL-4+ only. Execute the full C.L.O.S.E.R. framework. Never allow the prospect to leave without a next step.\n\nHandoff trigger: Sign-up, assessment booking, or follow-up protocol initiated."},{label:"Stage 4 — Sign-Up & Payment",text:"RL-4+ only. Update GLM to 'Won.' Confirm KILO profile. Take payment. Schedule Movement Assessment before they leave.\n\nHandoff trigger: Payment confirmed, Movement Assessment scheduled."},{label:"Stage 5 — Movement Assessment",text:"RL-4+ only. PostureScreen + Ochy gait analysis. Document in Trainerize. Send findings email within 24 hours.\n\nHandoff trigger: Documentation complete, Day 1 session scheduled."},{label:"Stage 6 — Day 1 Training Session",text:"RL-4+ only. Review Coach Snapshot before client arrives. MFR → alignment → load. Notes in Trainerize within 15 minutes.\n\nHandoff trigger: Session complete, next session confirmed."},{label:"Stage 7 — Ongoing Sessions & Check-Ins",text:"RL-4+ only. Every session follows ICB methodology sequence. Weekly check-ins via Google Meet using G.E.N.H.A.S.R.\n\nHandoff trigger: Client reaches 90 days, 90-day review scheduled."},{label:"Stage 8 — Retention & Renewal",text:"RL-4+ only. 90-day goal review. Collect testimonial. Contact client 14 days before expiration.\n\nHandoff trigger: Client renews or exit protocol begins."}]}},
  {id:"practitioner-readiness",title:"Practitioner Readiness & Certification",status:"complete",icon:"✦",content:{heading:"Practitioner Readiness & Certification",body:"You are not ready to work with clients until every item in this section is confirmed.",sections:[{label:"ICB Certification",text:"No prior certifications required. ICB trains and certifies its own practitioners. What matters is your commitment to learning and applying the ICB methodology."},{label:"Readiness Checklist",text:"Policy agreement signed. ICB orientation modules completed and passed. Shadow session completed with a senior practitioner. First client assigned by ICB admin only."},{label:"Ongoing Requirements",text:"Annual ICB recertification. Quarterly peer review sessions. All client incidents reported within 24 hours."}]}},
  {id:"movement-assessment-sop",title:"Movement Assessment SOP",status:"complete",icon:"◎",content:{heading:"Movement Assessment SOP",body:"The Movement Assessment is the foundation of every ICB client relationship. It is not a workout — it is a 45-minute evaluation that determines everything about how we coach this person. Nothing happens before the paperwork is complete.",sections:[
  {label:"Step 1 — Before They Arrive: Paperwork First",text:"Before the client sits down for their Movement Assessment, you must complete the paperwork step. This is non-negotiable.\n\n1. Go to the binder at the front of the studio.\n2. Pull out a blank Movement Assessment Waiver.\n3. When the client arrives, have them complete and sign the waiver before any assessment begins. Do not start the assessment until the waiver is signed.\n4. Once signed, take a clear photo of the completed waiver with your phone.\n5. Open Google Drive and create a new folder for this client. Name the folder: [Client Last Name, Client First Name] — for example: Franklin, Neriah\n6. Upload the waiver photo into their Google Drive folder.\n7. Once you have confirmed the waiver is successfully uploaded and visible in Google Drive — go into the client's KILO profile and delete the unsigned waiver document from there. Only delete it from KILO after it is confirmed in Google Drive.\n\nIf the waiver is not uploaded to Google Drive, do not delete it from KILO. The signed document must exist somewhere at all times."},
  {label:"Step 2 — Assessment Protocol",text:"Assessment content and protocols will be updated here once the Calivus Labs integration is confirmed. Check with management for current assessment procedures until this section is complete."},
  {label:"Step 3 — Red Flags During Assessment",text:"If a client reports or displays any of the following during the Movement Assessment — stop immediately:\n\nChest pain or tightness, dizziness or lightheadedness, sudden sharp pain anywhere, numbness or tingling radiating down an arm or leg, shortness of breath disproportionate to the activity level.\n\nIf in doubt — stop. Have them sit down. Assess whether they need emergency services. If yes — call 911. If no — keep them calm, document everything, and contact your supervisor before they leave.\n\nDo not attempt to push through any of these symptoms. The assessment can be rescheduled. A medical event cannot be undone."}
]}},
  {id:"session-delivery-sop",title:"Session Delivery SOP",status:"complete",icon:"▣",content:{heading:"Session Delivery SOP",body:"Every session at ICB follows the same structure — regardless of the practitioner delivering it.",sections:[{label:"Before the Client Arrives",text:"Arrive 20–30 minutes early.\n\nStep 1: Open KILO. Confirm who is coming and their membership type.\n\nStep 2: Open Trainerize for semi-private clients. Review their workout and notes. Adjust if needed.\n\nStep 3: Set up the space. Pull all equipment before they arrive. Think through regressions and progressions."},{label:"When the Client Arrives",text:"Greet them by name with energy and professionalism. Have semi-private clients open Trainerize on their phone. Check them into KILO before the session begins. Briefly tell them what the session will focus on."},{label:"During the Session",text:"Every session follows this sequence:\n1. MFR and Dynamic Warm-Up\n2. Mobility and Alignment Work\n3. Strength and Loading\n\nMFR means Myofascial Release — foam rolling targeted areas to relax overworked tissue before training. Always show AND tell. When quality drops, the set ends. Load comes last and only when movement quality is solid."},{label:"Reading the Coach Snapshot",text:"The Coach Snapshot in Trainerize tells you how a specific client's body moves. Read it before every session. It tells you which lines are dominant, where to start with MFR, what to prioritize, and what to avoid. See the Anatomy Trains section for the full framework."},{label:"Foam Rolling — How to Do It Right",text:"60–90 seconds per area. Slow and controlled. Encourage slow breathing.\n\nCommon areas: feet, calves, hamstrings, glutes, thoracic spine.\n\nStop if the client tenses up or guards. Never roll directly on the spine. Never chase pain. Foam rolling is preparation — not treatment."},{label:"After the Session",text:"Enter notes in Trainerize within 15 minutes. Document how they moved, what you adjusted and why, any pain or limitations, and what to focus on next session.\n\nConfirm the next session before the client leaves."}]}},
  {id:"anatomy-trains",title:"Anatomy Trains Framework",status:"complete",icon:"◉",isCustom:true,content:{heading:"",body:"",sections:[]}},
  {id:"weekly-checkin-sop",title:"Weekly Check-In SOP",status:"complete",icon:"◷",content:{heading:"Weekly Check-In SOP",body:"The weekly check-in is a structured conversation — not a casual catch-up.",sections:[{label:"How to Schedule",text:"Open GLM → find the client → Appointments → + icon → choose calendar → select your name → set Custom time → change location to Google Meet → Save.\n\nAdd to your Google Calendar with their email so they receive the Meet link. Ask them to download Google Meet."},{label:"Before the Check-In",text:"GLM sends an automatic reminder. Also send the Meet link personally 10–15 minutes before.\n\nOpen their Trainerize profile: Did they complete their homework? What do the notes say? How have they been moving?"},{label:"During — The G.E.N.H.A.S.R. Framework",text:"Record using Google Gemini.\n\nG — Goals: Revisit what they are working toward.\nE — Energy: How are they feeling? Sleep, stress levels.\nN — Nutrition: Simple check-in on eating and hydration.\nH — Homework: Did they do their exercises? If not, why?\nA — Aches and Pains: Any new discomfort?\nS — Successes: What went well? Celebrate the wins.\nR — Road Ahead: What are they focusing on this week?"},{label:"After the Check-In",text:"Gemini emails you the notes. Copy into ChatGPT to organize. Paste the clean notes into Trainerize. Have ChatGPT write a follow-up email summarizing the check-in and the week ahead. Send it. Add new homework to Trainerize."}]}},
  {id:"programming-rules",title:"Programming Rules",status:"complete",icon:"≡",isModelImage:true,content:{heading:"Programming Rules",body:"This is the ICB Programming Model. Every client follows the same systematic approach. The session content changes based on the individual — the system never does.\n\nRead this before you build a single workout. Understand it before you modify a single exercise.",sections:[
    {label:"The ICB Programming Philosophy",text:"At ICB we do not write random workouts. We execute a system.\n\nEvery client — regardless of their goal, their fitness level, or their membership tier — moves through the same progression structure. What changes is how we apply that structure to their specific body based on what we found in their Movement Assessment.\n\nThe principle that overrides everything else:\n\nGive the client what they need — not what the program says.\n\nThe pre-built programs are tools. They are not rules. A practitioner who blindly follows the program without reading the client in front of them is not an ICB practitioner. A practitioner who reads the client but ignores the system is also not an ICB practitioner. The job is both."},
    {label:"The ICB Programming Pathway",text:"Every client moves through this pathway regardless of membership tier:\n\nStep 1 — Movement Assessment\nAll clients complete a Movement Assessment before their first training session. The findings — dominant lines, underperforming lines, MFR priorities, programming priorities, and contraindications — are documented in the Coach Snapshot in Trainerize. This document drives every programming decision that follows.\n\nStep 2 — The On Ramp (4 Weeks — All Tiers)\nEvery client, regardless of membership, completes the On Ramp before moving into their main program. The On Ramp is a pre-built 4-week program that establishes the ICB movement foundation: tissue quality, postural alignment, pattern reactivation, and initial loading. The practitioner modifies exercises within the On Ramp based on the Coach Snapshot findings.\n\nStep 3 — Main Program (1-on-1 and Semi-Private Only)\nAfter the On Ramp, 1-on-1 and Semi-Private members move into one of four 12-week programs based on their primary goal. See program selection below.\n\nFunctional Movement Class members do not follow an individual program. They attend class-based training delivered through CloudFit TV. The ICB Movement Sequence still governs every class — the content is group-based but the methodology is the same."},
    {label:"The Four Phases — Which Program Does This Client Go Into?",text:"ICB uses a four-phase programming model. After the On Ramp, every 1-on-1 and Semi-Private client is assigned to the phase that matches their current movement capacity and goal — not their age, not their background, not what they think they can handle. The Coach Snapshot and the practitioner's clinical judgment determine the phase.\n\nClients can skip phases if the practitioner confirms through assessment that their movement quality supports a higher phase. Every phase can also be regressed or progressed within the program — the phase is the framework, not a ceiling or a floor.\n\nPHASE 1 — Foundational Rebuilding (12 Weeks)\nFor: New clients, chronic pain, post-physical therapy, post-surgery, deconditioned adults, or anyone whose assessment reveals significant movement dysfunction.\nGoal: Restore movement quality, improve stability, rebuild confidence in the body.\nPrimary focus: Joint integrity, movement pattern correction, pain-free range of motion, tissue preparation, and building a foundation the client can trust.\nThe practitioner's job in Phase 1: Move slowly. Do not rush to load. Quality of movement is the only metric that matters here.\n\nPHASE 2 — Functional Strength (12 Weeks)\nFor: Clients who move well, have minimal pain, and are ready to build real strength. May enter here directly if the assessment confirms an intermediate movement baseline.\nGoal: Strengthen the pillars, build resilience, improve posture under load.\nPrimary focus: Progressive loading of fundamental patterns — hip hinge, squat, push, pull, carry, and single-leg stability. Strength that transfers to real life.\nThe practitioner's job in Phase 2: Load the patterns that Phase 1 established. Watch for compensation under fatigue. Do not let load override quality.\n\nPHASE 3 — Longevity and Independence (12 Weeks)\nFor: Adults 55 and older, clients with joint concerns, or clients whose primary goal is maintaining the ability to live actively and independently.\nGoal: Balance, strength, endurance, and independence.\nPrimary focus: Joint mobility, single-leg stability, fall prevention, functional movement patterns, and sustainable training habits that can be maintained for decades.\nThe practitioner's job in Phase 3: Train the client for their life — not for a performance metric. Every exercise should have a direct connection to something they do or want to keep doing.\n\nPHASE 4 — Performance (12 Weeks)\nFor: Active adults, former athletes, or higher-functioning clients whose assessment confirms they move well and are ready for higher physical demands. A client does not need to be young to be in Phase 4 — they need to move well.\nGoal: Strength, conditioning, and athleticism.\nPrimary focus: Progressive overload, power development, metabolic conditioning, and performance-based training adapted to the individual's capacity and goals.\nThe practitioner's job in Phase 4: Push the client appropriately. Monitor recovery. Maintain the ICB methodology — even at high intensity, movement quality still comes first.\n\nIMPORTANT: Phase assignment is not permanent. A client can move between phases as their capacity changes. A Phase 4 client who sustains an injury may temporarily return to Phase 1 principles. A Phase 1 client who progresses faster than expected may advance to Phase 2 before 12 weeks are complete. Always reassess before transitioning. When in doubt about phase assignment — contact management before assigning."},
    {label:"How to Use a Pre-Built Program",text:"The 12-week programs live in Trainerize as templates. You do not build a program from scratch — you apply the template to the client and then modify it based on their Coach Snapshot.\n\nStep 1 — Pull the Coach Snapshot before touching the program.\nRead the dominant lines, the MFR priorities, the programming priorities, and the contraindications. This document tells you what to change before you see a single exercise.\n\nStep 2 — Assign the program template in Trainerize.\nDo not modify the entire program at once. Work one week ahead. Review the upcoming week's sessions and make targeted adjustments based on the Coach Snapshot and what you observed in the previous session.\n\nStep 3 — Modify MFR selections first.\nThe pre-built program has default MFR exercises. Replace or supplement them with the specific areas identified in the Coach Snapshot. The MFR selection must match the client's dominant lines — not a generic foam rolling routine.\n\nStep 4 — Review the strength exercises for contraindications.\nIf the program includes an exercise that conflicts with the Coach Snapshot findings — a forward flexion exercise for an SFL-dominant client, for example — substitute it with a line-appropriate alternative. See the Anatomy Trains Framework section for exercise substitution guidance.\n\nStep 5 — Document every modification.\nAny change you make to the program must be noted in the session notes in Trainerize. Write what you changed, why you changed it, and how the client responded."},
    {label:"The Weekly Block Structure",text:"All ICB programs follow a consistent weekly block structure:\n\nWeek 1 and Week 3 mirror each other.\nWeek 2 and Week 4 mirror each other.\n\nThis is intentional. Clients need enough repetition with the same movements to develop motor competency. Changing exercises every session creates novelty but not skill. At ICB, we prioritize quality of movement over variety of movement.\n\nWhat this looks like in practice:\nWeek 1 — introduce the movement pattern. Coach quality over load. The client is learning.\nWeek 2 — introduce a new variation or increase the demand. The pattern from Week 1 is the foundation.\nWeek 3 — return to Week 1 movements. The client now has two weeks of exposure. Coach for refinement and increase load where appropriate.\nWeek 4 — return to Week 2 movements. The client is now more capable than they were two weeks ago. Progress accordingly.\n\nAfter the 4-week block, evaluate before moving forward. Do not automatically advance to the next block if the client has not demonstrated competency in the current block's primary patterns."},
    {label:"How to Modify Exercises — The Decision Framework",text:"When you need to substitute, regress, or progress an exercise, use this decision framework:\n\nFirst — check the Coach Snapshot.\nDoes the planned exercise reinforce a dominant line or challenge an underperforming one? If it reinforces the dominant line — substitute it. If it challenges the underperforming line appropriately — keep it.\n\nSecond — check the movement quality in the room.\nBefore loading any pattern, confirm the client can perform the unloaded version with acceptable mechanics. If they cannot — regress. Do not load dysfunction.\n\nThird — check the client's report.\nHow did they feel after the last session? Are they sore in an unexpected area? Did anything hurt? This information changes what you do today.\n\nFourth — apply the principle.\nGive the client what they need — not what the program says. If the program calls for a goblet squat and the client walked in today moving poorly through their hips, you foam roll, you do alignment work, and you earn the squat — or you skip it entirely and come back next session.\n\nProgression criteria — move forward when:\nThe client demonstrates the current movement pattern with consistent quality across the full session, not just the first set. They are no longer being verbally cued on the same error every rep. Their Coach Snapshot findings are improving — verified at reassessment.\n\nRegression criteria — move back when:\nMovement quality drops under load. The client reports pain or significant discomfort. A new injury or medical event has occurred. The session is occurring during an illness or high-stress period where performance will be compromised."},
    {label:"Reassessment — Every 3 Months",text:"Every client receives a formal reassessment at the 3-month mark.\n\nWhat the reassessment covers:\nRepeat the same postural and gait assessment from the original Movement Assessment. Compare findings to the original Coach Snapshot. Document what has improved, what has not changed, and what new findings have emerged.\n\nWhat happens after reassessment:\nUpdate the Coach Snapshot with new findings. Determine whether the client continues in the current 12-week program, transitions to a different program, or requires a modified approach. Discuss the findings with the client during their next 90-day goal review.\n\nThe reassessment is not optional. It is the quality control mechanism that tells you whether the program is working. If a client has been training for 3 months and their dominant lines have not shifted — the program needs to change."},
    {label:"Documentation Standards for Programming",text:"Every session requires documentation in Trainerize within 15 minutes of the session ending.\n\nSession notes must include:\n— What MFR areas were targeted and why\n— What the client's movement quality looked like in the primary patterns\n— What you modified from the program and why\n— Any pain, limitation, or unusual response\n— What to focus on in the next session\n\nThe Coach Snapshot must be updated when:\n— A dominant line shows meaningful improvement\n— A new compensation pattern emerges\n— A medical event or injury changes programming priorities\n— The client completes their reassessment\n\nA session note that says only 'great session' is not a session note. It is a wasted documentation opportunity. The next practitioner who opens that client's profile needs to know exactly what happened and what to do next."},
    {label:"What You Cannot Change Without Management Approval",text:"The following decisions require management approval before implementation:\n\n— Moving a client to a different 12-week program before their current program is complete\n— Stopping a program entirely and designing a custom program from scratch\n— Any programming decision for a client with an active medical condition that has not been previously discussed with management\n— Changing the frequency of sessions from what the membership agreement specifies\n\nWhen in doubt — document your reasoning and contact management before making the change. It is always better to ask than to make a unilateral decision that affects a client's health or a client's membership."}
  ]}},
  {id:"sales-to-onboarding",title:"Sales to Onboarding",status:"queued",icon:"⇒",content:{heading:"Sales to Onboarding",body:"This section is queued and will be available soon.",sections:[]}},
  {id:"client-comms",title:"Client Communication Templates",status:"queued",icon:"✉",content:{heading:"Client Communication Templates",body:"This section is queued and will be available soon.",sections:[]}},
  {id:"red-flags",title:"Red Flags & Escalation",status:"queued",icon:"⚑",content:{heading:"Red Flags & Escalation",body:"This section is queued and will be available soon.",sections:[]}},
];


// ── ANATOMY TRAINS MODULE ────────────────────────────────────────────────────

function AnatomyTrainsPage() {
  const [section, setSection] = useState("intro");
  const [selectedLine, setSelectedLine] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const score = QUIZ_QUESTIONS.filter((q,i) => answers[i] === q.correct).length;
  const passed = score >= 20;

  const nav = [
    {id:"intro",label:"Overview"},{id:"tensegrity",label:"Tensegrity"},
    {id:"lines",label:"The 7 Lines"},{id:"posture",label:"Reading Posture"},
    {id:"gait",label:"Reading Gait"},{id:"scenarios",label:"Client Scenarios"},
    {id:"quiz",label:"Knowledge Quiz"},
  ];

  const sB = {marginBottom:"36px",paddingLeft:"24px",borderLeft:`2px solid ${C.accent}`};
  const lB = {fontSize:"12px",letterSpacing:"2px",textTransform:"uppercase",color:C.accent,marginBottom:"12px",fontWeight:"bold"};
  const tB = {fontSize:"16px",lineHeight:1.9,color:C.text,fontFamily:"Georgia,serif",whiteSpace:"pre-line"};
  const bB = {fontSize:"16px",lineHeight:1.9,color:C.muted,fontFamily:"Georgia,serif",whiteSpace:"pre-line",marginBottom:"40px"};
  const h2S = {fontSize:"26px",fontWeight:"bold",color:C.text,marginBottom:"20px",fontFamily:"Georgia,serif"};
  const nextBtn = (label, to) => (
    <button onClick={() => {setSection(to);setSelectedLine(null);setSelectedScenario(null);}} style={{background:C.accent,color:"#fff",border:"none",padding:"12px 24px",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer",fontFamily:"Georgia,serif",fontWeight:"bold",borderRadius:"3px",marginTop:"8px"}}>{label}</button>
  );

  return (
    <div style={{display:"flex",height:"100%",overflow:"hidden"}}>
      {/* Sub-nav */}
      <div style={{width:"200px",minWidth:"200px",background:C.surfaceAlt,borderRight:`1px solid ${C.border}`,padding:"16px 0",overflowY:"auto",flexShrink:0}}>
        <div style={{padding:"0 16px 16px",fontSize:"9px",letterSpacing:"2px",textTransform:"uppercase",color:C.accent,borderBottom:`1px solid ${C.border}`,marginBottom:"8px"}}>Anatomy Trains</div>
        {nav.map(n => (
          <button key={n.id} onClick={() => {setSection(n.id);setSelectedLine(null);setSelectedScenario(null);}} style={{width:"100%",padding:"10px 16px",background:section===n.id?C.surface:"transparent",border:"none",borderLeft:`2px solid ${section===n.id?C.accent:"transparent"}`,color:section===n.id?C.text:C.muted,cursor:"pointer",textAlign:"left",fontSize:"13px",fontFamily:"Georgia,serif"}}>
            {n.label}{n.id==="quiz"&&<span style={{marginLeft:"6px",fontSize:"10px",color:C.accent}}>25Q</span>}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{flex:1,overflowY:"auto"}}>
        <div style={{padding:"40px 48px",maxWidth:"780px"}}>

          {/* OVERVIEW */}
          {section==="intro" && <>
            <div style={{fontSize:"9px",letterSpacing:"4px",textTransform:"uppercase",color:C.accent,marginBottom:"12px"}}>Foundation</div>
            <h2 style={h2S}>The Anatomy Trains Framework</h2>
            <p style={bB}>{"At ICB, every assessment, every program, and every coaching decision is rooted in one framework: Anatomy Trains.\n\nThis module teaches you everything you need to apply it — without ever reading the book. Work through each section in order. The quiz requires 20 out of 25 to pass."}</p>
            <div style={sB}><div style={lB}>The Core Idea</div><p style={tB}>{"The body is not a collection of separate muscles. It is a continuous network of connected tissue — fascia — that transmits force, holds posture, and shapes how every person moves.\n\nAnatomy Trains maps the specific pathways of this network. There are 7 primary lines. Understanding them tells you why a client moves the way they do — not just what is tight or weak."}</p></div>
            <div style={sB}><div style={lB}>How to Use This Module</div><p style={tB}>{"Tensegrity → 7 Lines (each with a body diagram showing the line) → Posture → Gait → Client Scenarios (visual posture dysfunctions + full analysis) → 25-Question Quiz."}</p></div>
            {nextBtn("Start with Tensegrity →","tensegrity")}
          </>}

          {/* TENSEGRITY */}
          {section==="tensegrity" && <>
            <div style={{fontSize:"9px",letterSpacing:"4px",textTransform:"uppercase",color:C.accent,marginBottom:"12px"}}>Foundational Concept</div>
            <h2 style={h2S}>Tensegrity — Why the Body Is Not a Stack of Bones</h2>
            {TENSEGRITY_SECTIONS.map((s,i) => <div key={i} style={sB}><div style={lB}>{s.label}</div><p style={tB}>{s.text}</p></div>)}
            {nextBtn("Next: The 7 Lines →","lines")}
          </>}

          {/* LINES GRID */}
          {section==="lines" && !selectedLine && <>
            <div style={{fontSize:"9px",letterSpacing:"4px",textTransform:"uppercase",color:C.accent,marginBottom:"12px"}}>Interactive</div>
            <h2 style={h2S}>The 7 Myofascial Lines</h2>
            <p style={{...bB,marginBottom:"28px"}}>Click any line to see it on the body, learn what it does, what dominance looks like in posture and gait, and how to coach it.</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}}>
              {LINES.map(line => (
                <button key={line.id} onClick={() => setSelectedLine(line)} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:"4px",padding:"20px",textAlign:"left",cursor:"pointer",borderTop:`3px solid ${line.color}`}}>
                  <div style={{fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",color:line.color,marginBottom:"6px",fontWeight:"bold"}}>{line.abbr}</div>
                  <div style={{fontSize:"15px",fontWeight:"bold",color:C.text,marginBottom:"8px",fontFamily:"Georgia,serif"}}>{line.name}</div>
                  <div style={{fontSize:"13px",color:C.muted,lineHeight:1.6}}>{line.simple}</div>
                </button>
              ))}
            </div>
          </>}

          {/* LINE DETAIL with body diagram */}
          {section==="lines" && selectedLine && <>
            <button onClick={() => setSelectedLine(null)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,padding:"6px 14px",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer",fontFamily:"Georgia,serif",marginBottom:"28px",borderRadius:"3px"}}>← All Lines</button>
            <div style={{fontSize:"10px",letterSpacing:"3px",textTransform:"uppercase",color:selectedLine.color,marginBottom:"8px",fontWeight:"bold"}}>{selectedLine.abbr}</div>
            <h2 style={{...h2S,borderBottom:`3px solid ${selectedLine.color}`,paddingBottom:"16px"}}>{selectedLine.name}</h2>

            {/* Body diagram showing the line */}
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:"4px",padding:"24px",marginBottom:"32px",display:"flex",gap:"24px",alignItems:"flex-start",flexWrap:"wrap"}}>
              <div style={{flex:"0 0 220px"}}>
                <div style={{fontSize:"9px",letterSpacing:"2px",textTransform:"uppercase",color:C.muted,marginBottom:"12px",textAlign:"center"}}>Line pathway on the body</div>
                <LineBodySVG lineId={selectedLine.id} />
              </div>
              <div style={{flex:1,minWidth:"200px"}}>
                <div style={{...lB,marginBottom:"12px"}}>In Plain Language</div>
                <p style={tB}>{selectedLine.simple}</p>
                <div style={{marginTop:"20px",...lB}}>The Path</div>
                <p style={{...tB,color:selectedLine.color,fontStyle:"italic"}}>{selectedLine.path}</p>
              </div>
            </div>

            <div style={sB}><div style={lB}>What This Line Does</div><p style={tB}>{selectedLine.purpose}</p></div>
            <div style={sB}>
              <div style={lB}>Signs This Line Is Dominant</div>
              {selectedLine.when_dominant.map((item,i) => (
                <div key={i} style={{display:"flex",gap:"12px",marginBottom:"8px"}}>
                  <span style={{color:selectedLine.color,flexShrink:0}}>—</span>
                  <p style={{fontSize:"16px",lineHeight:1.7,color:C.text,fontFamily:"Georgia,serif"}}>{item}</p>
                </div>
              ))}
            </div>
            <div style={sB}><div style={lB}>How to See It in Posture</div><p style={tB}>{selectedLine.posture_cues}</p></div>
            <div style={sB}><div style={lB}>How to See It in Gait</div><p style={tB}>{selectedLine.gait_cues}</p></div>
            <div style={{...sB,borderLeftColor:C.success}}><div style={{...lB,color:C.success}}>How to Program for This Line</div><p style={tB}>{selectedLine.programming}</p></div>
            <div style={{...sB,borderLeftColor:C.danger}}><div style={{...lB,color:C.danger}}>What to Avoid</div><p style={tB}>{selectedLine.avoid}</p></div>

            <div style={{display:"flex",gap:"10px",flexWrap:"wrap",marginTop:"16px"}}>
              {LINES.filter(l => l.id !== selectedLine.id).map(l => (
                <button key={l.id} onClick={() => setSelectedLine(l)} style={{background:"none",border:`1px solid ${l.color}`,color:l.color,padding:"6px 14px",fontSize:"10px",letterSpacing:"1px",textTransform:"uppercase",cursor:"pointer",fontFamily:"Georgia,serif",borderRadius:"3px"}}>{l.abbr}</button>
              ))}
            </div>
          </>}

          {/* POSTURE */}
          {section==="posture" && <>
            <div style={{fontSize:"9px",letterSpacing:"4px",textTransform:"uppercase",color:C.accent,marginBottom:"12px"}}>Assessment Skill</div>
            <h2 style={h2S}>How to Read Posture Using the Lines</h2>
            {POSTURE_SECTIONS.map((s,i) => <div key={i} style={sB}><div style={lB}>{s.label}</div><p style={tB}>{s.text}</p></div>)}
            {nextBtn("Next: Reading Gait →","gait")}
          </>}

          {/* GAIT */}
          {section==="gait" && <>
            <div style={{fontSize:"9px",letterSpacing:"4px",textTransform:"uppercase",color:C.accent,marginBottom:"12px"}}>Assessment Skill</div>
            <h2 style={h2S}>How to Read Gait Using the Lines</h2>
            {GAIT_SECTIONS.map((s,i) => <div key={i} style={sB}><div style={lB}>{s.label}</div><p style={tB}>{s.text}</p></div>)}
            {nextBtn("Next: Client Scenarios →","scenarios")}
          </>}

          {/* SCENARIOS LIST */}
          {section==="scenarios" && !selectedScenario && <>
            <div style={{fontSize:"9px",letterSpacing:"4px",textTransform:"uppercase",color:C.accent,marginBottom:"12px"}}>Real Cases</div>
            <h2 style={h2S}>Client Scenarios</h2>
            <p style={{...bB,marginBottom:"28px"}}>{"Five real client profiles. Each includes their complaint, postural and gait findings, a visual posture diagram with the dominant lines highlighted, and the full coaching analysis.\n\nTry to identify the dominant lines before reading the analysis."}</p>
            <div style={{display:"grid",gap:"16px"}}>
              {SCENARIOS.map(s => (
                <button key={s.id} onClick={() => setSelectedScenario(s)} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:"4px",padding:"20px",textAlign:"left",cursor:"pointer"}}>
                  <div style={{fontSize:"16px",fontWeight:"bold",color:C.text,marginBottom:"6px",fontFamily:"Georgia,serif"}}>{s.name}</div>
                  <div style={{fontSize:"13px",color:C.muted,lineHeight:1.6}}>{s.complaint}</div>
                </button>
              ))}
            </div>
          </>}

          {/* SCENARIO DETAIL */}
          {section==="scenarios" && selectedScenario && <>
            <button onClick={() => setSelectedScenario(null)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,padding:"6px 14px",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer",fontFamily:"Georgia,serif",marginBottom:"28px",borderRadius:"3px"}}>← All Scenarios</button>
            <div style={{fontSize:"9px",letterSpacing:"4px",textTransform:"uppercase",color:C.accent,marginBottom:"12px"}}>Client Profile</div>
            <h2 style={{...h2S,marginBottom:"8px"}}>{selectedScenario.name}</h2>
            <div style={{fontSize:"15px",color:C.muted,marginBottom:"32px",fontStyle:"italic",fontFamily:"Georgia,serif"}}>Chief complaint: {selectedScenario.complaint}</div>

            {/* Posture diagram */}
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:"4px",padding:"24px",marginBottom:"28px"}}>
              <div style={{...lB,marginBottom:"20px"}}>Visual Postural Assessment — Dominant Lines Highlighted</div>
              <PostureDiagram type={selectedScenario.svg_type} />
            </div>

            <div style={sB}>
              <div style={lB}>Postural Assessment Findings</div>
              {selectedScenario.posture_findings.map((f,i) => (
                <div key={i} style={{display:"flex",gap:"12px",marginBottom:"8px"}}>
                  <span style={{color:C.accent,flexShrink:0}}>—</span>
                  <p style={{fontSize:"16px",lineHeight:1.7,color:C.text,fontFamily:"Georgia,serif"}}>{f}</p>
                </div>
              ))}
            </div>

            <div style={sB}>
              <div style={lB}>Gait Assessment Findings</div>
              {selectedScenario.gait_findings.map((f,i) => (
                <div key={i} style={{display:"flex",gap:"12px",marginBottom:"8px"}}>
                  <span style={{color:C.accent,flexShrink:0}}>—</span>
                  <p style={{fontSize:"16px",lineHeight:1.7,color:C.text,fontFamily:"Georgia,serif"}}>{f}</p>
                </div>
              ))}
            </div>

            <div style={{background:"#fdf6ee",border:`1px solid #e8d5b7`,borderRadius:"4px",padding:"24px",marginBottom:"28px"}}>
              <div style={{...lB,color:"#8a6e4e"}}>Analysis — Dominant Lines</div>
              {selectedScenario.dominant_lines.map((l,i) => (
                <div key={i} style={{fontSize:"15px",fontWeight:"bold",color:C.text,marginBottom:"4px",fontFamily:"Georgia,serif"}}>{l}</div>
              ))}
              <div style={{marginTop:"16px"}}>
                <div style={{fontSize:"11px",letterSpacing:"1px",textTransform:"uppercase",color:C.muted,marginBottom:"8px"}}>Why</div>
                <p style={{fontSize:"15px",lineHeight:1.8,color:C.text,fontFamily:"Georgia,serif"}}>{selectedScenario.why}</p>
              </div>
            </div>

            <div style={{...sB,borderLeftColor:C.success}}>
              <div style={{...lB,color:C.success}}>Programming Priorities</div>
              {selectedScenario.programming_priorities.map((p,i) => (
                <div key={i} style={{display:"flex",gap:"12px",marginBottom:"8px"}}>
                  <span style={{color:C.success,flexShrink:0}}>✓</span>
                  <p style={{fontSize:"16px",lineHeight:1.7,color:C.text,fontFamily:"Georgia,serif"}}>{p}</p>
                </div>
              ))}
            </div>

            <div style={{...sB,borderLeftColor:C.danger}}>
              <div style={{...lB,color:C.danger}}>What to Avoid</div>
              {selectedScenario.avoid_list.map((a,i) => (
                <div key={i} style={{display:"flex",gap:"12px",marginBottom:"8px"}}>
                  <span style={{color:C.danger,flexShrink:0}}>✗</span>
                  <p style={{fontSize:"16px",lineHeight:1.7,color:C.text,fontFamily:"Georgia,serif"}}>{a}</p>
                </div>
              ))}
            </div>

            {(() => {
              const idx = SCENARIOS.findIndex(s => s.id === selectedScenario.id);
              const next = SCENARIOS[idx+1];
              return next
                ? <button onClick={() => setSelectedScenario(next)} style={{background:C.accent,color:"#fff",border:"none",padding:"12px 24px",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer",fontFamily:"Georgia,serif",fontWeight:"bold",borderRadius:"3px",marginTop:"8px"}}>Next: {next.name} →</button>
                : <button onClick={() => {setSelectedScenario(null);setSection("quiz");}} style={{background:C.accent,color:"#fff",border:"none",padding:"12px 24px",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer",fontFamily:"Georgia,serif",fontWeight:"bold",borderRadius:"3px",marginTop:"8px"}}>Take the Quiz →</button>;
            })()}
          </>}

          {/* QUIZ */}
          {section==="quiz" && <>
            <div style={{fontSize:"9px",letterSpacing:"4px",textTransform:"uppercase",color:C.accent,marginBottom:"12px"}}>Knowledge Assessment</div>
            <h2 style={h2S}>Anatomy Trains Quiz</h2>

            {!quizStarted && <>
              <p style={{...bB,marginBottom:"32px"}}>{"25 questions covering tensegrity, the 7 lines, posture reading, gait reading, and client scenarios.\n\nYou need 20 out of 25 to pass. No open book."}</p>
              <button onClick={() => setQuizStarted(true)} style={{background:C.accent,color:"#fff",border:"none",padding:"12px 24px",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer",fontFamily:"Georgia,serif",fontWeight:"bold",borderRadius:"3px"}}>Start Quiz</button>
            </>}

            {quizStarted && !quizSubmitted && <>
              {/* Progress dots */}
              <div style={{display:"flex",gap:"4px",flexWrap:"wrap",marginBottom:"20px"}}>
                {QUIZ_QUESTIONS.map((_,i) => (
                  <div key={i} onClick={() => setCurrentQ(i)} style={{width:"24px",height:"24px",borderRadius:"2px",background:answers[i]!==undefined?C.accent:C.border,cursor:"pointer",border:currentQ===i?`2px solid ${C.text}`:"2px solid transparent",opacity:answers[i]!==undefined?1:0.5,flexShrink:0}}/>
                ))}
              </div>
              <div style={{fontSize:"12px",color:C.muted,marginBottom:"20px"}}>Question {currentQ+1} of {QUIZ_QUESTIONS.length} · {Object.keys(answers).length} answered</div>
              <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:"4px",padding:"28px",marginBottom:"20px"}}>
                <p style={{fontSize:"17px",fontWeight:"bold",color:C.text,lineHeight:1.6,marginBottom:"24px",fontFamily:"Georgia,serif"}}>{QUIZ_QUESTIONS[currentQ].q}</p>
                {QUIZ_QUESTIONS[currentQ].options.map((opt,i) => (
                  <button key={i} onClick={() => setAnswers({...answers,[currentQ]:i})} style={{width:"100%",padding:"14px 16px",marginBottom:"10px",background:answers[currentQ]===i?"#fdf6ee":C.bg,border:`1px solid ${answers[currentQ]===i?C.accent:C.border}`,color:answers[currentQ]===i?C.accent:C.text,borderRadius:"3px",textAlign:"left",cursor:"pointer",fontSize:"15px",fontFamily:"Georgia,serif",lineHeight:1.5}}>{opt}</button>
                ))}
              </div>
              <div style={{display:"flex",gap:"12px"}}>
                {currentQ > 0 && <button onClick={() => setCurrentQ(currentQ-1)} style={{padding:"10px 20px",background:"none",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer",fontFamily:"Georgia,serif",borderRadius:"3px",fontSize:"13px"}}>← Back</button>}
                {currentQ < QUIZ_QUESTIONS.length-1
                  ? <button onClick={() => setCurrentQ(currentQ+1)} style={{padding:"10px 24px",background:C.accent,color:"#fff",border:"none",cursor:"pointer",fontFamily:"Georgia,serif",borderRadius:"3px",fontSize:"13px",fontWeight:"bold"}}>Next →</button>
                  : <button onClick={() => setQuizSubmitted(true)} disabled={Object.keys(answers).length<QUIZ_QUESTIONS.length} style={{padding:"10px 24px",background:Object.keys(answers).length===QUIZ_QUESTIONS.length?C.accent:C.border,color:"#fff",border:"none",cursor:Object.keys(answers).length===QUIZ_QUESTIONS.length?"pointer":"default",fontFamily:"Georgia,serif",borderRadius:"3px",fontSize:"13px",fontWeight:"bold"}}>Submit Quiz</button>
                }
              </div>
            </>}

            {quizSubmitted && <>
              <div style={{background:C.surface,border:`2px solid ${passed?C.success:C.danger}`,borderRadius:"4px",padding:"28px",marginBottom:"32px",textAlign:"center"}}>
                <div style={{fontSize:"52px",fontWeight:"bold",color:passed?C.success:C.danger,marginBottom:"8px"}}>{score} / {QUIZ_QUESTIONS.length}</div>
                <div style={{fontSize:"18px",fontWeight:"bold",color:C.text,marginBottom:"8px"}}>{passed?"Passed ✓":"Not Yet"}</div>
                <div style={{fontSize:"14px",color:C.muted}}>{passed?"You have demonstrated solid knowledge of the Anatomy Trains framework. You are ready to apply this in client sessions.":"You need 20 out of 25. Review the sections where you missed questions and retake when ready."}</div>
              </div>
              {QUIZ_QUESTIONS.map((q,i) => {
                const correct = answers[i]===q.correct;
                return (
                  <div key={i} style={{background:C.surface,border:`1px solid ${correct?"#c3ddc9":"#f5c6c6"}`,borderRadius:"4px",padding:"20px",marginBottom:"16px"}}>
                    <div style={{display:"flex",gap:"12px",alignItems:"flex-start",marginBottom:"12px"}}>
                      <span style={{color:correct?C.success:C.danger,fontWeight:"bold",flexShrink:0}}>{correct?"✓":"✗"}</span>
                      <p style={{fontSize:"15px",fontWeight:"bold",color:C.text,fontFamily:"Georgia,serif",lineHeight:1.5}}>{q.q}</p>
                    </div>
                    {!correct && <p style={{fontSize:"13px",color:C.muted,marginBottom:"8px",paddingLeft:"24px"}}>Your answer: <span style={{color:C.danger}}>{q.options[answers[i]]}</span></p>}
                    <p style={{fontSize:"13px",color:C.muted,marginBottom:"8px",paddingLeft:"24px"}}>Correct: <span style={{color:C.success,fontWeight:"bold"}}>{q.options[q.correct]}</span></p>
                    <p style={{fontSize:"13px",color:C.muted,lineHeight:1.7,paddingLeft:"24px",fontStyle:"italic"}}>{q.explanation}</p>
                  </div>
                );
              })}
              {!passed && <button onClick={() => {setAnswers({});setCurrentQ(0);setQuizSubmitted(false);}} style={{background:C.accent,color:"#fff",border:"none",padding:"12px 24px",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer",fontFamily:"Georgia,serif",fontWeight:"bold",borderRadius:"3px",marginTop:"8px"}}>Retake Quiz</button>}
            </>}
          </>}

        </div>
      </div>
    </div>
  );
}


// ── SHARED COMPONENTS ────────────────────────────────────────────────────────

const statusBadge = (status) => {
  const map = {complete:{label:"✓",bg:"#eaf2ec",color:"#4a7c59",border:"#c3ddc9"},next:{label:"Next",bg:"#fdf6ee",color:"#b8976a",border:"#e8d5b7"},queued:{label:"Queued",bg:"#f2f0ed",color:"#aaa",border:"#ddd9d3"}};
  const s = map[status]||map.queued;
  return <span style={{display:"inline-block",padding:"3px 10px",fontSize:"9px",letterSpacing:"2px",textTransform:"uppercase",background:s.bg,color:s.color,border:`1px solid ${s.border}`,borderRadius:"2px",fontFamily:"Georgia,serif",fontWeight:"bold",flexShrink:0}}>{s.label}</span>;
};

// ── ADMIN VIEW ────────────────────────────────────────────────────────────────

const PRACTITIONERS = [
  {id:1,name:"Marcus Webb",type:"Internal",joined:"May 28",progress:100,pagesRead:4},
  {id:2,name:"Aisha Collins",type:"External",joined:"May 29",progress:36,pagesRead:2},
  {id:3,name:"Derek Huang",type:"Internal",joined:"May 30",progress:18,pagesRead:1},
  {id:4,name:"Simone Okafor",type:"External",joined:"May 31",progress:0,pagesRead:0},
];

function AdminView({onBack}) {
  const [practitioners,setPractitioners] = useState(PRACTITIONERS);
  const [showAdd,setShowAdd] = useState(false);
  const [newName,setNewName] = useState("");
  const [newType,setNewType] = useState("Internal");
  const [selected,setSelected] = useState(null);
  const completedPages = PAGES.filter(p=>p.status==="complete").length;
  const add = () => {if(!newName.trim())return;setPractitioners([...practitioners,{id:Date.now(),name:newName.trim(),type:newType,joined:"Today",progress:0,pagesRead:0}]);setNewName("");setShowAdd(false);};
  const stats=[{label:"Total",val:practitioners.length,color:C.text},{label:"Completed",val:practitioners.filter(p=>p.progress===100).length,color:C.success},{label:"In Progress",val:practitioners.filter(p=>p.progress>0&&p.progress<100).length,color:C.accent},{label:"Not Started",val:practitioners.filter(p=>p.progress===0).length,color:C.muted}];
  return (
    <div style={{padding:"32px",maxWidth:"900px",margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"32px"}}>
        <button onClick={onBack} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,padding:"6px 14px",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer",fontFamily:"Georgia,serif"}}>← Back</button>
        <div><div style={{fontSize:"10px",letterSpacing:"3px",color:C.accent,textTransform:"uppercase",marginBottom:"4px"}}>Admin</div><div style={{fontSize:"22px",fontWeight:"bold",color:C.text}}>Practitioner Dashboard</div></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"12px",marginBottom:"28px"}}>
        {stats.map(s=><div key={s.label} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:"4px",padding:"16px"}}><div style={{fontSize:"9px",letterSpacing:"2px",color:C.muted,textTransform:"uppercase",marginBottom:"8px"}}>{s.label}</div><div style={{fontSize:"30px",fontWeight:"bold",color:s.color}}>{s.val}</div></div>)}
      </div>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:"4px",marginBottom:"28px"}}>
        <div style={{padding:"16px 20px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontSize:"10px",letterSpacing:"3px",textTransform:"uppercase",color:C.accent}}>Portal Build Status</div><div style={{fontSize:"11px",color:C.muted}}>{completedPages}/{PAGES.length} complete</div></div>
        {PAGES.map(p=><div key={p.id} style={{display:"grid",gridTemplateColumns:"1fr 80px",padding:"12px 20px",borderBottom:`1px solid ${C.border}`,alignItems:"center"}}><span style={{fontSize:"13px",color:p.status==="queued"?C.muted:C.text}}>{p.title}</span><div style={{textAlign:"right"}}>{statusBadge(p.status)}</div></div>)}
      </div>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:"4px"}}>
        <div style={{padding:"16px 20px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontSize:"10px",letterSpacing:"3px",textTransform:"uppercase",color:C.accent}}>Practitioners</div><button onClick={()=>setShowAdd(true)} style={{background:C.accent,color:"#fff",border:"none",padding:"7px 16px",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer",fontFamily:"Georgia,serif",fontWeight:"bold",borderRadius:"3px"}}>+ Add</button></div>
        {practitioners.map(p=><div key={p.id} style={{display:"grid",gridTemplateColumns:"2fr 80px 90px 110px 60px",padding:"12px 20px",borderBottom:`1px solid ${C.border}`,alignItems:"center",fontSize:"13px"}}><div><div style={{fontWeight:"bold",color:C.text}}>{p.name}</div><div style={{fontSize:"11px",color:C.muted}}>Joined {p.joined}</div></div><div style={{color:C.muted,fontSize:"11px"}}>{p.type}</div><div style={{color:C.text}}>{p.pagesRead}/{PAGES.length}</div><div><div style={{fontSize:"11px",marginBottom:"3px",color:C.text}}>{p.progress}%</div><div style={{height:"2px",background:C.border}}><div style={{height:"100%",width:`${p.progress}%`,background:p.progress===100?C.success:C.accent}}/></div></div><button onClick={()=>setSelected(p)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,padding:"4px 10px",fontSize:"10px",cursor:"pointer",fontFamily:"Georgia,serif",borderRadius:"3px"}}>View</button></div>)}
      </div>
      {showAdd&&<div style={{position:"fixed",inset:0,background:"rgba(61,61,61,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}} onClick={()=>setShowAdd(false)}><div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:"6px",padding:"28px",width:"360px"}} onClick={e=>e.stopPropagation()}><div style={{fontSize:"18px",fontWeight:"bold",marginBottom:"20px",color:C.text}}>Add Practitioner</div><input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="Full name" style={{width:"100%",background:C.bg,border:`1px solid ${C.border}`,color:C.text,padding:"10px 12px",fontSize:"13px",fontFamily:"Georgia,serif",borderRadius:"3px",outline:"none",marginBottom:"16px"}}/><div style={{display:"flex",gap:"8px",marginBottom:"20px"}}>{["Internal","External"].map(t=><button key={t} onClick={()=>setNewType(t)} style={{padding:"7px 16px",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",background:newType===t?C.accent:"transparent",color:newType===t?"#fff":C.muted,border:`1px solid ${newType===t?C.accent:C.border}`,cursor:"pointer",fontFamily:"Georgia,serif",borderRadius:"3px"}}>{t}</button>)}</div><div style={{display:"flex",gap:"10px"}}><button onClick={add} style={{flex:1,background:C.accent,color:"#fff",border:"none",padding:"10px",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer",fontFamily:"Georgia,serif",fontWeight:"bold",borderRadius:"3px"}}>Add</button><button onClick={()=>setShowAdd(false)} style={{padding:"10px 16px",background:"none",border:`1px solid ${C.border}`,color:C.muted,fontSize:"10px",cursor:"pointer",fontFamily:"Georgia,serif",borderRadius:"3px"}}>Cancel</button></div></div></div>}
      {selected&&<div style={{position:"fixed",inset:0,background:"rgba(61,61,61,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}} onClick={()=>setSelected(null)}><div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:"6px",padding:"28px",width:"440px",maxHeight:"80vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}><div style={{fontSize:"20px",fontWeight:"bold",marginBottom:"4px",color:C.text}}>{selected.name}</div><div style={{fontSize:"12px",color:C.muted,marginBottom:"20px"}}>{selected.type} · Joined {selected.joined}</div>{PAGES.map((page,i)=>{const done=i<selected.pagesRead;return <div key={page.id} style={{display:"flex",alignItems:"center",gap:"12px",padding:"10px 0",borderBottom:`1px solid ${C.border}`}}><div style={{width:"22px",height:"22px",border:`1px solid ${done?C.success:C.border}`,background:done?"#eaf2ec":"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",color:done?C.success:C.muted,flexShrink:0,borderRadius:"3px"}}>{done?"✓":i+1}</div><div style={{flex:1,fontSize:"12px",color:done?C.text:C.muted}}>{page.title}</div>{statusBadge(page.status)}</div>;})} <button onClick={()=>setSelected(null)} style={{marginTop:"20px",background:"none",border:`1px solid ${C.border}`,color:C.muted,padding:"8px 16px",fontSize:"10px",cursor:"pointer",fontFamily:"Georgia,serif",borderRadius:"3px"}}>Close</button></div></div>}
    </div>
  );
}

// ── PORTAL VIEW ───────────────────────────────────────────────────────────────

function PortalView({onAdmin}) {
  const [activePage,setActivePage] = useState(PAGES[0]);
  const [sidebarOpen,setSidebarOpen] = useState(true);
  const [readPages,setReadPages] = useState(["home","mission","client-journey","practitioner-readiness"]);
  const markRead = (id) => {if(!readPages.includes(id))setReadPages([...readPages,id]);};
  const canAccess = (page) => page.status==="complete"||page.status==="next";

  return (
    <div style={{display:"flex",height:"100vh",overflow:"hidden"}}>
      {/* Sidebar */}
      <div style={{width:sidebarOpen?"280px":"0px",minWidth:sidebarOpen?"280px":"0px",background:C.surface,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",overflow:"hidden",transition:"all 0.2s ease"}}>
        <div style={{padding:"24px 20px",borderBottom:`1px solid ${C.border}`,flexShrink:0}}>
          <div style={{fontSize:"13px",letterSpacing:"3px",textTransform:"uppercase",color:C.text,fontWeight:"bold",fontFamily:"Georgia,serif"}}>IRON CITY</div>
          <div style={{fontSize:"11px",letterSpacing:"3px",textTransform:"uppercase",color:C.accent,fontFamily:"Georgia,serif"}}>BIOMECHANICS</div>
          <div style={{fontSize:"10px",color:C.muted,marginTop:"4px",fontStyle:"italic"}}>Move Better. Live Stronger.</div>
        </div>
        <div style={{padding:"14px 20px",borderBottom:`1px solid ${C.border}`,flexShrink:0}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}><span style={{fontSize:"9px",letterSpacing:"2px",textTransform:"uppercase",color:C.muted}}>Your Progress</span><span style={{fontSize:"10px",color:C.accent}}>{readPages.length}/{PAGES.length}</span></div>
          <div style={{height:"2px",background:C.border,borderRadius:"1px"}}><div style={{height:"100%",width:`${Math.round(readPages.length/PAGES.length*100)}%`,background:C.accent,transition:"width 0.4s"}}/></div>
        </div>
        <nav style={{flex:1,overflowY:"auto",padding:"8px 0"}}>
          {PAGES.map(page=>{
            const isActive=activePage.id===page.id;
            const isRead=readPages.includes(page.id);
            const accessible=canAccess(page);
            return <button key={page.id} onClick={()=>{if(accessible){setActivePage(page);markRead(page.id);}}} style={{width:"100%",display:"flex",alignItems:"center",gap:"10px",padding:"10px 20px",background:isActive?C.surfaceAlt:"transparent",border:"none",borderLeft:`2px solid ${isActive?C.accent:"transparent"}`,color:!accessible?"#ccc":isActive?C.text:C.muted,cursor:accessible?"pointer":"default",textAlign:"left",fontFamily:"Georgia,serif",transition:"all 0.1s"}}><span style={{fontSize:"12px",opacity:accessible?1:0.4,flexShrink:0,color:page.id==="anatomy-trains"?"#7ed321":C.accent}}>{page.icon}</span><span style={{fontSize:"13px",flex:1,lineHeight:1.3}}>{page.title}</span>{isRead&&<span style={{fontSize:"9px",color:C.success,flexShrink:0}}>✓</span>}{page.status==="queued"&&<span style={{fontSize:"8px",color:"#ccc",flexShrink:0}}>—</span>}</button>;
          })}
        </nav>
        <div style={{padding:"16px 20px",borderTop:`1px solid ${C.border}`,flexShrink:0}}>
          <button onClick={onAdmin} style={{width:"100%",background:"none",border:`1px solid ${C.border}`,color:C.muted,padding:"8px",fontSize:"9px",letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer",fontFamily:"Georgia,serif",borderRadius:"3px"}}>Admin Dashboard →</button>
        </div>
      </div>

      {/* Main content */}
      <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",background:C.bg}}>
        <div style={{padding:"14px 28px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:"16px",background:C.surface,position:"sticky",top:0,zIndex:10,flexShrink:0}}>
          <button onClick={()=>setSidebarOpen(!sidebarOpen)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,width:"28px",height:"28px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"12px",borderRadius:"3px",flexShrink:0}}>{sidebarOpen?"←":"→"}</button>
          <div style={{flex:1}}><div style={{fontSize:"9px",letterSpacing:"3px",textTransform:"uppercase",color:C.muted}}>Iron City Biomechanics</div><div style={{fontSize:"13px",fontWeight:"bold",color:C.text}}>{activePage.title}</div></div>
          {statusBadge(activePage.status)}
        </div>

        {activePage.isCustom ? (
          <div style={{flex:1,overflow:"hidden",display:"flex"}}><AnatomyTrainsPage/></div>
        ) : (
          <div style={{padding:"48px 56px",maxWidth:"760px"}}>
            <div style={{fontSize:"9px",letterSpacing:"4px",textTransform:"uppercase",color:C.accent,marginBottom:"12px"}}>{activePage.status==="complete"?"Completed Section":activePage.status==="next"?"Up Next":"Coming Soon"}</div>
            <h1 style={{fontSize:"32px",fontWeight:"bold",lineHeight:1.2,marginBottom:"28px",color:C.text,fontFamily:"Georgia,serif"}}>{activePage.content.heading}</h1>
            {activePage.videoId&&<div style={{marginBottom:"40px",borderRadius:"4px",overflow:"hidden",border:`1px solid ${C.border}`,aspectRatio:"16/9",position:"relative"}}><iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${activePage.videoId}`} title="ICB" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}}/></div>}
            {activePage.isModelImage&&<div style={{marginBottom:"40px",borderRadius:"4px",overflow:"hidden",border:`1px solid ${C.border}`}}><img src="/icb-model.png" alt="ICB Progressive Training Model" style={{width:"100%",display:"block"}}/></div>}
            {activePage.status==="queued"
              ? <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:"4px",padding:"40px",textAlign:"center"}}><div style={{fontSize:"24px",marginBottom:"12px",opacity:0.3,color:C.accent}}>◷</div><div style={{fontSize:"14px",color:C.muted,lineHeight:1.8}}>This section is queued and will be published soon.</div></div>
              : <>
                  <p style={{fontSize:"16px",lineHeight:1.9,color:C.muted,marginBottom:"40px",whiteSpace:"pre-line",fontFamily:"Georgia,serif"}}>{activePage.content.body}</p>
                  {activePage.content.sections.map((s,i)=><div key={i} style={{marginBottom:"32px",paddingLeft:"24px",borderLeft:`2px solid ${C.accent}`}}><div style={{fontSize:"12px",letterSpacing:"2px",textTransform:"uppercase",color:C.accent,marginBottom:"12px",fontWeight:"bold"}}>{s.label}</div><p style={{fontSize:"16px",lineHeight:1.9,color:C.text,fontFamily:"Georgia,serif",whiteSpace:"pre-line"}}>{s.text}</p></div>)}
                  {(()=>{const idx=PAGES.findIndex(p=>p.id===activePage.id);const np=PAGES[idx+1];if(np&&canAccess(np)){return <div style={{marginTop:"48px",paddingTop:"32px",borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",color:C.muted}}>Next Section</div><button onClick={()=>{setActivePage(np);markRead(np.id);}} style={{background:C.accent,color:"#fff",border:"none",padding:"12px 24px",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer",fontFamily:"Georgia,serif",fontWeight:"bold",borderRadius:"3px"}}>{np.title} →</button></div>;}return null;})()}
                </>
            }
          </div>
        )}
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [view,setView] = useState("portal");
  return (
    <>
      <style>{GLOBAL_STYLE}</style>
      {view==="portal"?<PortalView onAdmin={()=>setView("admin")}/>:<AdminView onBack={()=>setView("portal")}/>}
    </>
  );
}
