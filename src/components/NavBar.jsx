import React, { useEffect, useState } from 'react'
import { navLinks, roles, resumeLink, socialLinks } from '../../constants'
import gsap from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { GoArrowUpRight } from "react-icons/go";
import { GoHome } from "react-icons/go";
import { RiComputerLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";



const NavBar = () => {

  const socialMenuRef = useRef(null);
  const activePillRef = useRef(null);
  const [phase, setPhase] = useState("forward");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  const navLinksRef = useRef([]);

  useGSAP(() => {
  gsap.to(socialMenuRef.current, {
    y: isSocialOpen ? 0 : -10,
    opacity: isSocialOpen ? 1 : 0,
    duration: 0.4,
    ease: "power2.out",

    onStart: () => {
      if (isSocialOpen) {
        gsap.set(socialMenuRef.current, {
          pointerEvents: "auto",
        });
      }
    },

    onComplete: () => {
      if (!isSocialOpen) {
        gsap.set(socialMenuRef.current, {
          pointerEvents: "none",
        });
      }
    },
  });
}, {
  dependencies: [isSocialOpen],
});

useGSAP(() => {
  const activeIndex = navLinks.findIndex(
    (link) => link.href === activeLink
  );

  const activeElement = navLinksRef.current[activeIndex];
  const pill = activePillRef.current;

  if (!activeElement || !pill) return;

  const linkRect = activeElement.getBoundingClientRect();
  const navRect = pill.parentElement.getBoundingClientRect();

  gsap.to(pill, {
    left: linkRect.left - navRect.left,
    width: linkRect.width,
    duration: 0.4,
    ease: "power3.out",
  });
}, {
  dependencies: [activeLink],
});

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

    <nav className='relative flex w-full items-center justify-between px-[60px] py-[30px]'>
      <div>
        <a href="#home" className='flex items-center'>
          <p>
            <span className='font-montserrat tracking-[0.04em] text-[24px] italic'>
              Dhanush
              </span>

            <span className='p-1 text-gray-600'>
              •</span> 

            <span className='text-gray-600 font-light font-montserrat text-[18px] italic'>
              {roles[roleIndex]}
              </span>
          </p>
        </a>
      </div>


<div className="absolute left-1/2 -translate-x-1/2">
  <ul
    className="
      relative flex items-center gap-8
      overflow-hidden
      rounded-full
      border border-black/50

      bg-gradient-to-b from-white/90 via-[#e2e2e2] to-[#c7c4c4]
      px-1 py-1
      font-montserrat
      shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.08)]
    "
  >

    {/* Mirror / shine effect */}
    <div
      className="
        pointer-events-none
        absolute inset-0
        z-20
        rounded-full
        bg-gradient-to-b
        from-white/50
        via-transparent
        to-transparent
      "
    />

    {/* Moving black active pill */}
    <div
      ref={activePillRef}
      className="
        pointer-events-none
        absolute
        left-0
        top-1/2
        z-0
        h-[85%]
        -translate-y-1/2
        rounded-full
        bg-[#171717]
      "
    />

    {/* Navigation links */}
    {navLinks.map((link, index) => (
      <li
        key={link.href}
        className="relative z-30 list-none"
      >
        <a
          ref={(el) => (navLinksRef.current[index] = el)}
          href={link.href}
          onClick={() => setActiveLink(link.href)}
          className={`
            flex
            items-center
            gap-2
            rounded-full
            px-6
            py-1.5
            font-montserrat
            text-[19px]
            transition-colors
            duration-300
            font-

            ${
              activeLink === link.href
                ? "text-white"
                : "text-[#3f3f3f] hover:text-black"
            }
          `}
        >

          {/* Home */}
          {link.href === "#home" && (
            <GoHome className="shrink-0 text-[18px]" />
          )}

          {/* Projects */}
          {link.href === "#projects" && (
            <RiComputerLine className="shrink-0 text-[18px]" />
          )}

          {/* About */}
          {link.href === "#about" && (
            <CgProfile className="shrink-0 text-[18px]" />
          )}

          {/* Contact */}
          <span className={`
            ${
              link.href === "#contact"
                ? "inline"
                : "hidden md:inline"
            }
          `}>
            {link.name}
          </span>

        </a>
      </li>
    ))}

  </ul>
</div>

<div className="relative flex items-center gap-4 font-montserrat text-[19px] italic">

  {/* Social trigger */}
  <button
    onClick={() => setIsSocialOpen((prev) => !prev)}
    className="transition-opacity duration-200 cursor-pointer hover:opacity-60"
  >
    @
  </button>

  {/* Resume */}
  <a
    href={resumeLink.href}
    target="_blank"
    rel="noopener noreferrer"
    className="transition-opacity duration-200 tracking-[0.04em] font-semi hover:opacity-60"
  >
    {resumeLink.name}
  </a>

  {/* Social menu */}
  <div
    ref={socialMenuRef}
    className="
      absolute
      right-0
      top-full
      mt-3
      flex
      min-w-[100px]
      flex-col
      rounded-2xl
      border
      border-black/20
      bg-gradient-to-b
      from-white/95
      via-[#eeeeee]
      to-[#dcdcdc]
      p-2
      shadow-[0_8px_25px_rgba(0,0,0,0.12)]
      opacity-0
      pointer-events-none
    "
  >
{socialLinks.map((link) => (
  <a
    key={link.name}
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    className="
      group
      flex
      items-center
      justify-end
      gap-2
      rounded-xl
      px-4
      py-2
      text-[17px]
      text-[#333]
      transition-all
      duration-200
      hover:bg-[#171717]
      hover:text-white
    "
  >
    <GoArrowUpRight
      className="
        text-[16px]
        opacity-50
        transition-transform
        duration-200
        group-hover:translate-x-0.5
        group-hover:-translate-y-0.5
      "
    />

    <span>{link.name}</span>
  </a>
))}
  </div>

</div>

    </nav>
  )
}

export default NavBar
