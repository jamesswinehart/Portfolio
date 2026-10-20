import About from "./ContentBlocks/About";
import Projects from "./ContentBlocks/Projects";
import Writing from "./ContentBlocks/Personal/Writing";
import HungryTiger from "./ContentBlocks/Personal/HungryTiger";
import Art from "./ContentBlocks/Personal/Art";

export default function ContentWindow() {
  return (
    <div className="scroll-frame">
      {/* Top fade overlay (pinned to top of content window) */}
      <div className="top-gradient" />

      <div className="scroll-content">
        <About />
        <Projects />

        {/* Personal */}
        <Writing />
        <HungryTiger />
        <Art />
      </div>
    </div>
  );
}
