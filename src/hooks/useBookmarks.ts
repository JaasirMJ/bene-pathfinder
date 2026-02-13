import { useState, useEffect } from "react";

const BOOKMARKS_KEY = "benefitsgps-bookmarks";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (schemeId: string) => {
    setBookmarks((prev) =>
      prev.includes(schemeId)
        ? prev.filter((id) => id !== schemeId)
        : [...prev, schemeId]
    );
  };

  const isBookmarked = (schemeId: string) => bookmarks.includes(schemeId);

  return { bookmarks, toggleBookmark, isBookmarked };
};
