import Section from "../Section";

export default function Writing() {
  const articles = [
    {
      title: "Walk-On Tradition Helps Keep Rowing Teams Afloat",
      source: "Princeton Alumni Weekly",
      url: "https://paw.princeton.edu/article/walk-tradition-helps-keep-rowing-teams-afloat",
    },
    {
      title: "A Behind-The-Scenes View of Managing Princeton Reunions",
      source: "Princeton Alumni Weekly",
      url: "https://paw.princeton.edu/article/behind-scenes-view-managing-princeton-reunions",
    },
    {
      title: "A Lighter View of Bicker?",
      source: "Princeton Alumni Weekly",
      url: "https://paw.princeton.edu/article/lighter-view-bicker-maybe-eating-club-culture-should-chill-out",
    },
    {
      title: "Campus Life Is Alive and Well — and Running on Chicken Tenders",
      source: "Princeton Alumni Weekly",
      url: "https://paw.princeton.edu/article/campus-life-alive-and-well-and-running-chicken-tenders",
    },
    {
      title:
        "Protecting the First Amendment in Stopping Cop City: Unconstitutional Overbreadth in Georgia’s RICO Laws",
      source: "Princeton Legal Journal",
      url: "https://legaljournal.princeton.edu/protecting-the-first-amendment-in-stopping-cop-city-unconstitutional-overbreadth-in-georgias-rico-laws/",
    },
  ];

  return (
    <Section id="writing" title="Everything I've Written">
      {articles.map((article) => (
        <div key={article.title}>
          <h3>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </h3>
          <p><em>{article.source}</em></p>
        </div>
      ))}
    </Section>
  );
}