import { XMLParser } from 'fast-xml-parser';

import { PopoverViewer } from '@/components/popover/popover-viewer';
import { ScrollArea } from '@/components/ui/scroll-area';

import { truncate } from '@/lib/utils';

import { SectionTitle } from './section-title';
import { ARTICLES } from '@/config/data/articles';
import { ArrowUpRight } from 'lucide-react';
import { BlurImage } from '@/components/blur-image';

type ParsedArticle = {
  title: string;
  thumbnail: string;
  link: string;
  pubDate: string;
  description: string;
};

type RssItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  'content:encoded'?: string;
};

async function fetchArticles(): Promise<ParsedArticle[]> {
  try {
    const response = await fetch(
      'https://blog.gshahdev.com/rss.xml',
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      console.error('RSS fetch failed:', response.status);
      return [];
    }

    const xml = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });

    const parsed = parser.parse(xml);
    const items = parsed?.rss?.channel?.item;

    if (!items?.length) {
      return [];
    }

    return items.map((item: RssItem) => {
      // Extract first image from content:encoded if available
      const content = item['content:encoded'] || '';
      const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/);
      const thumbnail = imgMatch ? imgMatch[1] : '';

      // Clean description - remove CDATA wrapper and HTML tags
      const cleanDescription = (item.description || '')
        .replace(/(<([^>]+)>)/gi, '')
        .trim();

      return {
        title: truncate(item.title || '', 36),
        thumbnail,
        link: item.link || '',
        pubDate: item.pubDate || '',
        description: truncate(cleanDescription, 145),
      };
    });
  } catch (error) {
    console.error('Blog fetch error:', error);
    return [];
  }
}

export async function Blog() {
  const articles = await fetchArticles();

  function getThumbnails(article: ParsedArticle) {
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
            {articles.length > 0 ? articles.map((article, i) => (
              <PopoverViewer title={article.title} description={article.description} tags={[]} image={{ src: getThumbnails(article), alt: article.title }} key={i}>
                <li key={i} className="mb-12">
                  <div className="group relative grid grid-cols-8 gap-4 sm:items-center sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 px-3 transition-all">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md lg:-inset-x-6 lg:block lg:group-hover:bg-emerald-800/10 dark:lg:group-hover:bg-emerald-800/20 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg transition motion-reduce:transition-none " />
                    <div className='relative col-span-8 sm:col-span-3 md:col-span-2'>
                      <BlurImage src={getThumbnails(article)} alt={article.title} />
                    </div>
                    <div className="z-10 col-span-8 sm:col-span-5 md:col-span-6">
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
                            {truncate(article.title, 30)}{" "}
                            <span className="md:inline-block hidden">
                              <ArrowUpRight />
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
