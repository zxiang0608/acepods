import { useEffect } from 'react';

const ELFSIGHT_SCRIPT_SRC = 'https://elfsightcdn.com/platform.js';

export default function InstagramFeed() {
  useEffect(() => {
    const existingScript = document.querySelector(`script[src="${ELFSIGHT_SCRIPT_SRC}"]`);
    if (existingScript) return;

    const script = document.createElement('script');
    script.src = ELFSIGHT_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="bg-white px-5 py-14 md:px-12 md:py-20">
      <div className="mx-auto max-w-[1360px]">
        <div className="mx-auto max-w-[860px] text-center">
          <h2 className="text-[28px] font-bold leading-[1.1] tracking-tight text-[#15191d] sm:text-[36px] md:text-[48px]">
            Follow Ace Office Pods on Instagram
          </h2>
          <p className="mt-3 text-[16px] leading-[1.6] text-[#505964] md:text-[20px]">
            See recent office pod installations, product finishes, and workplace project photos.
          </p>
        </div>

        <div className="mt-8 md:mt-10">
          <div className="elfsight-app-79a13fc0-a421-4be4-8121-d769283029c6" data-elfsight-app-lazy></div>
        </div>
      </div>
    </section>
  );
}
