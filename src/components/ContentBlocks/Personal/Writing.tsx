import Section from "../Section";
import PhotoGallery from "../../PhotoGallery";
import rowingImage from "../../../assets/writing/OTC_Student Dispatch Rowing.jpg";
import reunionsImage from "../../../assets/writing/OTC_Studetn Dispatch Working Reunions.jpg";
import chickenTendersImage from "../../../assets/writing/OTC_Student Dispatch Late Meal.jpg";
import bickerImage from "../../../assets/writing/MicrosoftTeams-image (36).png";
import placeholderImage from "../../../assets/writing/Georgia-state-capitol-dome.jpg";

export default function Writing() {
  const writingItems = [
    {
      id: 1,
      title: "Walk-On Tradition Helps Keep Rowing Teams Afloat",
      image: rowingImage,
      url: "https://paw.princeton.edu/article/walk-tradition-helps-keep-rowing-teams-afloat",
      source: "Princeton Alumni Weekly",
    },
    {
      id: 2,
      title: "A Behind-the-Scenes View of Managing Princeton Reunions",
      image: reunionsImage,
      url: "https://paw.princeton.edu/article/behind-scenes-view-managing-princeton-reunions",
      source: "Princeton Alumni Weekly",
    },
    {
      id: 3,
      title: "A Lighter View of Bicker?",
      image: bickerImage,
      url: "https://paw.princeton.edu/article/lighter-view-bicker-maybe-eating-club-culture-should-chill-out",
      source: "Princeton Alumni Weekly",
    },
    {
      id: 4,
      title: "Campus Life Is Alive and Well — and Running on Chicken Tenders",
      image: chickenTendersImage,
      url: "https://paw.princeton.edu/article/campus-life-alive-and-well-and-running-chicken-tenders",
      source: "Princeton Alumni Weekly",
    },
    {
      id: 5,
      title: "Protecting the First Amendment in Stopping Cop City: Unconstitutional Overbreadth in Georgia's RICO Laws",
      image: placeholderImage,
      url: "https://legaljournal.princeton.edu/protecting-the-first-amendment-in-stopping-cop-city-unconstitutional-overbreadth-in-georgias-rico-laws/",
      source: "Princeton Legal Journal",
    },
  ];

  return (
    <Section id="writing" title="Everything I've Written">
      <PhotoGallery items={writingItems} className="gallery-medium" showCaptions={true} />
    </Section>
  );
}