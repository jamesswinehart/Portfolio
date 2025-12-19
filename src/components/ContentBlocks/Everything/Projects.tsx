import Section from "../Section";
import PhotoGallery from "../../PhotoGallery";
import knowbody1 from "../../../assets/images/knowbody/knowbody1.png";
import knowbody2 from "../../../assets/images/knowbody/knowbody2.png";
import knowbody3 from "../../../assets/images/knowbody/knowbody3.png";
import knowbody4 from "../../../assets/images/knowbody/knowbody4.png";
import avaline1 from "../../../assets/images/avaline/avaline-1.png";
import avaline2 from "../../../assets/images/avaline/avaline-2.png";
import avaline3 from "../../../assets/images/avaline/avaline-3.png";
import avaline4 from "../../../assets/images/avaline/avaline-4.png";
import avaline5 from "../../../assets/images/avaline/avaline-5.png";
import foodwaste1 from "../../../assets/images/foodwastescore/welcome.png";
import foodwaste2 from "../../../assets/images/foodwastescore/dishselector.png";
import foodwaste3 from "../../../assets/images/foodwastescore/score.png";
import foodwaste4 from "../../../assets/images/foodwastescore/leaderboard.png";
import beliCrawl1 from "../../../assets/images/beliCrawl/beliCrawl1.png";
import beliCrawl2 from "../../../assets/images/beliCrawl/beliCrawl2.png";
import beliCrawl3 from "../../../assets/images/beliCrawl/beliCrawl3.png";
import beliCrawl4 from "../../../assets/images/beliCrawl/beliCrawl4.png";


export default function Projects() {
  // Placeholder project data - replace with real projects later
  const knowbodyProject = [
    { id: 1, title: "Knowbody Feed", image: knowbody1 },
    { id: 2, title: "Knowbody Create", image: knowbody2 },
    { id: 3, title: "Knowbody Profile", image: knowbody3 },
    { id: 4, title: "Knowbody Settings", image: knowbody4 },
  ];

  const avalineProject = [
    { id: 1, title: "Avaline Chat", image: avaline1},
    { id: 2, title: "Avaline Stats", image: avaline2},
    { id: 3, title: "Avaline Graph", image: avaline3},
    { id: 4, title: "Avaline Newsletter", image: avaline4},
    { id: 5, title: "Avaline Spain", image: avaline5},
  ];

  const foodWasteProject = [
    { id: 1, title: "Food Waste Score Demo Video", videoUrl: "https://www.youtube.com/embed/ai6lbQktfEg"},
    { id: 2, title: "Welcome Screen", image: foodwaste1},
    { id: 3, title: "Dish Selector", image: foodwaste2},
    { id: 4, title: "Score Display", image: foodwaste3},
    { id: 5, title: "Leaderboard", image: foodwaste4},
  ];

  const beliCrawlProject = [
    { id: 1, title: "Beli Crawl", image: beliCrawl1},
    { id: 2, title: "Beli Crawl", image: beliCrawl2},
    { id: 3, title: "Beli Crawl", image: beliCrawl3},
    { id: 4, title: "Beli Crawl", image: beliCrawl4},
  ];

  return (
    <Section id="projects" title="Everything I've Developed">
      <p>My projects are inspired by the intersection of tech and creativity. My work tends to play around with fun ideas, design-obsessed interfaces, and interactive experiences.</p>
      <p>I design through building, moving beyond prototyping and actually implementing ideas to showcase real, functional interactions that test how people actually engage with my technology.</p>
      <p>I&apos;m super interested in HCI, AI, and hospitality techn. Feel free to check out some of my work below. You can also visit my Github <a href="https://github.com/jamesswinehart" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'underline', fontWeight: 600}}>here.</a></p>
      <br></br>

      <h3>The Food Waste Score</h3>
      <PhotoGallery items={foodWasteProject} />
      <p>The Food Waste Score (FWS) is an HCI-driven system designed to gamify sustainable dining through real-time feedback on plate waste. It calculates a dynamic &quot;waste score,&quot; similar to Whoop&apos;s &quot;recovery score&quot; or Garmin&apos;s &quot;body battery,&quot; to encourage more mindful eating in university dining halls.</p>
      <p>The project integrates behavioral insights from human-computer interaction to make sustainability measurable and motivating. Piloted at Princeton as a research project, FWS demonstrates how &quot;score feedback&quot; can reduce food waste and encourage more sustainable dining choices.</p>
      <p>You can read the in-review research paper <a href="/Team%204%20-%20Final%20Paper.pdf" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'underline', fontWeight: 600}}>here.</a></p>
      <br></br>

      <h3>Beli Crawl</h3>
      <PhotoGallery items={beliCrawlProject} />
      <p>Beli Crawl is an app that helps users turn their saved and recommended restaurants from my favorite app, Beli, into a curated neighborhood “crawl.” It aggregates restaurants across Beli’s Want to Try and Recs into a single flow, then generates a shareable Google Maps walking route, making it easy to plan and share a full day of eating in one place. Built as a proof of concept using my own Princeton and New York data, Beli Crawl explores how Beli could support more intentional, social, and place-based food discovery. You can try it <a href="https://belicrawl.vercel.app" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'underline', fontWeight: 600}}>here.</a></p>
      <br></br>

      <h3>KnowBody</h3>
      <PhotoGallery items={knowbodyProject} />
      <p>KnowBody is a full-stack, HIPAA-compliant iOS app built with Swift and Firebase. It functions like a social network for physicians, allowing primary care doctors to instantly ping local specialists for free, on-demand medical advice.</p>
      <p>The app was made in collaboration with MercyMed of Columbus, a non-profit healthcare clinic providing high-quality, low-cost healthcare to the underserved. The project is currently in development and moving toward official, legal recognition as a secure medical platform.</p>
      <br></br>

      <h3>Avaline</h3>
      <PhotoGallery items={avalineProject} />
      <p>Avaline is a concert ticket web-scraper built with React that pulled live data from StubHub and SeatGeek to deliver real-time updates, price tracking, and AI-powered purchasing advice. It helped me and dozens of other Oasis fans secure tickets to the band&apos;s East Rutherford reunion concert.</p>
      <p>With the show now behind us, Avaline&apos;s price-tracking features have gone quiet. But the app allowed me to attend the concert (which was awesome), and you can still chat with the British AI assistant Avaline <a href="https://avaline.vercel.app" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'underline', fontWeight: 600}}>here.</a></p>
      <br></br>

    </Section>
  );
}