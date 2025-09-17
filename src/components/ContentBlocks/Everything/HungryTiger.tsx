import Section from "../Section";
import Image from "next/image";

export default function HungryTiger() {
  return (
    <Section id="hungrytiger" title="Everything I've Eaten (with My Best Friend)">
      <p>One cold December night, Alistair Wright and I were sitting at The Dinky Bar and Grill preparing for our first finals week of college when we came up with the idea for The Hungry Tiger.</p>
              <p>The Hungry Tiger is a Princeton-based food media brand showcasing the restaurants, people, and events that shape both Princeton&apos;s food culture and the cuisines we encounter while traveling. We strive to promote local restaurants, uncover unique food stories, and spotlight those who make sure we never go hungry. Give it a watch <a href="https://www.instagram.com/the.hungry.tiger/?hl=en" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'underline', fontWeight: 600}}>here!</a></p>
      <Image 
        src="/images/hungrytigerlogo.png" 
        alt="The Hungry Tiger Logo" 
        className="hungry-tiger-logo"
        width={200}
        height={150}
        style={{marginTop: '20px', maxWidth: '25%', height: 'auto'}} 
      />
    </Section>
  );
}