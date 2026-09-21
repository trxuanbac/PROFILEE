export const social = [
  { url: "mailto:Bxuan964@gmail.com", name: "mail" },
  { url: "https://github.com/trxuanbac", name: "github" },
] as const satisfies { url: string; name: "mail" | "github" | "instagram" | "linkedin" | "x" }[];
