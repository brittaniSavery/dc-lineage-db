export const SITE_NAME = "Dragon Cave Lineage Database";
export const SITE_NAME_SHORT = "DC Lineage DB";
export const SITE_NAME_ABBV = "DCLDB";
export const LOADING_FORM = [{ value: "loading", label: "Loading..." }];
export const ADD_LINEAGE = "Add Lineage";
export const SEARCH_LINEAGES = "Search Lineages";
export const LINEAGE_TYPES = [
  "Arrow",
  "Checker",
  "Even",
  "Purebred",
  "Seasonal Checker",
  "Spiral",
  "Stairstep",
];

export const LINEAGE_SITES_STATUS = [
  { value: "required", label: "Need to Add" },
  { value: "mate", label: "Missing Mate" },
  { value: "offspring", label: "Missing Offspring" },
  { value: "completed", label: "Completed" },
];

export const LINEAGE_STATUS = [
  { value: "mate", label: "Missing Mate" },
  { value: "unbred", label: "Not Bred" },
  { value: "offspring", label: "Missing Offspring" },
  { value: "completed", label: "Completed" },
];

export const LINEAGE_SEARCH_STATUS = [
  { value: "mate", label: "Missing Mate" },
  { value: "matched", label: "Matched Pairs Only" },
  { value: "offspring", label: "Missing Offspring" },
];

export const CHRISTMAS = "christmas";
export const HALLOWEEN = "halloween";
export const VALENTINE = "valentine";
export const HOLIDAYS = [CHRISTMAS, HALLOWEEN, VALENTINE];

export const DRAGON_TYPES = {
  drake: "Drake",
  regular: "Regular Dragon",
  pygmy: "Pygmy Dragon",
  "two-headed": "Two-Headed Dragon",
};

export const STATUSES = ["info", "success", "warning", "danger"];

export const BUTTON = {
  VARIANTS: ["outlined", "inverted", "rounded"],
  COLORS: [
    "primary",
    "link",
    "white",
    "black",
    "light",
    "dark",
    "text",
    "ghost",
    ...STATUSES,
  ],
  SHADES: ["light", "dark"],
  SIZES: ["small", "medium", "large"],
};

export const PAGE_SIZE = 200;
