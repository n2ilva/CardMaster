/**
 * RackInstallManual
 * -----------------
 * Manual completo de instalação para o modo "rack" em telas pequenas.
 * Mostrado abaixo do rack quando a visualização compacta está ativa.
 *
 * Inclui:
 *  - Sequência de instalação (cada equipamento, ordem e posição em U).
 *  - Tabela de cabeamento (quais cabos vão em cada porta, de/para).
 *  - Passo a passo geral de operação (instalar, cabear, validar).
 *
 * É um painel somente-leitura. O usuário continua interagindo diretamente
 * com o rack (clicar em slots e portas); este painel apenas descreve o que
 * precisa ser feito.
 */

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { DC_CABLE_VISUALS, DC_COLORS, DC_RADII } from "../datacenter-builder.constants";
import { getDeviceIcon } from "../datacenter-builder.helpers";
import type {
    DataCenterLevel,
    InventoryDevice,
    RequiredConnection,
} from "../datacenter-builder.types";

type Props = {
  level: DataCenterLevel;
  installedDevices: Record<number, InventoryDevice>;
};

function normalizeKey(key: string): string {
  return key === "laptop.serial" ? "laptop.console" : key;
}

function portLabel(device: InventoryDevice | undefined, portId: string): string {
  if (!device) return portId;
  const port = device.ports.find((p) => p.id === portId);
  return port?.label ?? port?.id ?? portId;
}

function deviceLabel(
  inventory: InventoryDevice[],
  deviceId: string,
): { label: string; iconName: string } {
  if (deviceId === "laptop") {
    return { label: "Notebook de gerência", iconName: "laptop" };
  }
  const dev = inventory.find((d) => d.id === deviceId);
  return {
    label: dev?.label ?? deviceId,
    iconName: dev ? getDeviceIcon(dev.id, dev.type) : "help-circle-outline",
  };
}

function cableVisual(cableId: string) {
  return (
    DC_CABLE_VISUALS[cableId] ?? {
      color: DC_COLORS.accent,
      label: cableId,
      description: "",
    }
  );
}

/**
 * Produces the installation sequence: the order the user is expected to
 * rack the equipment, annotated with the slot (U) position that matches the
 * inventory's order in the JSON (top of rack = first inventory entry).
 */
function useInstallSequence(level: DataCenterLevel) {
  return useMemo(() => {
    const total = level.inventory.length;
    // We number slots from the BOTTOM (1U), which is the convention used in
    // the rack SVG tooltip. Index 0 of inventory corresponds to the TOP of
    // the rack (highest U number).
    return level.inventory.map((device, idx) => {
      const u = total - idx;
      return {
        device,
        slotIndex: idx,
        slotLabel: `${u}U`,
      };
    });
  }, [level.inventory]);
}

/**
 * Produces the cabling table grouped by the required connections of the
 * level, resolving labels and cable metadata for display.
 */
function useCablingTable(level: DataCenterLevel) {
  return useMemo(() => {
    return level.connections_required.map((req: RequiredConnection) => {
      const [fromDevId, fromPortId] = normalizeKey(req.from).split(".");
      const [toDevId, toPortId] = normalizeKey(req.to).split(".");
      const fromDev = level.inventory.find((d) => d.id === fromDevId);
      const toDev = level.inventory.find((d) => d.id === toDevId);
      return {
        fromDevId,
        fromDev,
        fromPortId,
        fromPortLabel: portLabel(fromDev, fromPortId),
        toDevId,
        toDev,
        toPortId,
        toPortLabel: portLabel(toDev, toPortId),
        cable: cableVisual(req.cable),
        note: req.note,
      };
    });
  }, [level.connections_required, level.inventory]);
}

export function RackInstallManual({ level, installedDevices }: Props) {
  const sequence = useInstallSequence(level);
  const cabling = useCablingTable(level);
  const installedCount = Object.keys(installedDevices).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="clipboard-text-outline"
          size={18}
          color={DC_COLORS.textPrimary}
        />
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={styles.title}>Manual de Instalação</Text>
          <Text style={styles.subtitle} numberOfLines={2}>
            Siga o passo a passo para racking e cabeamento deste cenário.
          </Text>
        </View>
        <View style={styles.progressPill}>
          <Text style={styles.progressPillText}>
            {installedCount}/{level.inventory.length}
          </Text>
        </View>
      </View>

      {/* Passo a passo geral */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Procedimento geral</Text>
        {[
          "Clique em um slot vazio (U) do rack para abrir a lista de equipamentos.",
          "Instale os equipamentos na ordem sugerida abaixo.",
          "Com tudo racked, clique em uma porta de origem para iniciar um cabo.",
          "Escolha o tipo de cabo correto e clique na porta de destino.",
          "Use o cabo de console para abrir o terminal e configurar cada equipamento.",
          "Ao concluir todas as conexões, toque em Validar.",
        ].map((step, i) => (
          <View key={`step-${i}`} style={styles.stepRow}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>{i + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      {/* Sequência de instalação */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sequência de instalação</Text>
        <Text style={styles.sectionHint}>
          Slots numerados de baixo para cima (1U = base do rack).
        </Text>
        {sequence.map(({ device, slotIndex, slotLabel }, i) => {
          const installed = !!installedDevices[slotIndex];
          const iconName = getDeviceIcon(device.id, device.type);
          return (
            <View
              key={`seq-${device.id}-${i}`}
              style={[styles.deviceCard, installed && styles.deviceCardDone]}
            >
              <View style={styles.deviceCardHeader}>
                <View
                  style={[
                    styles.slotBadge,
                    installed && styles.slotBadgeDone,
                  ]}
                >
                  {installed ? (
                    <MaterialIcons name="check" size={14} color="#0b2b14" />
                  ) : (
                    <Text style={styles.slotBadgeText}>{slotLabel}</Text>
                  )}
                </View>
                <MaterialCommunityIcons
                  name={iconName as any}
                  size={18}
                  color={DC_COLORS.accentSoft}
                />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text style={styles.deviceName} numberOfLines={2}>
                    {device.label ?? device.id}
                  </Text>
                  <Text style={styles.deviceType} numberOfLines={1}>
                    {device.type} · {installed ? "Instalado" : `Slot ${slotLabel}`}
                  </Text>
                </View>
              </View>

              {device.ports.length > 0 ? (
                <View style={styles.portsList}>
                  <Text style={styles.portsLabel}>Portas</Text>
                  {device.ports.map((p) => (
                    <View key={p.id} style={styles.portRow}>
                      <View style={styles.portDot} />
                      <Text style={styles.portName} numberOfLines={2}>
                        <Text style={styles.portId}>{p.id}</Text>
                        {p.label ? ` — ${p.label}` : ""}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : null}
            </View>
          );
        })}
      </View>

      {/* Tabela de cabeamento */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cabeamento ponto a ponto</Text>
        <Text style={styles.sectionHint}>
          Cada linha descreve uma conexão exigida pelo cenário.
        </Text>
        {cabling.length === 0 ? (
          <Text style={styles.emptyText}>
            Este cenário não exige cabeamento adicional.
          </Text>
        ) : (
          cabling.map((row, i) => {
            const from = deviceLabel(level.inventory, row.fromDevId);
            const to = deviceLabel(level.inventory, row.toDevId);
            return (
              <View key={`cab-${i}`} style={styles.cableCard}>
                <View style={styles.cableHeader}>
                  <View
                    style={[
                      styles.cableBadge,
                      { backgroundColor: `${row.cable.color}22`, borderColor: row.cable.color },
                    ]}
                  >
                    <View
                      style={[styles.cableBadgeDot, { backgroundColor: row.cable.color }]}
                    />
                    <Text style={[styles.cableBadgeText, { color: row.cable.color }]}>
                      {row.cable.label}
                    </Text>
                  </View>
                  {row.cable.description ? (
                    <Text style={styles.cableDesc} numberOfLines={2}>
                      {row.cable.description}
                    </Text>
                  ) : null}
                </View>

                <View style={styles.endpointRow}>
                  <MaterialCommunityIcons
                    name={from.iconName as any}
                    size={16}
                    color={DC_COLORS.textSecondary}
                  />
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={styles.endpointDevice} numberOfLines={1}>
                      {from.label}
                    </Text>
                    <Text style={styles.endpointPort} numberOfLines={2}>
                      Porta: <Text style={styles.endpointPortId}>{row.fromPortId}</Text>
                      {row.fromPortLabel && row.fromPortLabel !== row.fromPortId
                        ? ` — ${row.fromPortLabel}`
                        : ""}
                    </Text>
                  </View>
                </View>

                <View style={styles.arrowRow}>
                  <MaterialIcons
                    name="south"
                    size={16}
                    color={DC_COLORS.textFaint}
                  />
                </View>

                <View style={styles.endpointRow}>
                  <MaterialCommunityIcons
                    name={to.iconName as any}
                    size={16}
                    color={DC_COLORS.textSecondary}
                  />
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={styles.endpointDevice} numberOfLines={1}>
                      {to.label}
                    </Text>
                    <Text style={styles.endpointPort} numberOfLines={2}>
                      Porta: <Text style={styles.endpointPortId}>{row.toPortId}</Text>
                      {row.toPortLabel && row.toPortLabel !== row.toPortId
                        ? ` — ${row.toPortLabel}`
                        : ""}
                    </Text>
                  </View>
                </View>

                {row.note ? (
                  <View style={styles.noteRow}>
                    <MaterialIcons
                      name="info-outline"
                      size={13}
                      color={DC_COLORS.info}
                    />
                    <Text style={styles.noteText}>{row.note}</Text>
                  </View>
                ) : null}
              </View>
            );
          })
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: DC_COLORS.bgPanel,
    borderRadius: DC_RADII.lg,
    borderWidth: 1,
    borderColor: DC_COLORS.borderMuted,
    padding: 12,
    gap: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 2,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: DC_COLORS.borderSubtle,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: DC_COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 16,
    color: DC_COLORS.textSecondary,
    marginTop: 2,
  },
  progressPill: {
    backgroundColor: DC_COLORS.bgSurfaceHover,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: DC_COLORS.borderMuted,
  },
  progressPillText: {
    fontSize: 12,
    fontWeight: "700",
    color: DC_COLORS.textPrimary,
  },

  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: DC_COLORS.textPrimary,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  sectionHint: {
    fontSize: 11,
    lineHeight: 15,
    color: DC_COLORS.textMuted,
    marginTop: -4,
    marginBottom: 2,
  },

  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingVertical: 4,
  },
  stepBadge: {
    width: 22,
    height: 22,
    borderRadius: 999,
    backgroundColor: DC_COLORS.bgSurfaceHover,
    borderWidth: 1,
    borderColor: DC_COLORS.borderMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  stepBadgeText: {
    fontSize: 12,
    fontWeight: "800",
    color: DC_COLORS.textPrimary,
  },
  stepText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
    color: DC_COLORS.textSecondary,
  },

  deviceCard: {
    backgroundColor: DC_COLORS.bgSurface,
    borderRadius: DC_RADII.md,
    borderWidth: 1,
    borderColor: DC_COLORS.borderMuted,
    padding: 10,
    gap: 8,
  },
  deviceCardDone: {
    borderColor: "#2f9e5c",
    backgroundColor: "rgba(47, 158, 92, 0.08)",
  },
  deviceCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  slotBadge: {
    minWidth: 36,
    height: 22,
    paddingHorizontal: 8,
    borderRadius: 999,
    backgroundColor: DC_COLORS.bgSurfaceHover,
    borderWidth: 1,
    borderColor: DC_COLORS.borderMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  slotBadgeDone: {
    backgroundColor: "#4ade80",
    borderColor: "#4ade80",
  },
  slotBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: DC_COLORS.textPrimary,
    letterSpacing: 0.3,
  },
  deviceName: {
    fontSize: 13,
    fontWeight: "700",
    color: DC_COLORS.textPrimary,
    lineHeight: 17,
  },
  deviceType: {
    fontSize: 11,
    color: DC_COLORS.textMuted,
    marginTop: 1,
  },
  portsList: {
    gap: 4,
    paddingLeft: 2,
  },
  portsLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: DC_COLORS.textMuted,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  portRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    paddingVertical: 2,
  },
  portDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: DC_COLORS.accentSoft,
    marginTop: 6,
  },
  portName: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
    color: DC_COLORS.textSecondary,
  },
  portId: {
    fontFamily: "Menlo",
    fontWeight: "700",
    color: DC_COLORS.textPrimary,
  },

  cableCard: {
    backgroundColor: DC_COLORS.bgSurface,
    borderRadius: DC_RADII.md,
    borderWidth: 1,
    borderColor: DC_COLORS.borderMuted,
    padding: 10,
    gap: 8,
  },
  cableHeader: {
    gap: 4,
  },
  cableBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1,
  },
  cableBadgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  cableBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  cableDesc: {
    fontSize: 11,
    lineHeight: 15,
    color: DC_COLORS.textMuted,
  },
  endpointRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  endpointDevice: {
    fontSize: 12,
    fontWeight: "700",
    color: DC_COLORS.textPrimary,
  },
  endpointPort: {
    fontSize: 11,
    lineHeight: 15,
    color: DC_COLORS.textSecondary,
    marginTop: 1,
  },
  endpointPortId: {
    fontFamily: "Menlo",
    fontWeight: "700",
    color: DC_COLORS.textPrimary,
  },
  arrowRow: {
    alignItems: "center",
    paddingVertical: 2,
  },
  noteRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: DC_COLORS.borderSubtle,
  },
  noteText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 15,
    color: DC_COLORS.textSecondary,
    fontStyle: "italic",
  },
  emptyText: {
    fontSize: 12,
    color: DC_COLORS.textMuted,
    fontStyle: "italic",
  },
});
