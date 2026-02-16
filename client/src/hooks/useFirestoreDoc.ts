import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface UseFirestoreDocResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const cache = new Map<string, unknown>();

export function useFirestoreDoc<T>(
  collection: string,
  docId: string,
): UseFirestoreDocResult<T> {
  const key = `${collection}/${docId}`;
  const cached = cache.get(key) as T | undefined;

  const [data, setData] = useState<T | null>(cached ?? null);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cached) {
      return;
    }

    let cancelled = false;

    async function fetchDoc() {
      try {
        const docRef = doc(db, collection, docId);
        const docSnap = await getDoc(docRef);
        if (cancelled) {
          return;
        }

        if (docSnap.exists()) {
          const result = docSnap.data() as T;
          cache.set(key, result);
          setData(result);
        } else {
          setError(`Document ${collection}/${docId} not found`);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchDoc();
    return () => {
      cancelled = true;
    };
  }, [collection, docId, key, cached]);

  return { data, loading, error };
}
