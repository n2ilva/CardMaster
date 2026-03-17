import { hasDocumentation } from "@/data/documentation";

type StudyFlowContext = {
  track: string;
  category: string;
  sequence?: string[];
  index?: number;
};

type RawParam = string | string[] | undefined;

function readParamValue(value: RawParam): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export function parseStudySequence(value: RawParam): string[] {
  const rawValue = readParamValue(value);
  if (!rawValue) return [];

  try {
    const parsed = JSON.parse(decodeURIComponent(rawValue));
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

export function parseStudyIndex(value: RawParam): number | null {
  const rawValue = readParamValue(value);
  if (!rawValue) return null;

  const parsed = Number.parseInt(rawValue, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

export function buildStudyFlowQuery({
  track,
  category,
  sequence,
  index,
}: StudyFlowContext): string {
  const params = [
    `track=${encodeURIComponent(track)}`,
    `category=${encodeURIComponent(category)}`,
  ];

  if (sequence && sequence.length > 0) {
    params.push(`sequence=${encodeURIComponent(JSON.stringify(sequence))}`);
    if (typeof index === "number" && index >= 0) {
      params.push(`index=${index}`);
    }
    params.push("source=plan");
  }

  return params.join("&");
}

export function buildStudyRoute(context: StudyFlowContext): string {
  return `/study?${buildStudyFlowQuery(context)}`;
}

export function buildThemeInfoRoute(context: StudyFlowContext): string {
  return `/theme-info?${buildStudyFlowQuery(context)}`;
}

export function getPlanEntryRoute(context: StudyFlowContext): string {
  return hasDocumentation(context.track, context.category)
    ? buildThemeInfoRoute(context)
    : buildStudyRoute(context);
}

export function getNextPlanStep(
  track: string,
  sequence: string[],
  index: number | null,
) {
  if (index === null || index < 0 || index + 1 >= sequence.length) {
    return null;
  }

  const category = sequence[index + 1];
  const hasDocs = hasDocumentation(track, category);

  return {
    category,
    kind: hasDocs ? ("documentation" as const) : ("quiz" as const),
    href: hasDocs
      ? buildThemeInfoRoute({ track, category, sequence, index: index + 1 })
      : buildStudyRoute({ track, category, sequence, index: index + 1 }),
  };
}
