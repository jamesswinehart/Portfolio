import type { Metadata } from "next";
import ConnectionsGame from "@/components/games/connections/ConnectionsGame";
import { oct26ConnectionsPuzzle } from "@/components/games/connections/puzzles/oct-26-connections";

export const metadata: Metadata = {
  title: "Connections | James Swinehart",
  description: "A Princeton Alumni Weekly word grouping game.",
};

export default function Oct26ConnectionsPage() {
  return (
    <div
      className="fixed inset-0 overflow-y-auto overscroll-contain flex items-start justify-center"
      style={{ backgroundColor: "#f37021" }}
    >
      <ConnectionsGame puzzle={oct26ConnectionsPuzzle} />
    </div>
  );
}
