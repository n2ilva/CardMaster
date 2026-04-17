export type CableType = 'ethernet' | 'fiber' | 'coaxial';

export type Cable = {
  id: string;
  type: CableType;
  speed: string;
};

export type DevicePort = string;

export type InventoryDevice = {
  id: string;
  type: string;
  ports: DevicePort[];
};

export type RequiredConnection = {
  from: string; // "device.port"
  to: string;   // "device.port"
  cable: string; // cable id
};

export type DataCenterLevel = {
  id: number;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  inventory: InventoryDevice[];
  connections_required: RequiredConnection[];
  rules?: string[];
};

export type DataCenterData = {
  game: {
    name: string;
    version: string;
  };
  cables: Cable[];
  levels: DataCenterLevel[];
};

export type ActiveConnection = {
  id: string;
  from: { deviceId: string; port: string };
  to: { deviceId: string; port: string } | null;
  cableId: string;
};
