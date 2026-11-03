import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.fullName} — ${profile.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAFAF8",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#737373" }}>
          <span style={{ color: "#171717", fontWeight: 700, letterSpacing: -1 }}>{profile.fullName}</span>
          <span>[ {profile.location} ]</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.9, letterSpacing: -8 }}>
          <span
            style={{
              fontSize: 150,
              fontWeight: 700,
              color: "transparent",
              WebkitTextStroke: "3px #2563EB",
            }}
          >
            Ideas
          </span>
          <span style={{ fontSize: 150, fontWeight: 700, color: "#171717" }}>into reality.</span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#737373" }}>
          Developer, designer and builder — software, cybersecurity, AI and design.
        </div>
      </div>
    ),
    size,
  );
}
