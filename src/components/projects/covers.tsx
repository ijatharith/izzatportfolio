import type { ReactNode } from "react";
import type { CoverKey } from "@/types";

/**
 * Illustrative covers drawn in the site's palette. They depict each
 * project's subject — they are not screenshots and show no real data.
 * Replace with real imagery by setting `thumbnail` in data/projects.ts.
 */

const INK = "#171717";
const MUTED = "#737373";
const ACCENT = "#2563EB";
const WASH = "#EFF6FF";
const LINE = "#E5E7EB";
const PAPER = "#FAFAF8";
const MONO = "var(--font-geist-mono), ui-monospace, monospace";

function Frame({ children, label, bg = "#fff" }: { children: ReactNode; label: string; bg?: string }) {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className="block h-full w-full"
      role="img"
      aria-label={label}
    >
      <rect width="800" height="600" fill={bg} />
      {/* faint construction grid */}
      <g stroke={LINE} strokeWidth="1">
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`v${i}`} x1={(i + 1) * 66.66} y1="0" x2={(i + 1) * 66.66} y2="600" />
        ))}
      </g>
      {children}
    </svg>
  );
}

function Vigilance() {
  // Event stream → agent graph → response
  const cells: ReactNode[] = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 7; c++) {
      const hot = (r === 3 && c === 4) || (r === 4 && c === 4) || (r === 4 && c === 5);
      const dark = (r * 7 + c) % 11 === 0;
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={70 + c * 26}
          y={90 + r * 26}
          width="16"
          height="16"
          rx="2"
          fill={hot ? ACCENT : dark ? INK : LINE}
        />,
      );
    }
  }
  return (
    <Frame label="Illustration: a grid of security events with one flagged cluster passed to an agent graph for triage, investigation and response.">
      {cells}
      <text x="70" y="70" fontFamily={MONO} fontSize="14" fill={MUTED}>
        events
      </text>
      <path d="M262 200 C 330 200, 340 300, 410 300" fill="none" stroke={ACCENT} strokeWidth="2" />
      <g fontFamily={MONO} fontSize="14">
        {[
          { x: 470, y: 180, t: "triage" },
          { x: 470, y: 300, t: "investigate" },
          { x: 470, y: 420, t: "respond" },
        ].map((n, i) => (
          <g key={n.t}>
            <circle cx={n.x - 50} cy={n.y} r="22" fill={i === 1 ? ACCENT : "#fff"} stroke={i === 1 ? ACCENT : INK} strokeWidth="2" />
            <text x={n.x - 12} y={n.y + 5} fill={INK}>
              {n.t}
            </text>
          </g>
        ))}
        <line x1="420" y1="202" x2="420" y2="278" stroke={INK} strokeWidth="2" />
        <line x1="420" y1="322" x2="420" y2="398" stroke={INK} strokeWidth="2" strokeDasharray="5 5" />
      </g>
      <circle cx="420" cy="300" r="70" fill="none" stroke={ACCENT} strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="420" cy="300" r="110" fill="none" stroke={ACCENT} strokeOpacity="0.15" strokeWidth="1.5" />
    </Frame>
  );
}

function Palas() {
  return (
    <Frame label="Illustration: a jersey outline with diagonal stripe graphics and a monogram.">
      <defs>
        <clipPath id="jersey">
          <path d="M300 120 L360 100 Q400 135 440 100 L500 120 L600 200 L560 270 L520 245 L520 500 L280 500 L280 245 L240 270 L200 200 Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#jersey)">
        <rect x="180" y="90" width="440" height="420" fill="#fff" />
        {Array.from({ length: 9 }, (_, i) => (
          <rect
            key={i}
            x={120 + i * 70}
            y="40"
            width={i % 3 === 0 ? 30 : 12}
            height="560"
            fill={i % 3 === 0 ? ACCENT : INK}
            transform="rotate(28 400 300)"
          />
        ))}
        <rect x="335" y="250" width="130" height="130" fill="#fff" />
      </g>
      <path
        d="M300 120 L360 100 Q400 135 440 100 L500 120 L600 200 L560 270 L520 245 L520 500 L280 500 L280 245 L240 270 L200 200 Z"
        fill="none"
        stroke={INK}
        strokeWidth="3"
      />
      <text x="400" y="342" textAnchor="middle" fontSize="78" fontWeight="700" letterSpacing="-4" fill={INK}>
        P
      </text>
    </Frame>
  );
}

function BayarSwift() {
  return (
    <Frame label="Illustration: a payments dashboard with summary tiles and a list of invoices with their payment status." bg={PAPER}>
      <rect x="90" y="80" width="620" height="440" rx="16" fill="#fff" stroke={LINE} strokeWidth="2" />
      <rect x="90" y="80" width="140" height="440" rx="16" fill={INK} />
      <rect x="214" y="80" width="16" height="440" fill={INK} />
      {/* app mark */}
      <rect x="138" y="112" width="44" height="44" rx="10" fill={ACCENT} />
      <path d="M150 134 h20 m-7 -7 l7 7 l-7 7" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="120" y={200 + i * 40} width={i === 1 ? 80 : 64} height="10" rx="5" fill={i === 1 ? ACCENT : "#3f3f46"} />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${260 + i * 145}, 110)`}>
          <rect width="130" height="90" rx="10" fill={i === 0 ? WASH : PAPER} stroke={LINE} />
          <rect x="16" y="18" width="50" height="8" rx="4" fill={MUTED} />
          <rect x="16" y="42" width="78" height="22" rx="4" fill={i === 0 ? ACCENT : INK} />
        </g>
      ))}
      <rect x="260" y="225" width="420" height="260" rx="10" fill={PAPER} stroke={LINE} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="285" y={252 + i * 44} width="110" height="10" rx="5" fill={INK} />
          <rect x="420" y={252 + i * 44} width="150" height="10" rx="5" fill={LINE} />
          <rect x="600" y={250 + i * 44} width="52" height="14" rx="7" fill={i === 2 ? ACCENT : LINE} />
        </g>
      ))}
    </Frame>
  );
}

function SecureMessaging() {
  const hex = ["9f", "3a", "e1", "07", "c4", "5b", "d2", "88", "1e", "f0", "6c", "a9"];
  return (
    <Frame label="Illustration: a message encrypted between a client and server, shown as ciphertext bytes and an authentication tag.">
      <g fontFamily={MONO} fontSize="14">
        <rect x="70" y="230" width="140" height="140" rx="14" fill="#fff" stroke={INK} strokeWidth="2" />
        <text x="140" y="306" textAnchor="middle" fill={INK}>
          client
        </text>
        <rect x="590" y="230" width="140" height="140" rx="14" fill={INK} />
        <text x="660" y="306" textAnchor="middle" fill={PAPER}>
          server
        </text>
        <line x1="210" y1="300" x2="590" y2="300" stroke={LINE} strokeWidth="2" />
        {hex.map((h, i) => (
          <g key={i} transform={`translate(${236 + (i % 6) * 56}, ${i < 6 ? 236 : 324})`}>
            <rect width="46" height="40" rx="6" fill={i >= 10 ? ACCENT : WASH} />
            <text x="23" y="26" textAnchor="middle" fill={i >= 10 ? "#fff" : INK}>
              {h}
            </text>
          </g>
        ))}
        {/* lock */}
        <g transform="translate(400 160)">
          <rect x="-22" y="0" width="44" height="34" rx="6" fill={ACCENT} />
          <path d="M-12 0 v-10 a12 12 0 0 1 24 0 v10" fill="none" stroke={ACCENT} strokeWidth="4" />
        </g>
        <text x="236" y="420" fill={MUTED}>
          AES-256-GCM · tag
        </text>
      </g>
    </Frame>
  );
}

function TaskTrek() {
  const tasks = [
    { done: true, w: 150, p: LINE },
    { done: true, w: 120, p: LINE },
    { done: false, w: 170, p: ACCENT },
    { done: false, w: 135, p: INK },
    { done: false, w: 110, p: LINE },
  ];
  return (
    <Frame label="Illustration: a student task dashboard with a checklist of assignments and a monthly calendar with marked deadlines." bg={PAPER}>
      <rect x="80" y="90" width="300" height="420" rx="16" fill="#fff" stroke={LINE} strokeWidth="2" />
      <rect x="108" y="118" width="120" height="14" rx="7" fill={INK} />
      {tasks.map((t, i) => (
        <g key={i} transform={`translate(108, ${170 + i * 62})`}>
          <rect width="24" height="24" rx="6" fill={t.done ? INK : "#fff"} stroke={INK} strokeWidth="2" />
          {t.done && <path d="M6 12 l4 4 l8 -9" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />}
          <rect x="40" y="3" width={t.w} height="9" rx="4.5" fill={t.done ? LINE : INK} />
          <rect x="40" y="18" width="60" height="6" rx="3" fill={LINE} />
          <rect x="210" y="4" width="36" height="14" rx="7" fill={t.p} />
        </g>
      ))}
      <rect x="410" y="90" width="310" height="420" rx="16" fill="#fff" stroke={LINE} strokeWidth="2" />
      <rect x="438" y="118" width="96" height="14" rx="7" fill={INK} />
      {Array.from({ length: 35 }, (_, i) => {
        const c = i % 7;
        const r = Math.floor(i / 7);
        const due = i === 9 || i === 17 || i === 23;
        const today = i === 15;
        return (
          <g key={i} transform={`translate(${438 + c * 38}, ${160 + r * 62})`}>
            <rect width="30" height="30" rx="7" fill={today ? INK : due ? WASH : PAPER} stroke={due ? ACCENT : "none"} strokeWidth="2" />
            {due && <circle cx="15" cy="40" r="3.5" fill={ACCENT} />}
          </g>
        );
      })}
    </Frame>
  );
}

const covers: Record<CoverKey, () => ReactNode> = {
  vigilance: Vigilance,
  palas: Palas,
  bayarswift: BayarSwift,
  "secure-messaging": SecureMessaging,
  tasktrek: TaskTrek,
};

export function CoverArt({ cover }: { cover: CoverKey }) {
  const Cover = covers[cover];
  return <Cover />;
}
