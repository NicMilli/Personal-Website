import { useState, useEffect } from "react";

export function useBubbleImages(): string[] {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/bubbles")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.urls && Array.isArray(data.urls)) {
          setUrls(data.urls as string[]);
        }
      })
      .catch(() => {});
  }, []);

  return urls;
}
