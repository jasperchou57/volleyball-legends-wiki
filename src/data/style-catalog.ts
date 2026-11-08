// Source scope and limitations: review-notes/styles-directory-2026-11-08.json.
// Basic community-documented identities, not a live balance/stat verification.
export type CatalogEntry = {
  slug: string; name: string; rarity: string; roles: string[];
  mechanic: string; constraint: string; aliases?: string[];
};
export const additionalStyles: CatalogEntry[] = [
  { slug: "hakka", name: "Hakka", rarity: "Ultra", roles: ["Setter"], mechanic: "Use a clone to make a follow-up touch after setting.", constraint: "Plan where the clone will meet the ball after your set." },
  { slug: "timeskip-hinto", name: "Timeskip Hinto", rarity: "Secret", roles: ["Spiker"], aliases: ["Timeskip Hinoto"], mechanic: "Movement charges Super Spike for a stronger attack.", constraint: "Build the charge before jumping to meet the set." },
  { slug: "kazana", name: "Kazana", rarity: "Secret", roles: ["Spiker"], mechanic: "Hold jump to charge Super Jump, then release to reach higher.", constraint: "Allow time to charge before committing to an attack." },
  { slug: "ibara", name: "Ibara", rarity: "Secret", roles: ["Blocker", "Spiker"], mechanic: "Vine Walls can block and redirect the ball at the net.", constraint: "Position the wall to cover the incoming attack." },
  { slug: "kumo", name: "Kumo", rarity: "Secret", roles: ["Libero", "Setter"], mechanic: "Moonball Bump lifts the receive, while Boost helps teammates reach the ball.", constraint: "Coordinate the follow-up touch with your teammate." },
  { slug: "yomosuke", name: "Yomosuke", rarity: "Legendary", roles: ["Libero"], aliases: ["Yomomute"], mechanic: "Receive-focused style for recovering balls and keeping rallies alive.", constraint: "Prioritize back-row coverage and the next pass to your setter." },
  { slug: "hinto", name: "Hinto", rarity: "Common", roles: ["All-Rounder"], aliases: ["Hinoto"], mechanic: "A balanced starting style for learning serves, receives, sets, and spikes.", constraint: "Build reliable basic touches before choosing a specialist role." },
  { slug: "tonkura", name: "Tonkura", rarity: "Common", roles: ["Spiker"], aliases: ["Tonoko"], mechanic: "Attack-focused Common style for finishing a teammate’s set.", constraint: "Focus on approaching the net and timing your spike." },
  { slug: "hakochi", name: "Hakochi", rarity: "Common", roles: ["Blocker"], aliases: ["Haibo"], mechanic: "Block-focused Common style for covering attacks at the net.", constraint: "Watch the spiker’s approach before committing to a block." },
  { slug: "kishoti", name: "Kishoti", rarity: "Common", roles: ["Libero", "Blocker"], aliases: ["Kito"], mechanic: "Defensive Common style with receiving and blocking options.", constraint: "Choose between back-row coverage and net defense to fit your team." },
  { slug: "ninyoku", name: "Ninyoku", rarity: "Rare", roles: ["Libero"], aliases: ["Nichonayo"], mechanic: "Receiving and diving are Ninyoku’s main strengths.", constraint: "Use it to cover difficult returns and pass to your setter." },
  { slug: "tsuchiro", name: "Tsuchiro", rarity: "Rare", roles: ["Setter", "Blocker"], aliases: ["Tsuzichiwa"], mechanic: "A Rare option for setting up attacks and blocking at the net.", constraint: "Coordinate with your spiker so you can prepare the next set." },
  { slug: "oyatsu", name: "Oyatsu", rarity: "Rare", roles: ["Server"], aliases: ["Ojiri"], mechanic: "Serve-focused Rare style for players practicing serve placement and timing.", constraint: "Serving is one part of a rally; keep working on your receiving and setting." },
  { slug: "imaezi", name: "Imaezi", rarity: "Rare", roles: ["Spiker"], aliases: ["Iwaezeni"], mechanic: "A Rare attacking option focused on jumps and spikes.", constraint: "Work with a setter to get into position for an attack." },
  { slug: "riku", name: "Riku", rarity: "Secret", roles: ["Spiker"], mechanic: "Hologram Walls let spikes ricochet off the sides of the court.", constraint: "Aim for the return angle rather than only the first direction of the spike." },
  { slug: "shiro", name: "Shiro", rarity: "Secret", roles: ["Blocker", "Setter"], mechanic: "Switch between Slam Block and Boosted Block to return the ball down or set up a stronger follow-up touch.", constraint: "Choose the block mode to suit the next touch your team needs." },
];

export const styleAliases: Record<string, string[]> = {
  kyoshin: ["Kosumi"], sagafura: ["Sagafura"], "timeskip-okazu": ["TSO", "Timeskip Oigawa"],
  "timeskip-kyamo": ["Timeskip Kagayomo"], kyamo: ["Kagayomo"], okazu: ["Oigawa"],
  sanju: ["Sanu"], kisuki: ["Kimiro"], bakuri: ["Butoku"], uchikai: ["Uchisima"],
  yokai: ["Yabu"], kozei: ["Kuzee"], azmei: ["Azamena"], sagumi: ["Saguwuru"],
  yachikusai: ["Yamegushi"],
  ...Object.fromEntries(additionalStyles.map(style => [style.slug, style.aliases ?? []])),
};

// Do not carry disputed mastery/action counts into the directory or comparator.
export const conciseMechanics: Record<string, string> = {
  akari: "Dash changes your position on the ground or in the air, helping you reach the next touch.",
  ronin: "Hold the spike input in the air to charge a stronger hit.",
};
export const catalogRoles: Record<string, string[]> = {
  yachikusai: ["Server", "Blocker"],
  okazu: ["Setter", "Server"],
  kyamo: ["Setter", "Server"],
  "timeskip-kyamo": ["Setter", "Server"],
  "timeskip-okazu": ["Setter", "Server"],
  twins: ["Setter", "Server", "Spiker", "Blocker"],
  jinko: ["Spiker", "Server"],
};
