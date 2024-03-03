"use server";

import Image from 'next/image';

import { z } from 'zod';

import { PopoverViewer } from '@/components/popover/popover-viewer';
import { ScrollArea } from '@/components/ui/scroll-area';

import { cn, truncate } from '@/lib/utils';

import { SectionTitle } from './section-title';
import { ARTICLES } from '@/config/data/articles';


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
        // description is a string with html tags, so we need to remove them
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
              <PopoverViewer title={article.title} description={article.description} tags={[]} image={{ src: getThumbnails(article), alt: article.title }} key={i}>
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
                      className={cn(

                        "z-10 col-span-2 rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:col-span-2 duration-700 ease-in-out",
                      )}
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
              </PopoverViewer>
            )) : null}
            {/* <p className="-mt-1 text-xs text-slate-400 leading-6">{article.date}</p> */}
            {/* <p className="-mt-1 text-xs text-slate-400 leading-6">{article.pubDate}</p> */}
          </ul>
        </ScrollArea>
      </div>
    </section>
  )
}
