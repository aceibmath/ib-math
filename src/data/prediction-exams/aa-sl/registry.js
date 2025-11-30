// Mapare slug -> import lazy (exact ca la Past Papers)
export const REGISTRY = {
  "aa-sl-2025-nov-set1-p1": () => import("./2025/nov-set1-p1.js"),
  // (poți adăuga treptat: set1-p2, set2-p1 etc.)
};
