import type { Metadata } from "next";
import ConnectionsGame from "@/components/games/connections/ConnectionsGame";

export const metadata: Metadata = {
  title: "Connections | James Swinehart",
  description: "A Princeton Alumni Weekly word grouping game.",
};

export default function ConnectionsPage() {
  return (
    <div
      className="fixed inset-0 overflow-y-auto overscroll-contain flex items-start justify-center"
      style={{ backgroundColor: "#f37021" }}
    >
      <ConnectionsGame />
    </div>
  );
}
