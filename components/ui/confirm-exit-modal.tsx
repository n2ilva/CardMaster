import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
    useColorScheme,
} from "react-native";

type ConfirmExitModalProps = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /**
   * Visual tone — "danger" for destructive cancellations (default),
   * "warning" for softer confirmations.
   */
  tone?: "danger" | "warning";
};

/**
 * Standardized "are you sure you want to leave?" dialog used across the
 * exercise screens (Quiz, Quebra-Cabeça, Gestão de Incidentes, DataCenter
 * Builder). Confirming cancels/finalizes the current exercise; canceling
 * keeps the user in place.
 */
export function ConfirmExitModal({
  visible,
  onCancel,
  onConfirm,
  title = "Sair do exercício?",
  message = "Seu progresso neste exercício será descartado. Deseja realmente sair?",
  confirmLabel = "Sair mesmo assim",
  cancelLabel = "Continuar exercício",
  tone = "danger",
}: ConfirmExitModalProps) {
  const isDark = useColorScheme() === "dark";

  const accent = tone === "danger" ? "#EF4444" : "#F59E0B";
  const overlayBg = "rgba(0,0,0,0.7)";
  const surfaceBg = isDark ? "#1A1D21" : "#FFFFFF";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const textPrimary = isDark ? "#ECEDEE" : "#11181C";
  const textMuted = isDark ? "#9BA1A6" : "#64748B";
  const cancelBg = isDark ? "#2D3139" : "#F1F5F9";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={[styles.overlay, { backgroundColor: overlayBg }]}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: surfaceBg,
              borderColor: `${accent}40`,
            },
          ]}
        >
          <View
            style={[
              styles.iconWrap,
              {
                backgroundColor: `${accent}18`,
                borderColor: `${accent}40`,
              },
            ]}
          >
            <MaterialIcons
              name={tone === "danger" ? "logout" : "warning-amber"}
              size={32}
              color={accent}
            />
          </View>

          <Text style={[styles.title, { color: textPrimary }]}>{title}</Text>
          <Text style={[styles.message, { color: textMuted }]}>{message}</Text>

          <View style={styles.actions}>
            <Pressable
              onPress={onCancel}
              accessibilityRole="button"
              accessibilityLabel={cancelLabel}
              style={({ pressed }) => [
                styles.button,
                {
                  backgroundColor: cancelBg,
                  borderColor,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonLabel,
                  { color: textPrimary },
                ]}
                numberOfLines={1}
              >
                {cancelLabel}
              </Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              accessibilityRole="button"
              accessibilityLabel={confirmLabel}
              style={({ pressed }) => [
                styles.button,
                {
                  backgroundColor: accent,
                  borderColor: accent,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <Text
                style={[styles.buttonLabel, { color: "#FFFFFF" }]}
                numberOfLines={1}
              >
                {confirmLabel}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.35,
    shadowRadius: 30,
    elevation: 24,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 24,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});
