import React from "react";
import { Circle, G, Path } from "react-native-svg";

import { DC_COLORS } from "../datacenter-builder.constants";

type CablePathProps = {
  /** Starting point in the outer SVG coordinate space (already scaled). */
  from: { x: number; y: number };
  /** Ending point in the outer SVG coordinate space (already scaled). */
  to: { x: number; y: number };
  /** Cable color (use `getCableColor` from helpers to resolve). */
  color: string;
  /** Visual state of this connection. */
  state?: "active" | "pending" | "error";
  /** Dashed style for console (serial) cables. */
  dashed?: boolean;
  /** Stroke width in the outer SVG coordinate space. */
  strokeWidth?: number;
  /**
   * Routing style for the bezier control points.
   *  - "default" (used for rack-to-rack cables): control points pull
   *    horizontally toward each other so patch cables look neatly routed.
   *  - "side-right": the cable approaches the `to` endpoint from its right
   *    side — used on mobile when the console cable has to swing around
   *    the laptop so it doesn't cross the screen.
   */
  routing?: "default" | "side-right";
};

/**
 * Renders a datacenter cable as a smooth cubic Bézier curve with a subtle
 * drop shadow and glossy highlight, so cables feel like physical strands
 * and not CSS lines.
 *
 * The control points push horizontally first so connections leaving the
 * rack on the right look like neatly routed patch cables.
 */
export function CablePath({
  from,
  to,
  color,
  state = "active",
  dashed = false,
  strokeWidth = 3.2,
  routing = "default",
}: CablePathProps) {
  let path: string;
  if (routing === "side-right") {
    // Route the cable so it comes down on the right side of the `to`
    // endpoint and loops in from the right, then enters horizontally.
    // The first control point keeps the cable vertical near `from`, and the
    // second control point is placed to the RIGHT of `to` at the same Y,
    // so the curve approaches the port horizontally from the right — never
    // crossing whatever sits to the left of `to` (e.g. the laptop screen).
    const approachOffset = Math.max(70, Math.abs(to.y - from.y) * 0.6);
    const cp1x = from.x;
    const cp1y = from.y + Math.max(40, Math.abs(to.y - from.y) * 0.4);
    const cp2x = to.x + approachOffset;
    const cp2y = to.y;
    path = `M ${from.x} ${from.y} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${to.x} ${to.y}`;
  } else {
    const dx = Math.max(60, Math.abs(to.x - from.x) * 0.5);
    path = `M ${from.x} ${from.y} C ${from.x + dx} ${from.y} ${to.x - dx} ${to.y} ${to.x} ${to.y}`;
  }

  const isError = state === "error";
  const isPending = state === "pending";
  const baseColor = isError ? DC_COLORS.danger : color;
  const opacity = isPending ? 0.45 : 0.95;

  return (
    <G>
      {/* Drop shadow — gives the cable depth without a filter */}
      <Path
        d={path}
        stroke="rgba(0,0,0,0.45)"
        strokeWidth={strokeWidth + 2}
        strokeLinecap="round"
        fill="none"
        opacity={0.6}
      />

      {/* Main strand */}
      <Path
        d={path}
        stroke={baseColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        opacity={opacity}
        strokeDasharray={dashed ? `${strokeWidth * 3},${strokeWidth * 1.6}` : undefined}
      />

      {/* Inner highlight — thinner, lighter stroke on top for a glossy feel */}
      <Path
        d={path}
        stroke="rgba(255,255,255,0.28)"
        strokeWidth={Math.max(0.6, strokeWidth * 0.35)}
        strokeLinecap="round"
        fill="none"
        opacity={isPending ? 0.3 : 0.7}
        strokeDasharray={dashed ? `${strokeWidth * 3},${strokeWidth * 1.6}` : undefined}
      />

      {/* End caps (connector heads) */}
      <Circle cx={from.x} cy={from.y} r={strokeWidth * 0.9 + 1} fill="rgba(0,0,0,0.55)" />
      <Circle cx={from.x} cy={from.y} r={strokeWidth * 0.9} fill={baseColor} opacity={opacity} />
      <Circle cx={to.x} cy={to.y} r={strokeWidth * 0.9 + 1} fill="rgba(0,0,0,0.55)" />
      <Circle cx={to.x} cy={to.y} r={strokeWidth * 0.9} fill={baseColor} opacity={opacity} />
    </G>
  );
}

type PendingCableProps = {
  from: { x: number; y: number };
  strokeWidth?: number;
};

/**
 * A ghost indicator drawn on the source port while the user is picking the
 * destination for a new connection. Intentionally simple — no cursor tracking
 * because we don't have pointer position in all platforms.
 */
export function PendingSourceMarker({ from, strokeWidth = 3.2 }: PendingCableProps) {
  return (
    <G>
      <Circle
        cx={from.x}
        cy={from.y}
        r={strokeWidth * 2.2}
        fill="none"
        stroke={DC_COLORS.accent}
        strokeWidth={1.4}
        strokeDasharray="3,3"
        opacity={0.85}
      />
      <Circle cx={from.x} cy={from.y} r={strokeWidth * 0.9} fill={DC_COLORS.accent} />
    </G>
  );
}
