import { Platform } from "react-native";

import { useScreenSize } from "./use-screen-size";

/**
 * Two distinct layout modes for the app:
 * - "desktop" → Web on large viewport
 * - "compact" → Web on smaller viewports + Android / iOS
 */
export type LayoutMode = "desktop" | "compact";

export function useLayoutMode(): LayoutMode {
  const { isDesktop } = useScreenSize();

  if (Platform.OS === "web" && isDesktop) {
    return "desktop";
  }

  return "compact";
}
