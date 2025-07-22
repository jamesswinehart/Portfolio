"use client";

export default function ContentWindow() {
  return (
    <div className="scroll-frame">
      {/* Scrollable content */}
      <div className="scroll-content">
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

        {/* ...more sections here */}
      </div>

      {/* Fade overlays */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-24 z-50"
        style={{ background: "linear-gradient(to bottom, #f5f5f7, transparent)" }} />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 z-50"
        style={{ background: "linear-gradient(to top, #f5f5f7, transparent)" }} />
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-24 z-50"
        style={{ background: "linear-gradient(to right, #f5f5f7, transparent)" }} />
      <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-24 z-50"
        style={{ background: "linear-gradient(to left, #f5f5f7, transparent)" }} />
    </div>
  );
}