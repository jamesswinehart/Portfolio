"use client";

import { useState } from "react";

export default function Sidebar() {
  const [expanded, setExpanded] = useState({
    everything: false,
    everywhere: false,
    everyone: false,
  });

  const toggle = (section: keyof typeof expanded) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div
      className="absolute flex flex-col items-start bg-[var(--background)]"
      style={{
        top: "calc((100vh - (100vh / 2)) / 2)",
        bottom: 0,
        left: 0,
        width: "160px",
        overflowY: "auto",
      }}
    >
      <div className="mt-8 flex flex-col w-full space-y-4">
        {/* Everything */}
        <button className="text-left w-full text-[25px]" onClick={() => toggle("everything")}>
          Everything +
        </button>
        {expanded.everything && (
          <div className="pl-2 text-[16px] space-y-1">
            <div
              className="cursor-pointer"
              onClick={() => document.getElementById("cv")?.scrollIntoView({ behavior: "smooth" })}
            >
              CV
            </div>
            <div>LinkedIn</div>
            <div>Projects</div>
          </div>
        )}

        {/* Everywhere */}
        <button className="text-left w-full text-[25px]" onClick={() => toggle("everywhere")}>
          Everywhere +
        </button>
        {expanded.everywhere && (
          <div className="pl-2 text-[16px] space-y-1">
            <div>Map</div>
            <div>Blog</div>
          </div>
        )}

        {/* Everyone */}
        <button className="text-left w-full text-[25px]" onClick={() => toggle("everyone")}>
          Everyone +
        </button>
        {expanded.everyone && (
          <div className="pl-2 text-[16px] space-y-1">
            <div>Collaborators</div>
            <div>Press</div>
          </div>
        )}
      </div>
    </div>
  );
}