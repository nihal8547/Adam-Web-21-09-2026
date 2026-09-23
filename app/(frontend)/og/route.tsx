import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/**
 * Dynamic Open Graph image (1200×630). Accepts ?title= to customise per page.
 * Rendered on the edge; no external fonts required (system font stack).
 */
export const runtime = "edge";

const size = { width: 1200, height: 630 };

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title =
    searchParams.get("title")?.slice(0, 90) ?? "Fire Protection & MEP Services in Qatar";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0f1e3d",
        padding: "72px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 14,
            background: "#c9a24b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0f1e3d",
            fontSize: 40,
            fontWeight: 800,
          }}
        >
          A
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#fff", fontSize: 30, fontWeight: 700 }}>
            Adam Technical Services
          </span>
          <span style={{ color: "#E3C05A", fontSize: 18, letterSpacing: 2 }}>
            QCDD CERTIFIED · DOHA, QATAR
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ width: 88, height: 6, background: "#c9a24b", borderRadius: 3 }} />
        <span
          style={{ color: "#fff", fontSize: 60, fontWeight: 800, lineHeight: 1.1, maxWidth: 980 }}
        >
          {title}
        </span>
      </div>

      <div style={{ display: "flex", gap: 28, color: "rgba(255,255,255,0.75)", fontSize: 22 }}>
        <span>Fire Protection</span>
        <span>·</span>
        <span>HVAC & ACMV</span>
        <span>·</span>
        <span>Leak Detection</span>
        <span>·</span>
        <span>{site.phone.display}</span>
      </div>
    </div>,
    { ...size },
  );
}
