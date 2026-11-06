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
  title?: string;
  link?: string;
  description?: string;
  pubDate?: string;
  enclosure?: { '@_url'?: string };
  'content:encoded'?: string;
};

const FEED_URL = 'https://blog.gshahdev.com/rss.xml';
const FETCH_TIMEOUT_MS = 8000;
// User-Agent: some edge protections (Cloudflare, etc.) challenge or block
// requests with empty/default Node UAs. Identify ourselves clearly.
const USER_AGENT = 'gshah.dev-blog-fetcher/1.0 (+https://www.gshah.dev)';

async function fetchArticles(): Promise<ParsedArticle[]> {
  try {
    const response = await fetch(FEED_URL, {
      headers: {
        accept: 'application/rss+xml, application/xml, text/xml',
        'user-agent': USER_AGENT,
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error('Blog RSS fetch failed:', response.status);
      return [];
    }

    const xml = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      parseTagValue: false,
    });
    const rawItems = parser.parse(xml)?.rss?.channel?.item;
    // A single <item> parses to an object, not an array.
    const items: RssItem[] = Array.isArray(rawItems)
      ? rawItems
      : rawItems
        ? [rawItems]
        : [];

    if (items.length === 0) {
      console.error('Blog RSS: no items parsed');
      return [];
    }

    return items.map((item) => {
      // Prefer the feed's cover image (enclosure); fall back to the first <img>.
      const content = item['content:encoded'] || '';
      const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/);
      const thumbnail = item.enclosure?.['@_url'] || imgMatch?.[1] || '';

      const cleanDescription = (item.description || '')
        .replace(/(<([^>]+)>)/gi, '')
        .trim();

      // Only http(s) links are kept; anything else is dropped.
      const link = /^https?:\/\//i.test(item.link || '') ? item.link! : '';

      return {
        title: truncate(item.title || '', 36),
        thumbnail,
        link,
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

  function getThumbnails(article: ParsedArticle): string | undefined {
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
            {articles.length > 0 ? articles.map((article, i) => {
              const thumbnail = getThumbnails(article) ?? article.thumbnail;
              const row = (
                <li key={i} className="mb-12">
                  <div className="group relative grid grid-cols-8 gap-4 sm:items-center sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 px-3 transition-all">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md lg:-inset-x-6 lg:block lg:group-hover:bg-emerald-800/10 dark:lg:group-hover:bg-emerald-800/20 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg transition motion-reduce:transition-none " />
                    <div className='relative col-span-8 sm:col-span-3 md:col-span-2'>
                      {thumbnail ? <BlurImage src={thumbnail} alt={article.title} /> : null}
                    </div>
                    <div className="z-10 col-span-8 sm:col-span-5 md:col-span-6">
                      <h3 className="-mt-1">
                        {article.link ? (
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
                        ) : (
                          <span className="font-medium leading-tight text-accent">{truncate(article.title, 30)}</span>
                        )}
                      </h3>
                      <p className="mt-2 text-xs leading-normal text-pretty truncate text-ellipsis">
                        {truncate(article.description.replace(/(<([^>]+)>)/gi, ""), 145)}
                      </p>
                    </div>
                  </div>
                </li>
              );
              // The popover needs an image; without one, render the plain row.
              return thumbnail ? (
                <PopoverViewer title={article.title} description={article.description} tags={[]} image={{ src: thumbnail, alt: article.title }} key={i}>
                  {row}
                </PopoverViewer>
              ) : row;
            }) : null}
            {/* <p className="-mt-1 text-xs text-slate-400 leading-6">{article.date}</p> */}
            {/* <p className="-mt-1 text-xs text-slate-400 leading-6">{article.pubDate}</p> */}
          </ul>
        </ScrollArea>
      </div>
    </section>
  )
}
