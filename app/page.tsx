import ToastCenter from '@/components/toast-center';

import { About } from './_components/about';
import { Blog } from './_components/blog';
import { Experience } from './_components/experience';
import { Experiments } from './_components/experiments';
import { Footer } from './_components/footer';
import { Header } from './_components/header';
import { KeywordScroll } from './_components/keyword-scroll';
import { SkipToContentLink } from './_components/skip-link';
import { Wrapper } from './_components/wrapper';

export default function LandingPage() {
  return (
    <Wrapper>
      <SkipToContentLink />
      <div className="relative lg:flex lg:justify-between lg:gap-4">
        <Header />
        <div id="content" className="pt-24 lg:w-1/2 lg:py-24">
          <About />
          <KeywordScroll />
          <Experience />
          <Experiments />
          <Blog />
          <Footer />
        </div>
      </div>
      <ToastCenter />
    </Wrapper>
  );
}
