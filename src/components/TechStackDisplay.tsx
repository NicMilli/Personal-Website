import techStack from "@/data/techStack";

export default function TechStackDisplay() {
  return (
    <section className="mt-16">
      <h2 className="mb-8 text-2xl font-semibold text-gray-900">Tech Stack</h2>
      <div className="grid grid-cols-4 gap-6 sm:grid-cols-6 md:grid-cols-8">
        {techStack.map((icon) => (
          <div key={icon.name} className="flex flex-col items-center gap-2" title={icon.name}>
            <img src={icon.url} alt={icon.name} className="h-10 w-10 object-contain" />
            <span className="text-xs text-gray-500">{icon.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
