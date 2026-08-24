import React from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import NavBar from './components/NavBar';

gsap.registerPlugin(ScrollTrigger,ScrollSmoother,SplitText);

const App = () => {
  return (
    <div>
      <NavBar/>
    </div>
  )
}

export default App
