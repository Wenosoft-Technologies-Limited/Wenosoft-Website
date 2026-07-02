export const CONTACT = {
  email: "info@wenosoft.com",
  website: "wenosoft.com",
  founder: "Henry Ozomgbachi",
  get mailto() {
    return `mailto:${this.email}?subject=${encodeURIComponent("Project inquiry for Wenosoft")}&body=${encodeURIComponent(
      "Hi Wenosoft team,\n\nI'd like to discuss a project. Here are a few details:\n\n• Company:\n• What we're trying to build:\n• Timeline / budget:\n• Best way to reach me:\n\nThanks!",
    )}`;
  },
} as const;

export const SITE = {
  name: "Wenosoft Technologies",
  tagline: "Clarity out of complexity",
  description:
    "Wenosoft Technologies is a software development and technology consulting partner that bridges the ability to think with the ability to build.",
  url: "https://wenosoft.com",
} as const;
