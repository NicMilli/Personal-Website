import { useMemo } from "react";
import { Link } from "react-router-dom";
import ChatWidget from "@/components/ChatWidget.js";
import { useBubbleImages } from "@/hooks/useBubbleImages.js";

interface BubbleData {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  drift: string;
  imageUrl?: string;
}

function generateBubbles(count: number, imageUrls: string[]): BubbleData[] {
  const bubbles = Array.from({ length: count }, (_, i) => {
    const isImage = i < imageUrls.length;
    const size = isImage
      ? Math.random() * 4 + 6 // image bubbles: 6–10vh
      : Math.random() * 1.2 + 0.6;
    const left = Math.random() * 96 + 2;
    const duration = Math.random() * 10 + 8;
    const delay = Math.random() * 10;
    const drift = (Math.random() * 20 - 10).toFixed(1);
    return { id: i, size, left, duration, delay, drift, imageUrl: imageUrls[i] };
  });

  // Bump the 4 smallest plain bubbles up to 1.2vh
  const plain = bubbles.filter((b) => !b.imageUrl);
  const sorted = [...plain].sort((a, b) => a.size - b.size);
  const smallestIds = new Set(sorted.slice(0, 4).map((b) => b.id));
  return bubbles.map((b) =>
    !b.imageUrl && smallestIds.has(b.id) ? { ...b, size: Math.max(b.size, 1.2) } : b
  );
}

export default function HomePage() {
  const imageUrls = useBubbleImages();
  const bubbles = useMemo(
    () => generateBubbles(15, imageUrls),
    // Re-generate when image URLs load so image bubbles appear
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [imageUrls.join(",")]
  );

  return (
    <section className="animate-gradient relative flex min-h-screen -mt-[73px] pt-[73px] items-center justify-center">
      {/* Bubbles — clipped to the visible area below the navbar */}
      <div className="absolute inset-x-0 bottom-0 top-[73px] overflow-hidden pointer-events-none">
        {bubbles.map((b) => (
          <div
            key={b.id}
            className={`bubble${b.imageUrl ? " bubble--image" : ""}`}
            style={{
              width: `${b.size}vh`,
              height: `${b.size}vh`,
              left: `${b.left}%`,
              bottom: 0,
              "--duration": `${b.duration}s`,
              "--delay": `${b.delay}s`,
              "--drift": `${b.drift}vh`,
              ...(b.imageUrl
                ? { backgroundImage: `url(${b.imageUrl})` }
                : {}),
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Nicholas Milligan
        </h1>
        <p className="mb-2 text-xl font-medium text-gray-700 sm:text-2xl">
          Software Engineer
        </p>
        <p className="mx-auto mb-8 max-w-lg text-gray-600">
          Full-stack engineer building products that reach tens of thousands of
          users. Passionate about clean code, great UX, and shipping things that
          matter.
        </p>

        <div className="mb-10 flex justify-center gap-4">
          <Link
            to="/projects"
            className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            View Projects
          </Link>
          <Link
            to="/contact"
            className="rounded-lg border border-gray-900 px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-900 hover:text-white"
          >
            Get in Touch
          </Link>
        </div>

        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/nicholasmilligan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 transition-colors hover:text-gray-900"
            aria-label="GitHub"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/nicholasmilligan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 transition-colors hover:text-gray-900"
            aria-label="LinkedIn"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>

      <ChatWidget />
    </section>
  );
}
