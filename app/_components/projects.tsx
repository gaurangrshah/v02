import Image from 'next/image';

import { z } from 'zod';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  link: z.string().nullable(),
  technologies: z.array(z.string()),
  stars: z.number().optional().nullable()
});

type Project = z.infer<typeof ProjectSchema>;

const PROJECTS: Project[] = [
  {
    title: 'Plura: Design Agency CRM & Hosting PAAS',
    description:
      'A freelance project management Saas platform for design and marketing agencies. Features a custom CMS, CRM, and hosting services.',
    image: 'https://camo.githubusercontent.com/289ba48b3b93dacd92c289d05cfe3ef0238934f99a90680fb1f81ad60a757bfd/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f6d7367736e64722f307774535865786c50684d4e313934356f6f78572f6d656469612f3635623763336432343636303437376461663364363730382e706e67',
    link: null,
    technologies: ['Next.js', 'TailwindCSS', 'Prisma', 'PlanetScale', 'Live-Kit', 'Heroku'],
    stars: null
  },
  {
    title: 'Swatchr: Color Palette Generator',
    description:
      'A proof of concept (currently under "alpha" preview), inspired by Coolors.co. This project focuses on accessibility, and future integrations with design tools like Figma are on the roadmap',
    image: '/swatchr-screenshot.png',
    link: 'https://swatchr.app',
    technologies: ['Next.js', 'TailwindCSS', 'Prisma', 'PlanetScale', 'Live-Kit', 'Heroku'],
    stars: null
  },
  {
    title: 'Miro Clone',
    description: 'A working clone of the popular whiteboard app Miro. Demonstrating  modern real-time collaborative serverless application architecture.',
    image: '/miro-screenshot.png',
    link: 'https://mira-one-green.vercel.app/',
    technologies: ['Next.js', 'TailwindCSS', 'Convex', 'Live-Kit', 'Vercel']
  },
  {
    title: 'Discord Clone',
    description:
      'A working clone of the popular chat app Discord. Built with Next.JS, Tailwind, Clerk, Convex, UploadThing, and more.',
    image: 'https://brittanychiang.com/_next/image?url=%2Fimages%2Fprojects%2Fcourse-card.png&w=640&q=75',
    link: '#',
    technologies: ['Next.js', 'TailwindCSS', 'Prisma', 'PlanetScale', 'Live-Kit', 'Heroku']
  },
  {
    title: 'Slicks Slices',
    description:
      'A pizzeria ordering platform built with Gatsby, Sanity, GraphQL, and serverless functions. Features a slick design and a custom CMS.',
    image: '/slicks-screenshot.png',
    link: 'https://affectionate-wright-0cbdf0.netlify.app',
    technologies: ['Gatsby.js', 'Styled Components', 'Sanity', 'Cloudinary', 'GraphQL', 'Netlify']
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Selected projects"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-secondary">
          Projects
        </h2>
      </div>
      <ScrollArea className="h-[30rem] w-full rounded-md px-3 pt-4">
        <ul className="group/list pr-2">
          {PROJECTS.map((project, i) => (
            <li key={i} className="mb-12">
              <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 md:px-2">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-emerald-800/10 dark:lg:group-hover:bg-emerald-800/20 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
                <div className="z-10 sm:order-2 sm:col-span-6">
                  <h3>
                    {project.link ? (
                      <a
                        className="inline-flex items-baseline font-medium leading-tight text-accent dark:hover:text-teal-300 dark:focus-visible:text-teal-300 group/link text-base"
                        href={project.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${project.title} (opens in a new tab)`}
                      >
                        <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                        <span>
                          {project.title}{" "}
                          <span className="inline-block">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </span>
                      </a>
                    ) : (
                      <Popover>
                        <PopoverTrigger>
                          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                          <span className='text-accent dark:hover:text-teal-300 dark:focus-visible:text-teal-300'>
                            {project.title}{" "}
                          </span>
                        </PopoverTrigger>
                        <PopoverContent>
                          {/* display coming soon message in popover content */}
                          <p className="text-center text-xl text-yellow-400">Under Development</p>
                          <p className='text-xs text-center pt-1' >Coming Soon</p>
                        </PopoverContent>
                      </Popover>
                    )}
                  </h3>
                  <p className="mt-2 text-xs leading-normal">
                    {project.description}
                  </p>
                  {project?.stars && (
                    <a
                      className="relative mt-2 inline-flex items-center text-sm font-medium text-slate-300 hover:text-teal-300 focus-visible:text-teal-300"
                      href="https://github.com/bchiang7/spotify-profile"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="599 stars on GitHub (opens in a new tab)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="mr-1 h-3 w-3"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{project.stars}</span>
                    </a>
                  )}
                </div>
                <Image
                  alt={`${project.title} marketing card`}
                  loading="lazy"
                  width={200}
                  height={48}
                  decoding="async"
                  data-nimg={1}
                  className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
                  style={{ color: 'transparent' }}
                  src={project.image}
                />
              </div>
            </li>

          ))}
        </ul>
      </ScrollArea>
      {/* <ViewProjectsButton /> */}
    </section>
  )
}