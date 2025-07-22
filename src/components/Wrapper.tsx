"use client";

import Header from "./Header";
import AboutButton from "./AboutButton";
import Sidebar from "./Sidebar";
import ContentWindow from "./ContentWindow";

export default function Wrapper() {
  return (
    <div className="wrapper">
      <Header />
      <AboutButton />
      <Sidebar />
      <ContentWindow />
    </div>
  );
}