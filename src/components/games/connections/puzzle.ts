export type CategoryKey = "yellow" | "green" | "blue" | "purple";

export interface ConnectionsCategory {
  key: CategoryKey;
  title: string;
  words: string[];
}

export interface ConnectionsPuzzle {
  id: string;
  categories: ConnectionsCategory[];
}

// Placeholder puzzle — swap this out for a real one each time you publish.
export const placeholderPuzzle: ConnectionsPuzzle = {
  id: "placeholder-001",
  categories: [
    {
      key: "yellow",
      title: "KEYBOARD KEYS",
      words: ["SHIFT", "SPACE", "ENTER", "TAB"],
    },
    {
      key: "green",
      title: "___ COURT",
      words: ["BASKETBALL", "TENNIS", "FOOD", "SUPREME"],
    },
    {
      key: "blue",
      title: "SHADES OF ORANGE",
      words: ["AMBER", "RUST", "TANGERINE", "CORAL"],
    },
    {
      key: "purple",
      title: "HOMOPHONES OF NUMBERS",
      words: ["WON", "TOO", "FOR", "ATE"],
    },
  ],
};

export const categoryColors: Record<
  CategoryKey,
  { bg: string; text: string }
> = {
  yellow: { bg: "#f9df6d", text: "#000000" },
  green: { bg: "#a0c35a", text: "#000000" },
  blue: { bg: "#b0c4ef", text: "#000000" },
  purple: { bg: "#ba81c5", text: "#000000" },
};
