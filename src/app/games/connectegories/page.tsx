import type { Metadata } from "next";
import ConnectionsGame from "@/components/games/connections/ConnectionsGame";

export const metadata: Metadata = {
  title: "Connectegories | James Swinehart",
  description: "A Princeton Alumni Weekly word grouping game.",
};

export default function ConnectionsPage() {
  return (
    <div
      className="fixed inset-0 overflow-hidden flex items-start justify-center"
      style={{ backgroundColor: "#f37021" }}
    >
      <ConnectionsGame />
    </div>
  );
}
