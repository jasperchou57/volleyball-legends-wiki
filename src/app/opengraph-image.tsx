import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "flex-start",
          background: "linear-gradient(135deg, #081521 0%, #123c67 55%, #102438 100%)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ color: "#ffd166", fontSize: 28, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase" }}>
          Roblox player reference
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05, marginTop: 24 }}>
          Volleyball Legends Wiki
        </div>
        <div style={{ color: "#d6e3ef", fontSize: 34, lineHeight: 1.3, marginTop: 30 }}>
          Codes · Styles · Tier Lists · Update Tracker
        </div>
      </div>
    ),
    size
  );
}
