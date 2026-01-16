import Section from "../Section";
import PhotoGallery from "../../PhotoGallery";
import app1 from "../../../assets/images/marketing/app/one.png";
import app2 from "../../../assets/images/marketing/app/two.png";
import app3 from "../../../assets/images/marketing/app/three.png";
import app4 from "../../../assets/images/marketing/app/four.png";
import print1 from "../../../assets/images/marketing/print/2.png";
import print2 from "../../../assets/images/marketing/print/3.png";
import print3 from "../../../assets/images/marketing/print/5.png";
import print4 from "../../../assets/images/marketing/print/1.png";
import print5 from "../../../assets/images/marketing/print/4.png";

export default function Marketing() {
  const dailyPrincetonianApp = [
    { id: 1, title: "Daily Princetonian App 1", image: app1 },
    { id: 2, title: "Daily Princetonian App 2", image: app2 },
    { id: 3, title: "Daily Princetonian App 3", image: app3 },
    { id: 4, title: "Daily Princetonian App 4", image: app4 },
  ];

  const dailyPrincetonianPrint = [
    { id: 1, title: "Daily Princetonian Print 1", image: print1 },
    { id: 2, title: "Daily Princetonian Print 2", image: print2 },
    { id: 3, title: "Daily Princetonian Print 3", image: print3 },
    { id: 4, title: "Daily Princetonian Print 4", image: print4 },
    { id: 5, title: "Daily Princetonian Print 5", image: print5 },
  ];

  return (
    <Section id="marketing" title="Everything I've Marketed">
      <p>My marketing draws inspiration from some of the best campaigns of our time and places a strong emphasis on visual storytelling and homemade assets. My campaigns have boosted revenue and reached audiences of hundreds of thousands. I place a strong emphasis on simplified aesthetics, sophisticated typography, and a well-designed and clearly-communicated story.</p>
      <br></br>

      <h3>The Daily Princetonian App</h3>
      <PhotoGallery items={dailyPrincetonianApp} className="gallery-large" />
      <p>The Daily Princetonian App allows users to find out what's for lunch, where the best parties are, and what's happening Princeton's campus at large. My campaign for this app took inspiration from early Apple campaigns. Like the firm once promoted, simplicity remains the ultimate sophistication.</p>
      <br></br>

      <h3>The Daily Princetonian Print Subscriptions</h3>
      <PhotoGallery items={dailyPrincetonianPrint} className="gallery-large" />
      <p>Inspired by 1990s Wall Street Journal ads, this campaign for The Daily Princetonian used a simple, elegant, retro approach to promote print journalism in the digital age. The campaign increased print subscriptions by 40%—a rare feat in the 21st century. What's old is new again!</p>
      <br></br>

    </Section>
  );
}

