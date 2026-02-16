import { useFirestoreDoc } from "@/hooks/useFirestoreDoc";
import type { AssetsDoc } from "@/types/firebase";
import TechStackDisplay from "@/components/TechStackDisplay";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AboutPage() {
  const { data: assets, loading } = useFirestoreDoc<AssetsDoc>(
    "Portfolio",
    "Assets",
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-8 text-4xl font-bold text-gray-900">About Me</h1>

      <div className="grid gap-12 md:grid-cols-3">
        {/* Profile image */}
        <div className="flex justify-center md:col-span-1">
          {assets?.profileImage && (
            <img
              src={assets.profileImage}
              alt="Nicholas Milligan"
              className="h-48 w-48 rounded-full object-cover shadow-lg"
            />
          )}
        </div>

        {/* Bio */}
        <div className="space-y-6 md:col-span-2">
          {assets?.bio && (
            <p className="text-gray-600">{assets.bio}</p>
          )}

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Professional Summary
            </h2>
            <p className="text-gray-600">
              Full-stack software engineer at Thryv, building and maintaining
              applications used by over 60,000 users. I work across the stack
              with React, Node.js, and cloud services to deliver features that
              make a real impact for small businesses.
            </p>
            <p className="text-gray-600">
              I graduated from Hack Reactor's immersive software engineering
              program after earning my B.S. in Chemical Engineering from UC
              Davis. The transition from engineering to software was a natural
              one — I've always been drawn to solving complex problems and
              building systems.
            </p>
            <p className="text-gray-600">
              Fluent in English and conversational in Spanish. Outside of work,
              you'll find me bass fishing (captained the South Africa U19
              national team), on the golf course, watching anime, or dropping
              into Fortnite.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <section className="mt-16">
        <h2 className="mb-8 text-2xl font-semibold text-gray-900">
          Tech Stack
        </h2>
        <TechStackDisplay />
      </section>
    </div>
  );
}
