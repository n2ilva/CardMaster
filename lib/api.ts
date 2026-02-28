import * as Linking from "expo-linking";
import { Platform } from "react-native";

const DEFAULT_WEB_API_URL = "http://localhost:4000/api";
const DEFAULT_PRODUCTION_WEB_API_URL =
  "http://ec2-52-67-13-135.sa-east-1.compute.amazonaws.com:4000/api";
const DEFAULT_ANDROID_EMULATOR_API_URL = "http://10.0.2.2:4000/api";
const DEFAULT_IOS_SIMULATOR_API_URL = "http://localhost:4000/api";

function inferApiUrlFromExpoHost(): string | null {
  try {
    const appUrl = Linking.createURL("/");
    const parsed = Linking.parse(appUrl);
    const host = parsed.hostname;

    if (!host) {
      return null;
    }

    if (
      Platform.OS === "android" &&
      (host === "localhost" || host === "127.0.0.1")
    ) {
      return DEFAULT_ANDROID_EMULATOR_API_URL;
    }

    return `http://${host}:4000/api`;
  } catch {
    return null;
  }
}

function resolveApiBaseUrl(): string {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  if (Platform.OS === "web") {
    const isLocalWeb =
      typeof window !== "undefined" &&
      ["localhost", "127.0.0.1"].includes(window.location.hostname);

    return isLocalWeb ? DEFAULT_WEB_API_URL : DEFAULT_PRODUCTION_WEB_API_URL;
  }

  return (
    inferApiUrlFromExpoHost() ??
    (Platform.OS === "android"
      ? DEFAULT_ANDROID_EMULATOR_API_URL
      : DEFAULT_IOS_SIMULATOR_API_URL)
  );
}

export const API_BASE_URL = resolveApiBaseUrl();

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  token?: string | null;
};

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", body, token } = options;
  const url = `${API_BASE_URL}${path}`;

  let response: Response;

  try {
    response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  } catch {
    throw new Error(
      `Falha de conexão com a API (${url}). Verifique se o backend está rodando (npm run server:dev ou npm run dev).`,
    );
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message ?? `Erro na requisição (${response.status})`;
    throw new Error(message);
  }

  return data as T;
}
