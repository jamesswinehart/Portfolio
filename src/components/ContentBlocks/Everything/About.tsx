import Section from "../Section";
import Image from "next/image";
import signatureImage from "../../../assets/images/signature-final.png";

export default function About() {
  return (
    <Section id="about" title="Pleasure to meet you!">
      <p>I&apos;m James, a student at Princeton studying Computer Science and English, originally from Columbus, Georgia.</p>
      <p>At my core, I am a creator. I believe in building things that are just as beautiful in form as they are powerful in function. I love envisioning what could exist, and I work to make those ideas real — whether that be a story, a brand, a business, or an app.</p>
      <p>Feel free to explore this site to learn about everything, everywhere, and everyone that has shaped what I do, where I&apos;ve been, and who I am. And if you&apos;d like to ask any questions, work with me, or just chat, I would love for you to reach out! Feel free to contact me here.</p>
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