export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-16 lg:scroll-mt-24"
      aria-label="About me"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">
          About
        </h2>
      </div>
      <div className="text-slate-400 max-w-[60ch]">
        <p className="mb-4 text-pretty">
          My love for technology started very early in my childhood. I remember getting a hand-me-down Commodore 128 from a neighbor. It didn&apos;t take very long at all before I figured out it did more than just play rudimentary video games. I was hooked. I went from writing simple BASIC programs to today where I help people build businesses that leverage technology to achieve some really amazing things.
        </p>
        <p className="mb-4 text-pretty">
          These days I leverage my experience in building and scaling on the web to solve complex problems faced by startups and SMBs. My goal is to always help avoid common pitfalls early on that most businesses face when they first get into the tech industry. I try to keep my finger on the pulse to ensure I am always able to leverage proven technologies and best practices to help my clients succeed.
        </p>
        <p className="text-pretty">
          When I&apos;m not in front of a screen, I love hiking, spending time with family, and reading. I also have an insatiable appetite for music. For years I toured as a DJ throughout the US and Europe and got a chance to see the world in what I feel was a very unique way.
        </p>
      </div>
    </section>
  )
}