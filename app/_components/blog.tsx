"use server";

import Image from 'next/image';

import { z } from 'zod';

import GifPopover from '@/components/popover/gif-popover';
import { ScrollArea } from '@/components/ui/scroll-area';

import { truncate } from '@/lib/utils';

import { SectionTitle } from './section-title';

const ARTICLES = [
  {
    title: "How I Learn",
    date: "May 2021",
    description: "How I Learn... Learning is no simple task. And learning how to learn is no laughing matter. 🤪 Although writing that line did make me chuckle a...",
    image: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1620414978629/67wailqiX.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp',
    url: 'https://blog.gshahdev.com/how-i-learn'
  },
  {
    title: "How We Learn",
    date: "May 2021",
    description: "Optimize your learning based on the latest science. · How We Learn... TLDR Our brains process information in different ways depending on our level of...",
    image: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1620415098719/ws90-ehUd.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp',
    url: 'https://blog.gshahdev.com/how-we-learn'
  },
  {
    title: "Build a Splash Page with Next.js using Airtable as a CMS (001)",
    date: "June 2021",
    description: "Introduction Let's build a fully optimized landing page using Airtable and Next.js. Over the course of this 3-part series, you'll work your way up to...",
    image: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1623679488740/5TP3xE4IU.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp',
    url: 'https://blog.gshahdev.com/build-a-splash-page-with-nextjs-using-airtable-as-a-cms'
  },
  {
    title: "Build a Splash Page with SyncInc using Airtable as a CMS (002)",
    date: "July 2021",
    description: "In the previous article of this series, we built a splash page using the Airtable.js package to query our data from an Airtable base. We also...",
    image: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1625263317751/sKK3zrRTr.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp',
    url: 'https://blog.gshahdev.com/build-a-splash-page-with-syncinc-and-nextjs-using-airtable-as-a-cms'
  },
  {
    title: "Build a Landing Page using Airtable as a CMS (003)",
    date: "July 2021",
    description: "In the previous article of this series, we built a splash page using the Airtable.js package to query our data from an Airtable base. We also...",
    image: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1627224537351/NlRTJMvbA.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp',
    url: 'https://blog.gshahdev.com/build-a-landing-page-using-airtable-as-a-cms-with-syncinc'
  },
  {
    title: "Top 10 VSCode Extensionsd",
    date: "July 2021",
    description: "1. Advanced New File Quickly create new files directly from the command palette or use the keyboard shortcut. Usage: cmd +...",
    image: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1625593711515/yxcZAE0NB.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp',
    url: 'https://blog.gshahdev.com/10-vscode-extensions'
  },
  {
    title: "Getting Started with Next.js and Chakra-UI",
    date: "Oct 2021",
    description: "This article is the start of a series, where I attempt to document some of my learnings, tips, tricks, ... etc. of using Chakra-UI to create fully...",
    image: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1635732771726/R7ZC9yCDLr.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp',
    url: 'https://blog.gshahdev.com/getting-started-with-nextjs-and-chakra-ui'
  },
  {
    title: "Persistent Layout w/ Chakra-UI and Next.js",
    date: "Nov 2021",
    description: "This post is the second installment of the Getting Started with Chakra-UI series. We'll be using the finished project from the original article as our...",
    image: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1636591418152/nvRxbMp1V.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp',
    url: 'https://blog.gshahdev.com/persistent-layout-with-chakra-ui-and-nextjs'
  },
  {
    title: "Dark-Mode Support w/ Chakra-UI and Nex...",
    date: "Nov 2021",
    description: "This article is the third article, in a series where we take a look at Building modern web apps with Chakra-UI and Next.js. Prerequisites General...",
    image: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1637652804988/s2zV9CXoB.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp',
    url: 'https://blog.gshahdev.com/dark-mode-support-with-chakra-ui-and-nextjs'
  },
].reverse();

const articlesSchema = z.object({ title: z.string(), thumbnail: z.string(), link: z.string(), pubDate: z.string(), description: z.string() });

type Article = z.infer<typeof articlesSchema>;

export async function Blog() {

  const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://blog.gshahdev.com/rss.xml')
  const data = await response.json()
  const articles = data.items.map((item: Article) => {
    if (articlesSchema.parse(item)) {
      return {
        title: truncate(item.title, 36),
        thumbnail: item.thumbnail,
        link: item.link,
        pubDate: item.pubDate,
        description: truncate(item.description.replace(/(<([^>]+)>)/gi, ""), 145)
      }
    } else return null;
  });

  function getThumbnails(article: Article) {
    return ARTICLES.filter((a) => a.url === article.link).map((a) => a.image)[0];
  }





  return (
    <section
      id="blog"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Blog posts"
    >
      <SectionTitle>
        <h2 className="text-sm font-bold uppercase tracking-widest">
          Articles
        </h2>
      </SectionTitle>
      <div>
        <ScrollArea className="h-[30rem] w-full rounded-md px-3 pt-4">
          <ul className="group/list">
            {articles?.length ? articles.map((article: { title: string; thumbnail: string; link: string; pubDate: string; description: string; }, i: number) => (
              <GifPopover image={{ src: getThumbnails(article), alt: article.title }} key={i}>
                <li key={i} className="mb-12">
                  <div className="group relative grid grid-cols-8 gap-4 transition-all sm:items-center sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 px-3">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-emerald-800/10 dark:lg:group-hover:bg-emerald-800/20 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
                    <Image
                      alt={article.title}
                      loading="lazy"
                      width={200}
                      height={48}
                      decoding="async"
                      data-img={1}
                      className="z-10 col-span-2 rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:col-span-2"
                      style={{ color: "transparent" }}
                      src={getThumbnails(article)}
                    />
                    <div className="z-10 col-span-6">
                      <h3 className="-mt-1">
                        <a
                          className="inline-flex items-baseline font-medium leading-tight text-accent dark:hover:text-teal-300 dark:focus-visible:text-teal-300 group/link"
                          href={article.link}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`${article.title} (opens in a new tab)`}
                        >
                          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                          <span>
                            {truncate(article.title, 36)}{" "}
                            <span className="inline-block">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group"
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
                      </h3>
                      <p className="mt-2 text-xs leading-normal text-pretty truncate text-ellipsis">
                        {truncate(article.description.replace(/(<([^>]+)>)/gi, ""), 145)}
                      </p>
                    </div>
                  </div>
                </li>
              </GifPopover>
            )) : null}
            {/* <p className="-mt-1 text-xs text-slate-400 leading-6">{article.date}</p> */}
            {/* <p className="-mt-1 text-xs text-slate-400 leading-6">{article.pubDate}</p> */}
          </ul>
        </ScrollArea>
      </div>
    </section>
  )
}
