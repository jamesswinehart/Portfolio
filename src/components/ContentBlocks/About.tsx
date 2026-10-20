import Section from "./Section";
import Image from "next/image";
import signatureImage from "../../assets/images/signature-final.png";

export default function About() {
  return (
    <Section id="about" title="Pleasure to meet you!">
      <p>I&apos;m James (you can call me Jimmy) and I&apos;m a student at Princeton studying Computer Science and English, originally from Columbus, Georgia.</p>
      <p>At my core, I am a creator. I believe in building things that are just as beautiful in form as they are powerful in function. I love envisioning what could exist, and I work to make those ideas real — whether that be a story, a brand, a business, or an app.</p>
      <p>Take a look around at my projects and the personal work that keeps me curious. If you&apos;d like to work together or just chat, I&apos;d love to hear from you on <a href="https://www.linkedin.com/in/jamesswinehart/" target="_blank" rel="noopener noreferrer" className="text-link">LinkedIn</a>.</p>
      <p>Looking forward to knowing you,</p>
      <Image 
        src={signatureImage} 
        alt="James's signature" 
        width={150} 
        height={60}
        style={{ marginTop: '10px', marginLeft: '-10px' }}
      />
    </Section>
  );
}