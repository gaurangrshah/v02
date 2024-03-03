import { JOB_EXPERIENCE } from '@/config/data/experienece';
import { SectionTitle } from './section-title';

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
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-emerald-800/5 dark:lg:group-hover:bg-emerald-800/20 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
                <header
                  className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2"
                  aria-label={job.date}
                >
                  {job.date}
                </header>
                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-slate-200">
                    <div className='text-accent dark:hover:text-teal-300 dark:focus-visible:text-teal-300 group/link'>
                      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block group/link" />
                      <span>
                        {job.title} ·{" "}
                        <span className="inline-block">
                          {job.company}
                        </span>
                      </span>
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
