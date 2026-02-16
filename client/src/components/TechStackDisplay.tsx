import { useFirestoreDoc } from "@/hooks/useFirestoreDoc";
import type { StackIconsDoc } from "@/types/firebase";
import LoadingSpinner from "./LoadingSpinner";

export default function TechStackDisplay() {
  const { data, loading, error } = useFirestoreDoc<StackIconsDoc>(
    "Portfolio",
    "StackIcons",
  );

  if (loading) return <LoadingSpinner />;
  if (error || !data) return null;

  const sorted = [...data.icons].sort((a, b) => a.rank - b.rank);

  return (
    <div className="grid grid-cols-4 gap-6 sm:grid-cols-6 md:grid-cols-8">
      {sorted.map((icon) => (
        <div
          key={icon.name}
          className="flex flex-col items-center gap-2"
          title={icon.name}
        >
          <img
            src={icon.url}
            alt={icon.name}
            className="h-10 w-10 object-contain"
          />
          <span className="text-xs text-gray-500">{icon.name}</span>
        </div>
      ))}
    </div>
  );
}
