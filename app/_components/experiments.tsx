import Image from 'next/image';

import { z } from 'zod';

import { PopoverViewer } from '@/components/popover/popover-viewer';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

import { SectionTitle } from './section-title';
import { EXPERIMENTS } from '@/config/data/experiments';
import { ArrowUpRight } from 'lucide-react';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { BlurImage } from '@/components/blur-image';



export function Experiments() {
  return (
    <section
      id="experiments"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Selected projects"
    >
      <SectionTitle>
        <h2 className="text-sm font-bold uppercase tracking-widest">
          Experiments
        </h2>
      </SectionTitle>
      <ScrollArea className="h-[30rem] w-full rounded-md px-3 pt-4">
        <ul className="group/list pr-2">
          {EXPERIMENTS.map((experiment, i) => (
            <PopoverViewer title={experiment.title} description={experiment.description} tags={experiment.technologies} image={{ src: experiment.image, alt: experiment.title }} key={i}>
              <li key={i} className="mb-12">
                <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 md:px-2">
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-emerald-800/10 dark:lg:group-hover:bg-emerald-800/20 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
                  <div className="z-10 sm:order-2 col-span-8 sm:col-span-5 md:col-span-6">
                    <h3>
                      {experiment.link ? (
                        <a
                          className="inline-flex items-baseline font-medium leading-tight text-accent dark:hover:text-teal-300 dark:focus-visible:text-teal-300 group/link text-base"
                          href={experiment.link}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`${experiment.title} (opens in a new tab)`}
                        >
                          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                          <span>
                            {experiment.title}{" "}
                            <span className="hidden md:inline-block">
                              <ArrowUpRight size={16} />
                            </span>
                          </span>
                        </a>
                      ) : (
                        <Popover>
                          <PopoverTrigger>
                            <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                            <p className='text-accent dark:hover:text-teal-300 dark:focus-visible:text-teal-300 text-left'>
                              {experiment.title}{" "}
                            </p>
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
                      {experiment.description}
                    </p>
                    {experiment?.stars && (
                      <a
                        className="relative mt-2 inline-flex items-center text-sm font-medium text-slate-300 hover:text-teal-300 focus-visible:text-teal-300"
                        href=""
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${experiment.stars} stars on GitHub (opens in a new tab)`}
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
                        <span>{experiment.stars}</span>
                      </a>
                    )}
                  </div>
                  <div className="relative col-span-8 sm:col-span-3 md:col-span-2">
                    <BlurImage src={
                      experiment.image
                    } alt={experiment.title
                    } />
                  </div>
                </div>
              </li>
            </PopoverViewer>
          ))}
        </ul>
      </ScrollArea>
      {/* <ViewProjectsButton /> */}
    </section>
  )
}
