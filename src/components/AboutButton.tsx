export default function AboutButton() {
  const scrollToAbout = () => {
    const section = document.getElementById("about");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="about-button" onClick={scrollToAbout}>
      About
    </div>
  );
}