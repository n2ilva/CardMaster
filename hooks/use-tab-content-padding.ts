import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";

const WEB_FIXED_TAB_BAR_HEIGHT = 60;

/**
 * Returns the correct bottom padding for tab screen content.
 * On web the tab bar uses position:fixed, so useBottomTabBarHeight() may
 * return 0. This hook guarantees at least WEB_FIXED_TAB_BAR_HEIGHT pixels
 * of clearance on web.
 */
export function useTabContentPadding(extra = 16): number {
  const tabBarHeight = useBottomTabBarHeight();

  if (Platform.OS === "web") {
    return Math.max(tabBarHeight, WEB_FIXED_TAB_BAR_HEIGHT) + extra;
  }

  return tabBarHeight + extra;
}
