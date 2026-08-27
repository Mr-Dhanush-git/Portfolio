import React from 'react'

const Herotext = () => {
  return (
    <div className="relative w-[650px] ">

      {/* Soft cast shadow */}
      <div
        className="
          absolute
          -bottom-10
          left-40
          h-50
          w-[100%]
          rounded-2xl
          bg-black/30
          blur-2xl
        "
      />

      {/* 3D extrusion */}
      <div
        className="
          absolute
          inset-0
          translate-x-3
          translate-y-3
          rounded-[2.2rem]
          bg-[#cfcbcb]

        "
      />

      {/* Front card */}
      <div
        className="
          relative
          min-h-[400px]
          rounded-[2.2rem]
          border
          border-black/[0.025]
          bg-[#f6f5f1]
          backdrop-blur-[50px]
          px-10
          py-7
          shadow-[0_8px_25px_rgba(0,0,0,0.08)]
        "
      >

        <h1 className="font-montserrat text-[30px] italic tracking-[-0.02em]">
          Hi 👋, I'm Dhanush Chinthalapudi
        </h1>

        <p
          className="
            mt-3
            max-w-[550px]
            font-montserrat
            text-[25px]
            font-light
            italic
            leading-[1.4]
            tracking-[-0.01em]
            text-[#827673]
          "
        >
          Passionate about building scalable
          backend systems, AI-powered applications,
          and modern web experiences that solve
          real-world problems.
        </p>

      </div>

    </div>
  )
}

export default Herotext