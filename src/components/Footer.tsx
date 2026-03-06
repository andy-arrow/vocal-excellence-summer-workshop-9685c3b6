import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_STORY, CATEGORY_PHRASE } from '@/constants/copy';

const Footer = () => {
  return (
    <footer className="relative bg-[#fbfbfd] overflow-hidden">
      <div className="max-w-[980px] mx-auto px-6 md:px-8">
        <div className="py-8 md:py-10 border-b border-[#d2d2d7]">
          <p className="text-base font-medium text-[#1d1d1f] mb-2">
            Vocal Excellence.
          </p>
          <p className="text-sm text-[#6e6e73] mb-2 italic max-w-xl">
            {BRAND_STORY}
          </p>
          <p className="text-xs text-[#6e6e73] mb-4">
            {CATEGORY_PHRASE}
          </p>
          <p className="text-sm text-[#6e6e73] mb-4">
            Limassol, Cyprus.
          </p>
          <p className="text-sm text-[#6e6e73] mb-4">
            Questions?{' '}
            <a href="mailto:info@vocalexcellence.cy" className="text-apple-blue hover:underline">
              info@vocalexcellence.cy
            </a>
            {' '}|{' '}
            <a href="tel:+35725775885" className="text-apple-blue hover:underline">
              +357 25 775 885
            </a>
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link to="/privacy" className="text-[#424245] hover:text-[#1d1d1f] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-[#424245] hover:text-[#1d1d1f] transition-colors">
              Terms of Use
            </Link>
            <Link to="/apply" className="text-apple-blue font-medium hover:underline">
              Request Your Place
            </Link>
          </div>
        </div>

        <div className="py-4">
          <p className="text-[12px] text-[#6e6e73]">
            Copyright © {new Date().getFullYear()} Vocal Excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
