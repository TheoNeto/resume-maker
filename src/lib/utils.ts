import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sectionIsEmpty = (section: string, data: any) => {
  if (!data) return true;

  const value = data[section];

  if (value === undefined || value === null) return true;

  if (Array.isArray(value)) return value.length === 0;

  if (typeof value === "string") {
    const stripped = value.replace(/<[^>]*>/g, "").trim();
    return stripped.length === 0;
  }

  if (typeof value === "object") {
    const keys = Object.keys(value);
    if (keys.length === 0) return true;

    return keys.every((k) => {
      const v = (value as any)[k];
      if (v === undefined || v === null) return true;
      if (Array.isArray(v)) return v.length === 0;
      if (typeof v === "string")
        return v.replace(/<[^>]*>/g, "").trim().length === 0;
      if (typeof v === "object") return Object.keys(v).length === 0;
      return false;
    });
  }

  return false;
};
