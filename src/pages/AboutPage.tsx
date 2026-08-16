import TechStackDisplay from "@/components/TechStackDisplay";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-8 text-4xl font-bold text-gray-900">About Me</h1>

      <div className="grid gap-12 md:grid-cols-3">
        {/* Profile image */}
        <div className="flex justify-center md:col-span-1">
          <img
            src="/AboutMeImage.jpg"
            alt="Nicholas Milligan"
            className="h-48 w-48 rounded-full object-cover shadow-lg"
          />
        </div>

        {/* Bio */}
        <div className="space-y-6 md:col-span-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Professional Summary
            </h2>
            <p className="text-gray-600">
              Full-stack software engineer at Thryv, building and maintaining
              applications used by over 100,000 active users. I work across the
              stack with React, Node.js, and cloud services to deliver features
              that make a real impact for small businesses.
            </p>
            <p className="text-gray-600">
              I graduated from Hack Reactor's immersive software engineering
              program after earning my B.S. in Chemical Engineering from UC
              Davis. The transition from engineering to software was a natural
              one — I've always been drawn to solving complex problems and
              building systems.
            </p>
            <p className="text-gray-600">
              Outside of work I'm an avid bass fisherman — I was lucky enough
              to captain the South Africa U19 national team and be featured on
              the cover of SA Bass magazine. I'm also a lifelong Arsenal
              supporter, play rec league soccer, and you'll find me on the golf
              course, watching anime, or dropping into Fortnite with friends.
            </p>
          </div>
        </div>
      </div>

      {/* Hobbies */}
      <section className="mt-14">
        <h2 className="mb-5 text-2xl font-semibold text-gray-900">Off the Clock</h2>
        <div className="flex flex-wrap gap-3">
          <span className="flex items-center gap-2 rounded-full bg-[#EF0107] px-5 py-2 text-sm font-bold text-white shadow-md ring-2 ring-[#EF0107]/30">
            🔴 Arsenal FC &mdash; COYG
          </span>
          <span className="flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm">
            ⚽ Rec League Soccer
          </span>
          <span className="flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm">
            🎣 Bass Fishing
          </span>
          <span className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm">
            ⛳ Golf
          </span>
          <span className="flex items-center gap-2 rounded-full bg-purple-500 px-4 py-2 text-sm font-medium text-white shadow-sm">
            📺 Anime
          </span>
          <span className="flex items-center gap-2 rounded-full bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm">
            🎮 Fortnite
          </span>
          <span className="flex items-center gap-2 rounded-full bg-orange-400 px-4 py-2 text-sm font-medium text-white shadow-sm">
            🐱 Cat Dad
          </span>
          <span className="flex items-center gap-2 rounded-full bg-slate-600 px-4 py-2 text-sm font-medium text-white shadow-sm">
            ⌨️ Mechanical Keyboards
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <img
            src="/portfolio_fishing.jpg"
            alt="Bass fishing"
            className="h-36 w-36 rounded-2xl object-cover shadow-md ring-1 ring-gray-200"
          />
          <img
            src="/portfolio_soccer.jpeg"
            alt="Soccer"
            className="h-36 w-36 rounded-2xl object-cover shadow-md ring-1 ring-gray-200"
          />
          <img
            src="/portfolio_golf.jpeg"
            alt="Golf"
            className="h-36 w-36 rounded-2xl object-cover shadow-md ring-1 ring-gray-200"
          />
        </div>
      </section>

      <TechStackDisplay />
    </div>
  );
}
