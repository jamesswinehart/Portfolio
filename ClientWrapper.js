"use client";

export default function ClientWrapper({ children }) {
  return (
    // <div
    //   className="absolute"
    //   style={{
    //     boxShadow: "inset 0px 0px 25px 25px red",
    //   }}
    //   >
    <div
      className="absolute border border-dashed border-blue-300"
      style={{
        width: "calc(100vw / 1.6)",
        height: "calc(100vh / 1.6)",
        top: "calc((100vh - (100vh / 1.6)) / 2)",
        left: "calc((100vw - (100vw / 1.6)) / 2)",
        overflow: "hidden",
        boxShadow: "inset 0px 0px 25px 25px white",
        zIndex: "1"
      }}
    >
      {/* Header Text */}
      <div
        className="absolute text-[40px] leading-none bg-[#F5F5F7]"
        style={{
          width: "343px",
          height: "64px",
          top: "-4px",
          left: 0,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "left",
          zIndex: "2"
        }}
      >
        James Swinehart
      </div>

      {/* About Button */}
      <div
        className="absolute text-[25px] leading-none font-medium bg-[#F5F5F7] cursor-pointer"
        style={{
          width: "80px",
          height: "64px",
          top: "-10px",
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
        }}
        onClick={() => {
          const section = document.getElementById("about");
          section?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        About
      </div>

      {/* Expandable Sidebar */}
      {(() => {
        // Sidebar expand/collapse logic
        const React = require("react");
        const { useState } = React;
        function SidebarWithMenu() {
          const [expanded, setExpanded] = useState({
            everything: false,
            everywhere: false,
            everyone: false
          });
          const toggle = (section) => {
            setExpanded(prev => ({
              ...prev,
              [section]: !prev[section]
            }));
          };

          return (
            <div
              className="absolute flex flex-col items-start bg-[#F5F5F7]"
              style={{
                top: "calc((100vh - (100vh / 2)) / 2)",
                bottom: 0,
                left: 0,
                width: "160px",
                overflowY: "auto",
              }}
            >
              <div className="mt-8 flex flex-col w-full space-y-4">
                <button className="text-left w-full text-[25px]" onClick={() => toggle("everything")}>
                  Everything +
                </button>
                {expanded.everything && (
                  <div className="pl-2 text-[16px] space-y-1">
                    <div className="cursor-pointer" onClick={() => {
                      const section = document.getElementById("cv");
                      section?.scrollIntoView({ behavior: "smooth" });
                    }}>CV</div>
                    <div>LinkedIn</div>
                    <div>Projects</div>
                  </div>
                )}

                <button className="text-left w-full text-[25px]" onClick={() => toggle("everywhere")}>
                  Everywhere +
                </button>
                {expanded.everywhere && (
                  <div className="pl-2 text-[16px] space-y-1">
                    <div>Map</div>
                    <div>Blog</div>
                  </div>
                )}

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
        return <SidebarWithMenu />;
      })()}

      {/* Scrollable Content Outer Wrapper */}
      <div
        className="absolute relative"
        style={{
          top: "64px",
          left: "176px",
          width: "calc(100vw / 1.6 - 176px)",
          height: "calc(100vh / 1.6 - 64px)"
        }}
      >
        {/* Scrollable content underneath the shadow */}
        <div
          className="relative z-0 overflow-y-scroll p-4 text-[#1D1D1F] bg-transparent"
          style={{ height: "100%", width: "100%" }}
        >
          <section id="about">
            <h2 className="text-2xl font-semibold mb-4">About</h2>
            <p>This is the About section content.</p>
          </section>

          <section id="cv">
            <h2 className="text-2xl font-semibold mb-4">CV</h2>
            <p>This is the CV section content.</p>
          </section>

          <section id="art">
            <h2 className="text-2xl font-semibold mb-4">Art</h2>
            <p style={{ paddingBottom: "400px" }}>This is the Art section content.</p>
          </section>

          <section id="art">
            <h2 className="text-2xl font-semibold mb-4">Art</h2>
            <p style={{ paddingBottom: "400px" }}>This is the Art section content.</p>
          </section>

          <section id="art">
            <h2 className="text-2xl font-semibold mb-4">Art</h2>
            <p style={{ paddingBottom: "400px" }}>This is the Art section content.</p>
          </section>

          <section id="art">
            <h2 className="text-2xl font-semibold mb-4">Art</h2>
            <p style={{ paddingBottom: "400px" }}>This is the Art section content.</p>
          </section>

          <section id="art">
            <h2 className="text-2xl font-semibold mb-4">Art</h2>
            <p style={{ paddingBottom: "400px" }}>This is the Art section content.</p>
          </section>

          <section id="art">
            <h2 className="text-2xl font-semibold mb-4">Art</h2>
            <p style={{ paddingBottom: "400px" }}>This is the Art section content.</p>
          </section>

          <section id="art">
            <h2 className="text-2xl font-semibold mb-4">Art</h2>
            <p style={{ paddingBottom: "400px" }}>This is the Art section content.</p>
          </section>

          <section id="art">
            <h2 className="text-2xl font-semibold mb-4">Art</h2>
            <p style={{ paddingBottom: "400px" }}>This is the Art section content.</p>
          </section>
        </div>
        {/* Top fade */}
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-24 z-50"
          style={{
            background: "linear-gradient(to bottom, #f5f5f7, transparent)"
          }}
        />

        {/* Bottom fade */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 z-50"
          style={{
            background: "linear-gradient(to top, #f5f5f7, transparent)"
          }}
        />

        {/* Left fade */}
        <div
          className="pointer-events-none absolute top-0 bottom-0 left-0 w-24 z-50"
          style={{
            background: "linear-gradient(to right, #f5f5f7, transparent)"
          }}
        />

        {/* Right fade */}
        <div
          className="pointer-events-none absolute top-0 bottom-0 right-0 w-24 z-50"
          style={{
            background: "linear-gradient(to left, #f5f5f7, transparent)"
          }}
        />
      </div>
    </div>
    // </div>
  );
}