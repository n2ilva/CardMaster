import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Platform, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useScreenSize } from "./use-screen-size";

const WEB_FIXED_TAB_BAR_HEIGHT = 80;
const MIN_TOP_PADDING = 56;
const ANDROID_STATUS_BAR_HEIGHT =
  Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) : 0;

/**
 * Returns the correct bottom padding for tab screen content.
 */
export function useTabContentPadding(extra = 24): number {
  const tabBarHeight = useBottomTabBarHeight();
  const { isDesktop } = useScreenSize();

  if (isDesktop) {
    return extra;
  }

  if (Platform.OS === "web") {
    return Math.max(tabBarHeight, WEB_FIXED_TAB_BAR_HEIGHT) + extra;
  }

  return tabBarHeight + extra;
}

/**
 * Returns the correct top padding for tab screen content on mobile.
 * Uses safe area insets on native so the content respects the status bar.
 * On web falls back to a fixed value.
 */
export function useTopContentPadding(extra = 16): number {
  const insets = useSafeAreaInsets();
  const { isDesktop } = useScreenSize();

  if (isDesktop) {
    return 0;
  }

  if (Platform.OS === "web") {
    return MIN_TOP_PADDING;
  }

  // On Android with edgeToEdgeEnabled, use StatusBar.currentHeight as fallback
  // when SafeAreaProvider hasn't reported insets yet (insets.top === 0)
  const topInset =
    Platform.OS === "android" && insets.top === 0
      ? ANDROID_STATUS_BAR_HEIGHT
      : insets.top;

  return Math.max(topInset + extra, MIN_TOP_PADDING);
}
