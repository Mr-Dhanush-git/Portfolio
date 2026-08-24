import React, { useEffect, useState } from 'react'
import { navLinks, roles, resumeLink } from '../../constants'

const NavBar = () => {
  const [phase, setPhase] = useState("forward");
  const [roleIndex, setRoleIndex] = useState(0);

useEffect(() => {
  let delay;

  if (phase === "forward" || phase === "pauseAtEnd") {
    delay = 3000;
  } else if (phase === "reverse") {
    delay = 1000 / (roles.length - 1);
  } else if (phase === "pauseAtStart") {
    delay = 3000;
  }

  const timer = setTimeout(() => {
    if (phase === "forward") {
      setRoleIndex((prev) => {
        const next = prev + 1;

        if (next === roles.length - 1) {
          setPhase("pauseAtEnd");
        }

        return next;
      });
    }

    else if (phase === "pauseAtEnd") {
      setPhase("reverse");
    }

    else if (phase === "reverse") {
      setRoleIndex((prev) => {
        const next = prev - 1;

        if (next === 0) {
          setPhase("pauseAtStart");
        }

        return next;
      });
    }

    else if (phase === "pauseAtStart") {
      setPhase("forward");
    }
  }, delay);

  return () => clearTimeout(timer);
}, [phase, roleIndex]);



  return (
    <nav>
      <div>
        <a href="#home" className=''>
          <p>
            Dhanush <span>• {roles[roleIndex]}</span>
          </p>
        </a>
      </div>

      <div>
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={`${link.href}`}>{link.name}</a>
            </li>
          ))}
        </ul>
      </div>

        <a href={resumeLink.href}>
          {resumeLink.name}
        </a>

    </nav>
  )
}

export default NavBar
