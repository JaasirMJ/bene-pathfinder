import { useState, useEffect } from "react";

const RECENT_KEY = "benefitsgps-recently-viewed";
const MAX_RECENT = 5;

export const useRecentlyViewed = () => {
  const [recentIds, setRecentIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recentIds));
  }, [recentIds]);

  const addToRecent = (schemeId: string) => {
    setRecentIds((prev) => {
      const filtered = prev.filter((id) => id !== schemeId);
      return [schemeId, ...filtered].slice(0, MAX_RECENT);
    });
  };

  return { recentIds, addToRecent };
};
