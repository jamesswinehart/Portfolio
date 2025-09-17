import Section from "../Section";
import Image from "next/image";
import linkedinIcon from "../../../assets/images/linkedin.svg";

export default function ContactMe() {
  return (
    <Section id="contactme" title="Me">
      <p>Looking forward to hearing from you!</p>
      <p>Email me: <a href="mailto:contact@jamesswineh.art" style={{textDecoration: 'underline', fontWeight: 600}}>contact@jamesswineh.art</a></p>
      <p>
        <a href="https://www.linkedin.com/in/jamesswinehart/" target="_blank" rel="noopener noreferrer">
          <Image 
            src={linkedinIcon} 
            alt="LinkedIn" 
            width={32} 
            height={32}
            className="linkedin-icon"
            style={{display: 'inline-block', verticalAlign: 'middle'}}
          />
        </a>
      </p>
      <br></br>
      <br></br>
      <br></br>
      <p>Portfolio created with love by James Swinehart</p>
    </Section>
  );
}