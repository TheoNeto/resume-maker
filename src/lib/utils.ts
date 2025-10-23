import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import colors from "tailwindcss/colors";
import tailwindConfig from "../../tailwind.config";

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

export const formatTailwindHTML = (
  html: string,
  scructure: ResumeStructureData
) => {
  const colorKey = scructure.colorTheme as keyof typeof colors;
  return `
    <html>
       <heade>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = ${JSON.stringify(tailwindConfig)};
            document.documentElement.style.setProperty(
              "--resume-primary",
              "${colors[colorKey][500]}"
            );
        </script>
       </heade>

       <body>
          ${html}
       </body>
    </html>
  `;
};
