import { SectionTitle } from './section-title';

const JOB_EXPERIENCE = [
  {
    id: 1,
    title: "Technology Consultant",
    company: "G.Shah Development",
    date: "2015 - Present",
    description: "Lead in the development of web and mobile applications for clients in various industries, including healthcare, finance, and entertainment. Assisted in developing a cohesive brand strategy and systemized processes touching all aspects of business operations, including web and mobile applications, business automation, content generation, community building, and marketing collateral.",
    services: ["Web Development", "Mobile & Application Development", "Branding", "Marketing"],
  },
  {
    id: 2,
    title: "Senior Software Engineer",
    company: "Hashnode",
    date: "2021 - 2023",
    description: "Worked diligently with senior leadership to develop and maintain the Hashnode platform, a community for software developers. Contributed to the development of the Hashnode platform, including the development of the Hashnode Editor, Analytics, and the Hashnode API. Worked directly with CTO and product manager to handle user feedback and bug reports, and devise strategies to sure-up key metrics such as user engagement and retention.",
    technologies: ["Next.js", "Typescript", "MobX", "GraphQL", "MongoDB", "Redis", "AWS"],
    relatedLinks: [
      {
        title: "Hashnode",
        url: "https://hashnode.com",
      },
      {
        title: "Hashnode - Series A",
        url: "https://townhall.hashnode.com/dollar67m-in-series-a-funding-to-build-the-next-gen-developer-blogging-community",
      },
    ],
  },
  {
    id: 3,
    title: "Front-end UX Engineer",
    company: "Think Mechanic",
    date: "2019 - 2020",
    description: "Contract Work. Played in instrumental role in the development of a discount subscription platform for a private multi-national publishing conglomerate driving rapid user acquisition with a strong focus on user experience and performance. Worked closely with internal marketing team and senior staff to develop the platform and trained internal staff on the maintenance and use of the platform.",
    technologies: ["Next.js", "Typescript", "Ruby-on-Rails", "Redis", "Postgres"],
  },
  {
    id: 4,
    title: "Marketing Consultant",
    company: "Modus Relations",
    date: "2008 - 2014",
    description: "Managed multiple on-going market campaigns for local businesses and national brands. Provided a full suite of data-driven marketing services designed to increase brand awareness, drive sales, and foster customer loyalty. Worked with clients to develop and execute marketing strategies, including growth marketing, content generation, and search engine optimization.",
    services: ["Public Relations", "Search Engine Optimization", "Social Media Management", "Content Generation", "Integrated Marketing", "Community Building",],
  },
]


export function Experience() {
  return (
    <section
      id="experience"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Work experience"
    >
      <SectionTitle>
        <h2 className="text-sm font-bold uppercase tracking-widest">
          Experience
        </h2>
      </SectionTitle>
      <div>
        <ol className="group/list">
          {JOB_EXPERIENCE.map((job) => (
            <li key={job.id} className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-emerald-800/10 dark:lg:group-hover:bg-emerald-800/20 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
                <header
                  className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2"
                  aria-label={job.date}
                >
                  {job.date}
                </header>
                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-slate-200">
                    <div>
                      {job.company.link ? <a
                        className="inline-flex items-baseline font-medium leading-tight text-accent dark:hover:text-teal-300 dark:focus-visible:text-teal-300 group/link"
                        href={`/${job.company.link}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${job.title} at ${job.company} (opens in a new tab)`}
                      >
                        <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                        <span>
                          {job.title} ·{" "}
                          <span className="inline-block">
                            {job.company}
                            {/* <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                              aria-hidden="true"
                            >
                              <path d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" />
                            </svg> */}
                          </span>
                        </span>
                      </a> : (
                        <>
                          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block group/link" />
                          <span>
                            {job.title} ·{" "}
                            <span className="inline-block">
                              {job.company}
                            </span>
                          </span></>
                      )}
                    </div>
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 hover:text-white leading-normal">
                    {job.description}
                  </p>
                  <ul
                    className="mt-2 flex flex-wrap"
                    aria-label="Technologies used"
                  >
                    {job.technologies?.length ? job.technologies.map((technology, idx) => (
                      <li key={`${technology}-${idx}`} className="mr-1.5 mt-2">
                        <div className="flex items-center rounded-full bg-blue-400/40 dark:bg-blue-400/10 px-3 py-1 text-xs font-medium leading-5 text-blue-800 dark:text-blue-300 ">
                          {technology}
                        </div>
                      </li>
                    )) : null}
                    {job.services?.length ? job.services.map((service, idx) => (
                      <li key={`${service}-${idx}`} className="mr-1.5 mt-2">
                        <div className="flex items-center rounded-full bg-teal-400/40 dark:bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-800 dark:text-teal-300 ">
                          {service}
                        </div>
                      </li>
                    )) : null}
                  </ul>

                  {job.relatedLinks && (
                    <ul
                      className="mt-2 flex flex-wrap"
                      aria-label="Related links"
                    >
                      {job.relatedLinks.map((link) => (
                        <li key={link.url} className="mr-4">
                          <a
                            className="relative mt-2 inline-flex items-center text-sm font-medium text-slate-600 dark:text-slate-300 dark:hover:text-teal-300 dark:focus-visible:text-teal-300"
                            href={link.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label={`${link.title} (opens in a new tab)`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="mr-1 h-3 w-3"
                              aria-hidden="true"
                            >
                              <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                              <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                            </svg>
                            <span>{link.title}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}

                </div>
              </div>
            </li>
          ))}
        </ol>
        {/* <ViewResumeButton /> */}
      </div>
    </section>
  )
}
