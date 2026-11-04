"use client";

import qrcode from "qrcode-generator";
import { useMemo } from "react";

/** QR drawn on this site from `value` — no third-party QR service. */
export function QR({ value, label }: { value: string; label: string }) {
  const { n, d } = useMemo(() => {
    const qr = qrcode(0, "M");
    qr.addData(value);
    qr.make();
    const n = qr.getModuleCount();
    let d = "";
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) d += `M${c} ${r}h1v1h-1z`;
    return { n, d };
  }, [value]);

  return (
    <svg viewBox={`-3 -3 ${n + 6} ${n + 6}`} role="img" aria-label={label} shapeRendering="crispEdges" className="ht-qr">
      <rect x={-3} y={-3} width={n + 6} height={n + 6} fill="#fff" />
      <path d={d} fill="#14130f" />
    </svg>
  );
}
