import React from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import NavBar from './components/NavBar';
import Herotext from './components/Herotext';
import Hero from './components/Hero';

gsap.registerPlugin(ScrollTrigger,ScrollSmoother,SplitText);

const App = () => {
  return (
    <div>
      <NavBar/>
      <Hero/>
    </div>
  )
}

export default App
