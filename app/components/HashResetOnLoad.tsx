"use client";

import { useEffect } from "react";

export default function HashResetOnLoad() {
  useEffect(() => {
    if (!window.location.hash) {
      return;
    }

    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return null;
}
