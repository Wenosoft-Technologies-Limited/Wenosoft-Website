export const CONTACT = {
  email: "info@wenosoft.com",
  website: "wenosoft.com",
  founder: "Henry Ozomgbachi",
  location: "Lagos State, Nigeria",
  get mailto() {
    return `mailto:${this.email}?subject=${encodeURIComponent("Project inquiry for Wenosoft")}&body=${encodeURIComponent(
      "Hi Wenosoft team,\n\nI'd like to discuss a project. Here are a few details:\n\n• Company:\n• What we're trying to build:\n• Timeline / budget:\n• Best way to reach me:\n\nThanks!",
    )}`;
  },
} as const;

export const SITE = {
  name: "Wenosoft Technologies",
  legalName: "Wenosoft Technologies Ltd.",
  tagline: "Clarity out of complexity",
  description:
    "Wenosoft Technologies is a software development and technology consulting partner that bridges the ability to think with the ability to build.",
  url: "https://wenosoft.com",
} as const;

export interface SocialProfile {
  /** Platform name, used in accessible labels */
  name: "LinkedIn" | "X" | "Instagram" | "Facebook";
  /** Public handle or page name */
  handle: string;
  url: string;
}

export const SOCIAL: readonly SocialProfile[] = [
  {
    name: "LinkedIn",
    handle: "Wenosoft Technologies",
    url: "https://www.linkedin.com/company/wenosoft-technologies",
  },
  {
    name: "X",
    handle: "@Wenosoft_tech",
    url: "https://x.com/Wenosoft_tech",
  },
  {
    name: "Instagram",
    handle: "@wenosoft_technologies",
    url: "https://www.instagram.com/wenosoft_technologies/",
  },
  {
    name: "Facebook",
    handle: "Wenosoft Technologies",
    url: "https://web.facebook.com/profile.php?id=61591326336019",
  },
] as const;

/** Twitter/X handle for twitter:site cards */
export const TWITTER_HANDLE = "@Wenosoft_tech";
