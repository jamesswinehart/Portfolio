import type { Metadata } from "next";
import ConnectionsGame from "@/components/games/connections/ConnectionsGame";
import { nov26ConnectionsPuzzle } from "@/components/games/connections/puzzles/nov-26-connections";

export const metadata: Metadata = {
  title: "Connectegories | James Swinehart",
  description: "A Princeton Alumni Weekly word grouping game.",
};

export default function Nov26ConnectionsPage() {
  return (
    <div
      className="fixed inset-0 overflow-hidden flex items-start justify-center"
      style={{ backgroundColor: "#f37021" }}
    >
      <ConnectionsGame puzzle={nov26ConnectionsPuzzle} />
    </div>
  );
}
