export type SourceTier = "Official" | "Community" | "Site";
export type StyleRarity = "Common" | "Rare" | "Legendary" | "Godly" | "Secret" | "Ultra" | "Evo";
export type Role = "Spiker" | "Setter" | "Libero" | "All-Rounder" | "Blocker";
export type CommunityTier = "S" | "A" | "B" | "C";

export type StatKey =
  | "Block"
  | "Bump"
  | "Dive"
  | "Jump"
  | "Serve"
  | "Set"
  | "Speed"
  | "Spike"
  | "Tilt";

export interface QueryChip {
  label: string;
  href: string;
}

export interface CodeEntry {
  code: string;
  reward: string;
  releaseDate: string;
  status: "Active" | "Verify";
}

export interface ExpiredCodeEntry {
  code: string;
  reward: string;
  releaseDate: string;
  expiredNote?: string;
}

export interface StyleEntry {
  slug: string;
  name: string;
  rarity: StyleRarity;
  role: Role;
  communityTier: CommunityTier;
  summary: string;
  signature: string;
  whyPlayersSearch: string;
  availability: string;
  sourceTier: SourceTier;
  bestAbilities: string[];
  bestRoles: Role[];
  searchTerms: string[];
  scores: {
    offense: number;
    control: number;
    defense: number;
    mobility: number;
    difficulty: number;
  };
  stats?: Partial<Record<StatKey, number>>;
}

export interface AbilityEntry {
  slug: string;
  name: string;
  rarity: StyleRarity;
  kind: "Offense" | "Defense" | "Utility" | "Movement";
  communityTier: CommunityTier;
  summary: string;
  whyItMatters: string;
  sourceTier: SourceTier;
  bestWith: string[];
  searchTerms: string[];
}

export interface UpdateEntry {
  slug: string;
  title: string;
  published: string;
  summary: string;
  sourceTier: SourceTier;
  highlights: string[];
  codes: string[];
  focusStyles?: string[];
}

export interface PatchDiffRow {
  field: string;
  before: string;
  after: string;
  delta: string;
}

export interface PatchDiffSection {
  fromSlug: string;
  toSlug: string;
  label: string;
  summary: string;
  rows: PatchDiffRow[];
}

export type TradeValueTier = "T1" | "T2" | "T3" | "T4" | "T5";
export type Obtainability = "Permanent" | "Limited" | "Unobtainable";
export type Demand = "High" | "Medium" | "Low";

export interface TradeValueEntry {
  styleSlug: string;
  rarity: StyleRarity;
  obtainability: Obtainability;
  valueTier: TradeValueTier;
  demand: Demand;
  note: string;
}

export interface DatamineSource {
  label: string;
  url: string;
  kind: "Official" | "Community";
  watchFor: string;
}

export interface HeroImage {
  cdnUrl: string;
  alt: string;
}

export interface OfficialSnapshot {
  snapshotDateLabel: string;
  gameUpdatedIso: string;
  gameUpdatedLabel: string;
  playing: number;
  visits: number;
  favorites: number;
  upVotes: number;
  downVotes: number;
  groupMembers: number;
  mediaImages: number;
  mediaVideos: number;
  latestPublicPatch: string;
  latestPublicPatchDate: string;
  note: string;
}

export const siteConfig = {
  name: "Volleyball Legends Wiki",
  domain: "https://www.volleyballlegends.wiki",
  subtitle: "Codes, Styles, Abilities, Tier Lists & Update Guides",
  updateSchedule: "Weekly Saturdays at 11:30 AM ET",
  officialLinks: {
    discord: "https://discord.com/servers/volleyball-legends-1328110081136398427",
    roblox: "https://www.roblox.com/games/73956553001240/Volleyball-Legends",
    group: "https://www.roblox.com/id/communities/35330702/Volleyball-Game-Group",
  },
};

export const officialSnapshot: OfficialSnapshot = {
  snapshotDateLabel: "April 17, 2026",
  gameUpdatedIso: "2026-04-18T00:14:18.8204319Z",
  gameUpdatedLabel: "April 17, 2026 at 5:14 PM PT",
  playing: 45914,
  visits: 3217583712,
  favorites: 4425599,
  upVotes: 2333699,
  downVotes: 109309,
  groupMembers: 4107345,
  mediaImages: 9,
  mediaVideos: 1,
  latestPublicPatch: "Update 65 / Season 14 / Easter Update",
  latestPublicPatchDate: "April 11, 2026",
  note: "Roblox shows a newer game-page update on April 17, 2026, but no public Update 66 announcement was indexed when this snapshot was recorded. Treat it as an unlabeled hotfix or staging change until the official Discord says otherwise.",
};

export const mainQueryChips: QueryChip[] = [
  { label: "volleyball legends codes", href: "/codes" },
  { label: "volleyball legends styles", href: "/styles" },
  { label: "volleyball legends tier list", href: "/tier-list/styles" },
  { label: "volleyball legends discord", href: "/guides/discord" },
  { label: "volleyball legends ranks", href: "/guides/ranks" },
  { label: "volleyball legends controls", href: "/guides/controls" },
  { label: "volleyball legends pity", href: "/guides/pity-system" },
  { label: "volleyball legends update 65", href: "/updates/update-65-season-14" },
  { label: "volleyball legends season 14", href: "/updates/update-65-season-14" },
  { label: "volleyball legends encho", href: "/styles/encho" },
];

export const trendingQueryChips: QueryChip[] = [
  { label: "volleyball legends codes update 65", href: "/codes" },
  { label: "season 14", href: "/updates/update-65-season-14" },
  { label: "easter season", href: "/updates/update-65-season-14" },
  { label: "chaos mode", href: "/updates/update-65-season-14" },
  { label: "tournament week", href: "/updates/update-64-tournament-week" },
  { label: "challenger tokens", href: "/updates/update-64-tournament-week" },
  { label: "encho evo rarity", href: "/updates/update-63-encho-evo" },
  { label: "twins return", href: "/updates/update-64-tournament-week" },
];

export const activeCodes: CodeEntry[] = [
  {
    code: "UPDATE_65",
    reward: "5 Lucky Style Spins",
    releaseDate: "April 11, 2026",
    status: "Active",
  },
  {
    code: "SEASON_14",
    reward: "5 Lucky Style Spins",
    releaseDate: "April 11, 2026",
    status: "Active",
  },
  {
    code: "EASTER_UPDATE",
    reward: "5 Lucky Ability Spins",
    releaseDate: "April 11, 2026",
    status: "Active",
  },
  {
    code: "UPDATE_64",
    reward: "5 Lucky Style Spins",
    releaseDate: "April 4, 2026",
    status: "Active",
  },
  {
    code: "TOURNAMENTS",
    reward: "5 Lucky Style Spins",
    releaseDate: "April 4, 2026",
    status: "Active",
  },
  {
    code: "CHALLENGER",
    reward: "5 Lucky Ability Spins",
    releaseDate: "April 4, 2026",
    status: "Active",
  },
  {
    code: "UPDATE_63",
    reward: "5 Lucky Style Spins",
    releaseDate: "March 28, 2026",
    status: "Verify",
  },
  {
    code: "EVO_RARITY",
    reward: "5 Lucky Style Spins",
    releaseDate: "March 28, 2026",
    status: "Verify",
  },
  {
    code: "STRETCH",
    reward: "5 Lucky Ability Spins",
    releaseDate: "March 28, 2026",
    status: "Verify",
  },
  {
    code: "UPDATE_62",
    reward: "5 Lucky Style Spins",
    releaseDate: "March 21, 2026",
    status: "Verify",
  },
  {
    code: "MIKAGE_IS_BACK",
    reward: "5 Lucky Style Spins",
    releaseDate: "March 21, 2026",
    status: "Verify",
  },
  {
    code: "BALL_MACHINES",
    reward: "5 Lucky Ability Spins",
    releaseDate: "March 21, 2026",
    status: "Verify",
  },
  {
    code: "UPDATE_61",
    reward: "5 Lucky Style Spins",
    releaseDate: "March 14, 2026",
    status: "Verify",
  },
  {
    code: "SEASON_13",
    reward: "5 Lucky Style Spins",
    releaseDate: "March 14, 2026",
    status: "Verify",
  },
  {
    code: "STPATRICKS_DAY",
    reward: "5 Lucky Ability Spins",
    releaseDate: "March 14, 2026",
    status: "Verify",
  },
];

export const expiredCodes: ExpiredCodeEntry[] = [
  { code: "UPDATE_60", reward: "5 Lucky Style Spins", releaseDate: "March 7, 2026", expiredNote: "Released with Update 60 (Kijo)." },
  { code: "KIJO", reward: "5 Lucky Style Spins", releaseDate: "March 7, 2026", expiredNote: "Launch code for the Kijo limited Secret." },
  { code: "SUPER_TILTS", reward: "5 Lucky Ability Spins", releaseDate: "March 7, 2026", expiredNote: "Teased the new Super Tilt mechanic." },
  { code: "UPDATE_59", reward: "5 Lucky Style Spins", releaseDate: "March 1, 2026", expiredNote: "Update 59 (Taichou 2026, Duels)." },
  { code: "TAICHOU_2026", reward: "5 Lucky Style Spins", releaseDate: "March 1, 2026" },
  { code: "DUELS", reward: "5 Lucky Ability Spins", releaseDate: "March 1, 2026", expiredNote: "Celebrated the 1v1 Duels mode." },
  { code: "UPDATE_58", reward: "5 Lucky Style Spins", releaseDate: "February 22, 2026" },
  { code: "RONIN", reward: "5 Lucky Style Spins", releaseDate: "February 22, 2026", expiredNote: "Launch code for Ronin." },
  { code: "THUNDER_SPIKE", reward: "5 Lucky Ability Spins", releaseDate: "February 22, 2026" },
  { code: "UPDATE_56", reward: "5 Lucky Style Spins", releaseDate: "February 7, 2026", expiredNote: "Update 56 (Jinko Return, Lead Feet)." },
  { code: "LEAD_FEET", reward: "5 Lucky Ability Spins", releaseDate: "February 7, 2026" },
  { code: "LIMITED_ABILITY", reward: "5 Lucky Ability Spins", releaseDate: "February 7, 2026" },
];

export const featuredStyles: StyleEntry[] = [
  {
    slug: "encho",
    name: "Encho",
    rarity: "Evo",
    role: "All-Rounder",
    communityTier: "S",
    summary: "The game's first-ever Evo rarity style. An All-Rounder with the Stretch mechanic that extends arms mid-air for a larger hitbox on blocks, spikes, serves and sets.",
    signature: "Stretch: arms extend mid-air to dramatically enlarge the active hitbox, letting Encho reach balls no other style can touch.",
    whyPlayersSearch: "Encho was the first style released at the new Evo rarity introduced in Update 63, making it a milestone lookup. Drop rate on Lucky Spins was roughly 0.25% during its window — far rarer than Secret — and it went permanently unobtainable on April 11, 2026 at 11:30 AM ET.",
    availability: "Permanently unobtainable. Encho left the game at the Update 65 / Season 14 reset on April 11, 2026 at 11:30 AM ET. If you did not roll it during the Update 63 window, it is gone for good.",
    sourceTier: "Community",
    bestAbilities: ["redirection-jump", "magnetic-pull", "divine-strength"],
    bestRoles: ["All-Rounder", "Blocker", "Spiker"],
    searchTerms: ["encho volleyball legends", "encho stats", "encho evo rarity", "how to get encho", "is encho still obtainable"],
    scores: { offense: 9, control: 9, defense: 9, mobility: 7, difficulty: 8 },
    stats: { Block: 90, Bump: 80, Dive: 75, Jump: 95, Serve: 85, Set: 80, Speed: 65, Spike: 90, Tilt: 80 },
  },
  {
    slug: "twins",
    name: "Twins",
    rarity: "Secret",
    role: "All-Rounder",
    communityTier: "S",
    summary: "Dual-character limited Secret style that rotates back into the pool during Tournament Week and similar event windows.",
    signature: "Twins use swap-based plays: community writeups describe coordinated positioning and shared ability triggers between the two characters.",
    whyPlayersSearch: "Twins is a returning limited Secret that draws heavy search traffic every time its return window is announced. Most recently returned during Update 64 Tournament Week and left again on April 11, 2026 at 11:30 AM ET.",
    availability: "Returning limited. Last rotated into the game during Update 64 (April 4 — April 11, 2026). Not currently obtainable as of Update 65; watch the event calendar for the next rotation.",
    sourceTier: "Community",
    bestAbilities: ["team-spirit", "lead-feet", "redirection-jump"],
    bestRoles: ["All-Rounder", "Spiker"],
    searchTerms: ["twins volleyball legends", "twins return", "twins stats", "when do twins come back volleyball legends"],
    scores: { offense: 9, control: 8, defense: 7, mobility: 8, difficulty: 8 },
    stats: { Block: 70, Bump: 70, Dive: 70, Jump: 90, Serve: 80, Set: 70, Speed: 80, Spike: 90, Tilt: 80 },
  },
  {
    slug: "kijo",
    name: "Kijo",
    rarity: "Secret",
    role: "Spiker",
    communityTier: "S",
    summary: "High-skill secret spiker built around charged super tilts and explosive point-ending pressure.",
    signature: "Hold a tilt direction to charge a super tilt that sends the ball much farther left or right.",
    whyPlayersSearch: "Kijo is the current breakout query because Update 60 introduced her as a limited secret style with a brand-new super tilt mechanic.",
    availability: "Originally released in Update 60 (March 7, 2026) as a limited Secret. Her launch window has closed; track the returning-limited watchlist for her next rotation.",
    sourceTier: "Community",
    bestAbilities: ["lead-feet", "redirection-jump", "shield-breaker"],
    bestRoles: ["Spiker"],
    searchTerms: ["kijo volleyball legends", "kijo stats", "kijo vbl"],
    scores: { offense: 10, control: 8, defense: 3, mobility: 8, difficulty: 9 },
    stats: { Block: 0, Jump: 100, Speed: 70, Bump: 40, Serve: 80, Set: 20, Spike: 100, Dive: 70, Tilt: 100 },
  },
  {
    slug: "jinko",
    name: "Jinko",
    rarity: "Secret",
    role: "Spiker",
    communityTier: "S",
    summary: "Curve-focused secret spiker that bends serves and spikes into nasty off-angle lanes.",
    signature: "Tilt in different directions to add curve, backspin, or float behavior to serves and spikes.",
    whyPlayersSearch: "Jinko has durable long-tail demand because players keep searching for curve tech, return windows, and whether the style is still worth rerolling for.",
    availability: "Previously limited; community pages treat returns as event windows rather than permanent pool access.",
    sourceTier: "Community",
    bestAbilities: ["curve-spike", "lead-feet", "redirection-jump"],
    bestRoles: ["Spiker", "All-Rounder"],
    searchTerms: ["jinko volleyball legends", "jinko stats volleyball legends", "how to use jinko volleyball legends"],
    scores: { offense: 9, control: 9, defense: 5, mobility: 4, difficulty: 8 },
    stats: { Block: 50, Bump: 50, Dive: 50, Jump: 100, Serve: 100, Set: 40, Speed: 30, Spike: 100, Tilt: 100 },
  },
  {
    slug: "ronin",
    name: "Ronin",
    rarity: "Ultra",
    role: "Spiker",
    communityTier: "S",
    summary: "Power-hitter ultra style with mastery scaling and some of the cleanest raw spike pressure in the game.",
    signature: "Hold click to charge a super spike, then unlock a stronger knockback version at higher mastery.",
    whyPlayersSearch: "Ronin is searched heavily whenever players want a simpler offensive carry style with direct mastery payoff.",
    availability: "Usually handled as a limited Ultra banner during its featured update window.",
    sourceTier: "Community",
    bestAbilities: ["shield-breaker", "boom-jump", "redirection-jump"],
    bestRoles: ["Spiker"],
    searchTerms: ["ronin volleyball legends", "volleyball legends ronin", "ronin stats volleyball legends"],
    scores: { offense: 10, control: 5, defense: 4, mobility: 5, difficulty: 6 },
    stats: { Block: 40, Jump: 100, Speed: 40, Bump: 40, Serve: 80, Set: 40, Spike: 100, Dive: 40 },
  },
  {
    slug: "kyamo",
    name: "Kyamo",
    rarity: "Godly",
    role: "Setter",
    communityTier: "A",
    summary: "Classic setter pick with elite set quality and enough serve pressure to stay relevant in ranked.",
    signature: "Fast, reliable sets plus enough movement to keep plays stable in 2v2 and 4v4 queues.",
    whyPlayersSearch: "Kyamo keeps showing up in queries because players want a reliable setter baseline before chasing rarer secret setters.",
    availability: "Permanent Godly pool in most community references, with timeskip versions rotating separately.",
    sourceTier: "Community",
    bestAbilities: ["zero-gravity-set", "magnetic-pull", "steel-block"],
    bestRoles: ["Setter"],
    searchTerms: ["kyamo volleyball legends", "timeskip kyamo", "best setter volleyball legends"],
    scores: { offense: 5, control: 10, defense: 7, mobility: 7, difficulty: 5 },
    stats: { Block: 80, Bump: 45, Dive: 70, Jump: 80, Serve: 80, Set: 100, Speed: 70, Spike: 50 },
  },
  {
    slug: "kisuki",
    name: "Kisuki",
    rarity: "Secret",
    role: "Libero",
    communityTier: "S",
    summary: "Back-row monster with ridiculous dive coverage, top-end speed, and elite receive utility.",
    signature: "Charge a super dive that can cover almost the entire court while also increasing dive hitbox size.",
    whyPlayersSearch: "Kisuki is the default answer whenever players ask how to counter huge serves or want a ranked-safe defensive style.",
    availability: "Community pages describe Kisuki as one of the permanent secret styles.",
    sourceTier: "Community",
    bestAbilities: ["steel-block", "magnetic-pull", "lead-feet"],
    bestRoles: ["Libero", "Setter"],
    searchTerms: ["kisuki volleyball legends", "kisuki stats volleyball legends", "best libero volleyball legends"],
    scores: { offense: 4, control: 9, defense: 10, mobility: 10, difficulty: 7 },
    stats: { Block: 20, Bump: 100, Dive: 250, Jump: 70, Serve: 75, Set: 100, Speed: 100, Spike: 45 },
  },
  {
    slug: "feiko",
    name: "Feiko",
    rarity: "Secret",
    role: "Setter",
    communityTier: "A",
    summary: "Aggressive setter that turns dump plays into a real scoring threat instead of pure support.",
    signature: "Swap between normal jump sets and fast, high-gravity dump sets that fall sharply into open space.",
    whyPlayersSearch: "Feiko has sticky search demand because players want a setter that can still threaten points without handing initiative away.",
    availability: "Usually tracked as a limited secret style during its featured window.",
    sourceTier: "Community",
    bestAbilities: ["zero-gravity-set", "lead-feet", "magnetic-pull"],
    bestRoles: ["Setter", "All-Rounder"],
    searchTerms: ["feiko volleyball legends", "feiko stats volleyball legends", "secret setter volleyball legends"],
    scores: { offense: 6, control: 10, defense: 5, mobility: 8, difficulty: 8 },
    stats: { Block: 20, Jump: 100, Speed: 80, Bump: 30, Serve: 80, Spike: 40, Dive: 60, Set: 100 },
  },
  {
    slug: "sanju",
    name: "Sanju",
    rarity: "Secret",
    role: "Spiker",
    communityTier: "S",
    summary: "Tilt-heavy secret hitter that rewards fast reads, precise timing, and creative angle manipulation.",
    signature: "Mid-air tilt control lets Sanju reshape spike paths and punish blockers who commit too early.",
    whyPlayersSearch: "Players search Sanju when they want a straight-up offensive secret without giving up too much speed.",
    availability: "Often discussed as one of the permanent secret styles in community resources.",
    sourceTier: "Community",
    bestAbilities: ["curve-spike", "redirection-jump", "shield-breaker"],
    bestRoles: ["Spiker"],
    searchTerms: ["sanju volleyball legends", "sanju stats volleyball legends", "best spiker volleyball legends"],
    scores: { offense: 9, control: 8, defense: 4, mobility: 10, difficulty: 8 },
    stats: { Block: 50, Bump: 40, Dive: 50, Jump: 100, Serve: 90, Set: 40, Speed: 100, Spike: 90, Tilt: 100 },
  },
  {
    slug: "yogan",
    name: "Yogan",
    rarity: "Secret",
    role: "All-Rounder",
    communityTier: "A",
    summary: "Rage-based secret style that spikes much harder once you manage the meter correctly.",
    signature: "Build rage through touches or dives, then temporarily push every stat toward full power.",
    whyPlayersSearch: "Yogan pulls interest from players who want a secret style that can flex between offense and emergency defense.",
    availability: "Community sources usually treat Yogan as a limited return style.",
    sourceTier: "Community",
    bestAbilities: ["lead-feet", "shield-breaker", "boom-jump"],
    bestRoles: ["All-Rounder", "Spiker"],
    searchTerms: ["yogan volleyball legends", "yogan stats volleyball legends", "rage mode volleyball legends"],
    scores: { offense: 8, control: 6, defense: 6, mobility: 6, difficulty: 8 },
    stats: { Block: 50, Bump: 45, Dive: 55, Jump: 100, Serve: 75, Set: 55, Speed: 45, Spike: 85 },
  },
  {
    slug: "okazu",
    name: "Okazu",
    rarity: "Godly",
    role: "Setter",
    communityTier: "A",
    summary: "Godly setter-server hybrid with premium serve and set numbers for players who like tempo control.",
    signature: "One of the cleanest serve-setting packages below the secret tier, especially for organized teams.",
    whyPlayersSearch: "Okazu stays relevant because players often hit this style before secrets and want to know if it is worth keeping.",
    availability: "Permanent Godly style according to community wiki pages.",
    sourceTier: "Community",
    bestAbilities: ["zero-gravity-set", "curve-spike", "magnetic-pull"],
    bestRoles: ["Setter"],
    searchTerms: ["okazu volleyball legends", "okazu stats volleyball legends", "oigawa volleyball legends"],
    scores: { offense: 5, control: 9, defense: 6, mobility: 5, difficulty: 5 },
    stats: { Block: 90, Bump: 40, Dive: 45, Jump: 100, Serve: 100, Set: 90, Speed: 50, Spike: 40 },
  },
  {
    slug: "uchikai",
    name: "Uchikai",
    rarity: "Legendary",
    role: "Spiker",
    communityTier: "B",
    summary: "High-spike legendary with straightforward offense and a very clear front-row identity for players climbing out of the early game.",
    signature: "One of the cleanest pure-spike stat packages in the Legendary pool, with enough jump to stay threatening at the net.",
    whyPlayersSearch: "Uchikai keeps showing up in search because it is a common 'is this good enough to keep?' legendary pull and a natural comparison point against higher-tier spikers.",
    availability: "Permanent Legendary pool in community sources.",
    sourceTier: "Community",
    bestAbilities: ["boom-jump", "shield-breaker", "redirection-jump"],
    bestRoles: ["Spiker", "Blocker"],
    searchTerms: ["uchikai volleyball legends", "uchikai stats volleyball legends", "best legendary spiker volleyball legends"],
    scores: { offense: 8, control: 3, defense: 5, mobility: 5, difficulty: 4 },
    stats: { Block: 50, Bump: 40, Dive: 50, Jump: 70, Serve: 50, Set: 40, Speed: 50, Spike: 100 },
  },
  {
    slug: "kyoshin",
    name: "Kyoshin",
    rarity: "Legendary",
    role: "Libero",
    communityTier: "C",
    summary: "Defensive legendary with decent dive and set support, but very limited scoring pressure.",
    signature: "Safe ball control and rally extension, especially for newer players learning rotation discipline.",
    whyPlayersSearch: "Kyoshin shows up in long-tail searches because it is a common stepping-stone legendary and many players want to know when to move on.",
    availability: "Permanent Legendary pool in community references.",
    sourceTier: "Community",
    bestAbilities: ["steel-block", "magnetic-pull", "lead-feet"],
    bestRoles: ["Libero", "Setter"],
    searchTerms: ["kyoshin volleyball legends", "kyoshin stats volleyball legends", "kosumi volleyball legends"],
    scores: { offense: 2, control: 7, defense: 7, mobility: 5, difficulty: 3 },
    stats: { Block: 50, Bump: 65, Dive: 80, Jump: 70, Serve: 10, Set: 70, Speed: 50, Spike: 40 },
  },
  {
    slug: "yokai",
    name: "Yokai",
    rarity: "Legendary",
    role: "All-Rounder",
    communityTier: "B",
    summary: "Fast flex pick that thrives on movement and floor coverage more than raw serve pressure.",
    signature: "High speed lets Yokai cover transitions and chase second-ball opportunities all match long.",
    whyPlayersSearch: "Yokai gets searched because it looks exciting on paper and players want to know if speed-heavy legendary styles can survive ranked.",
    availability: "Permanent Legendary pool in community lists.",
    sourceTier: "Community",
    bestAbilities: ["magnetic-pull", "lead-feet", "boom-jump"],
    bestRoles: ["All-Rounder", "Libero"],
    searchTerms: ["yokai volleyball legends", "yokai stats volleyball legends"],
    scores: { offense: 5, control: 6, defense: 7, mobility: 10, difficulty: 5 },
    stats: { Speed: 100, Bump: 85, Dive: 85 },
  },
  {
    slug: "kozei",
    name: "Kozei",
    rarity: "Legendary",
    role: "Spiker",
    communityTier: "B",
    summary: "Straightforward legendary hitter with enough jump, block, and serve to carry casual queues.",
    signature: "Big first-contact stats make Kozei a comfortable bridge between beginner pulls and true endgame styles.",
    whyPlayersSearch: "Kozei is a classic 'is this good enough to keep?' keyword because it sits right on the edge of competitive viability.",
    availability: "Permanent Legendary pool in community tier lists.",
    sourceTier: "Community",
    bestAbilities: ["boom-jump", "steel-block", "curve-spike"],
    bestRoles: ["Spiker", "Blocker"],
    searchTerms: ["kozei volleyball legends", "kozei stats volleyball legends"],
    scores: { offense: 7, control: 4, defense: 6, mobility: 6, difficulty: 4 },
    stats: { Jump: 100, Block: 70, Serve: 80, Spike: 80 },
  },
  {
    slug: "azmei",
    name: "Azmei",
    rarity: "Legendary",
    role: "Spiker",
    communityTier: "B",
    summary: "High-serve, high-spike legendary that is easier to pilot than most secrets and ultras.",
    signature: "Simple pressure package: big serve, hard contact, and enough offense to punish weaker ranked lobbies.",
    whyPlayersSearch: "Azmei pulls steady traffic because it is one of the more attractive legendary stops before you commit to secret pity grinding.",
    availability: "Permanent Legendary pool in community lists.",
    sourceTier: "Community",
    bestAbilities: ["boom-jump", "curve-spike", "shield-breaker"],
    bestRoles: ["Spiker"],
    searchTerms: ["azmei volleyball legends", "azmei stats volleyball legends"],
    scores: { offense: 8, control: 4, defense: 4, mobility: 5, difficulty: 4 },
    stats: { Spike: 90, Serve: 90, Bump: 50 },
  },
  {
    slug: "sagumi",
    name: "Sagumi",
    rarity: "Common",
    role: "All-Rounder",
    communityTier: "B",
    summary: "Balanced common style that gives beginners a playable mix of set, spike, and serve without forcing one narrow role.",
    signature: "A clean all-round stat spread that makes Sagumi one of the easiest early styles to learn match flow with.",
    whyPlayersSearch: "Sagumi earns search demand because newer players keep landing on it early and want to know whether it is the best common style to keep.",
    availability: "Permanent Common pool in community-tracked style directories.",
    sourceTier: "Community",
    bestAbilities: ["super-sprint", "boom-jump", "team-spirit"],
    bestRoles: ["All-Rounder", "Setter"],
    searchTerms: ["sagumi volleyball legends", "best common style volleyball legends", "saguwuru volleyball legends"],
    scores: { offense: 5, control: 7, defense: 5, mobility: 5, difficulty: 2 },
    stats: { Block: 50, Bump: 45, Dive: 55, Jump: 50, Serve: 50, Set: 75, Speed: 45, Spike: 70 },
  },
  {
    slug: "yachikusai",
    name: "Yachikusai",
    rarity: "Common",
    role: "All-Rounder",
    communityTier: "C",
    summary: "Serve-leaning common style that helps early players win cheap points before they have real endgame tools.",
    signature: "Its easiest value comes from simple serve pressure rather than flashy combo routes or advanced playmaking.",
    whyPlayersSearch: "Yachikusai appears in beginner searches because many players want to know if a strong common server can carry the first few ranked brackets.",
    availability: "Permanent Common pool in community references.",
    sourceTier: "Community",
    bestAbilities: ["super-sprint", "team-spirit", "boom-jump"],
    bestRoles: ["All-Rounder", "Spiker"],
    searchTerms: ["yachikusai volleyball legends", "yamegushi volleyball legends", "best serve style volleyball legends"],
    scores: { offense: 5, control: 4, defense: 4, mobility: 5, difficulty: 2 },
    stats: { Block: 50, Bump: 70, Dive: 50, Jump: 75, Serve: 75, Set: 30, Speed: 50, Spike: 40 },
  },
  {
    slug: "sagafura",
    name: "Sagafura",
    rarity: "Legendary",
    role: "Setter",
    communityTier: "A",
    summary: "Legendary playmaking style with strong bump, set, and speed numbers for players who want support value without rolling Godly or Secret.",
    signature: "High set and bump stats make it a clean bridge between budget styles and the premium Kyamo line.",
    whyPlayersSearch: "Sagafura keeps showing up in long-tail searches because players compare it directly with Kyamo, Kosumi, and other ranked-safe support picks.",
    availability: "Permanent Legendary pool in community style lists.",
    sourceTier: "Community",
    bestAbilities: ["zero-gravity-set", "magnetic-pull", "team-spirit"],
    bestRoles: ["Setter", "Libero"],
    searchTerms: ["sagafura volleyball legends", "sagafura stats volleyball legends", "best legendary setter volleyball legends"],
    scores: { offense: 3, control: 8, defense: 8, mobility: 10, difficulty: 4 },
    stats: { Block: 50, Bump: 70, Dive: 80, Jump: 50, Serve: 10, Set: 75, Speed: 100, Spike: 40 },
  },
  {
    slug: "kosumi",
    name: "Kosumi",
    rarity: "Legendary",
    role: "Setter",
    communityTier: "A",
    summary: "Another high-value Legendary playmaker with strong control and better long-rally utility than most offensive ladders.",
    signature: "Kosumi wins through stable touches and cleaner setups more than raw scoring pressure.",
    whyPlayersSearch: "Kosumi has steady search demand because players who roll it want to know if they can stop spending and pivot into ranked support instead.",
    availability: "Permanent Legendary pool in community pages.",
    sourceTier: "Community",
    bestAbilities: ["zero-gravity-set", "magnetic-pull", "steel-block"],
    bestRoles: ["Setter", "Libero"],
    searchTerms: ["kosumi volleyball legends", "kosumi stats volleyball legends", "best playmaking style volleyball legends"],
    scores: { offense: 3, control: 8, defense: 7, mobility: 8, difficulty: 4 },
    stats: { Block: 50, Bump: 70, Dive: 70, Jump: 50, Serve: 25, Set: 80, Speed: 85, Spike: 35 },
  },
  {
    slug: "bakuri",
    name: "Bakuri",
    rarity: "Godly",
    role: "Spiker",
    communityTier: "A",
    summary: "High-pressure Godly spiker with maxed jump and spike plus enough serve threat to stay scary in ranked.",
    signature: "Bakuri is the classic finish-the-play style for teams that already have a real setter.",
    whyPlayersSearch: "Bakuri remains a core comparison page because players treat it as the benchmark for whether a non-secret offensive style is worth keeping.",
    availability: "Permanent Godly pool in community references.",
    sourceTier: "Community",
    bestAbilities: ["divine-strength", "shield-breaker", "boom-jump"],
    bestRoles: ["Spiker", "Blocker"],
    searchTerms: ["bakuri volleyball legends", "bakuri stats volleyball legends", "best godly spiker volleyball legends"],
    scores: { offense: 9, control: 4, defense: 5, mobility: 5, difficulty: 5 },
    stats: { Block: 60, Bump: 35, Dive: 45, Jump: 100, Serve: 85, Set: 35, Speed: 40, Spike: 100 },
  },
  {
    slug: "hirakumi",
    name: "Hirakumi",
    rarity: "Godly",
    role: "Blocker",
    communityTier: "A",
    summary: "Godly blocker built around oppressive net play and extremely fast downward blocks.",
    signature: "Hirakumi trades speed for some of the most punishing block conversions in the style roster.",
    whyPlayersSearch: "Hirakumi gets searched by players who want a true blocker identity instead of another generic spike-focused build.",
    availability: "Permanent Godly style after its dedicated update according to community trackers.",
    sourceTier: "Community",
    bestAbilities: ["steel-block", "rolling-thunder", "divine-strength"],
    bestRoles: ["Blocker"],
    searchTerms: ["hirakumi volleyball legends", "best block and jump character volleyball legends roblox", "hirakumi stats volleyball legends"],
    scores: { offense: 6, control: 4, defense: 10, mobility: 2, difficulty: 6 },
    stats: { Block: 100, Bump: 35, Dive: 30, Jump: 85, Serve: 50, Set: 30, Speed: 20, Spike: 70 },
  },
  {
    slug: "taichou",
    name: "Taichou",
    rarity: "Secret",
    role: "Setter",
    communityTier: "S",
    summary: "Limited secret setter whose boosted sets can stack spike power and turn coordinated teams into point-ending machines.",
    signature: "Ground and jump sets apply offensive buffs, with faster side sets amplifying spike power the most.",
    whyPlayersSearch: "Taichou remains one of the highest-value secret setter searches because players still compare it directly against Timeskip Kyamo.",
    availability: "Legacy limited Secret style according to community update logs and style pages.",
    sourceTier: "Community",
    bestAbilities: ["zero-gravity-set", "magnetic-pull", "extra-touch"],
    bestRoles: ["Setter"],
    searchTerms: ["taichou volleyball legends", "taichou stats volleyball legends", "best setter volleyball legends secret"],
    scores: { offense: 6, control: 10, defense: 6, mobility: 8, difficulty: 9 },
    stats: { Block: 20, Bump: 35, Dive: 65, Jump: 100, Serve: 80, Set: 100, Speed: 85, Spike: 45 },
  },
  {
    slug: "timeskip-kyamo",
    name: "Timeskip Kyamo",
    rarity: "Secret",
    role: "Setter",
    communityTier: "S",
    summary: "Community-favorite secret setter with Super Set float control and some of the strongest playmaking in the entire game.",
    signature: "Directional sets instantly float to a fixed point before dropping, making offensive timing much harder to read.",
    whyPlayersSearch: "Timeskip Kyamo is a pillar search term because many players still consider it the best setter style in the game.",
    availability: "Legacy limited Secret style that community sources treat as no longer permanently obtainable.",
    sourceTier: "Community",
    bestAbilities: ["zero-gravity-set", "magnetic-pull", "extra-touch"],
    bestRoles: ["Setter"],
    searchTerms: ["timeskip kyamo volleyball legends", "timeskip kyamo stats volleyball legends", "best setter style volleyball legends"],
    scores: { offense: 5, control: 10, defense: 6, mobility: 8, difficulty: 9 },
    stats: { Block: 50, Bump: 40, Dive: 60, Jump: 90, Serve: 100, Set: 100, Speed: 85, Spike: 35 },
  },
  {
    slug: "timeskip-okazu",
    name: "Timeskip Okazu",
    rarity: "Secret",
    role: "Setter",
    communityTier: "S",
    summary: "Limited secret setter-server hybrid famous for rainbow-serve pressure and premium tempo control.",
    signature: "Timeskip Okazu mixes elite setup quality with a much scarier serve package than most setter-first styles.",
    whyPlayersSearch: "Players keep searching Timeskip Okazu because it sits in the sweet spot between setter utility and direct serve win conditions.",
    availability: "Legacy limited Secret style in community-maintained style pages.",
    sourceTier: "Community",
    bestAbilities: ["curve-spike", "zero-gravity-set", "magnetic-pull"],
    bestRoles: ["Setter", "All-Rounder"],
    searchTerms: ["timeskip okazu volleyball legends", "timeskip oigawa volleyball legends", "timeskip okazu stats volleyball legends"],
    scores: { offense: 7, control: 10, defense: 5, mobility: 7, difficulty: 8 },
    stats: { Block: 40, Bump: 35, Dive: 55, Jump: 95, Serve: 100, Set: 100, Speed: 75, Spike: 45 },
  },
  {
    slug: "mikage",
    name: "Mikage",
    rarity: "Secret",
    role: "Blocker",
    communityTier: "A",
    summary: "Secret blocker with max block and jump plus strong tilt conversion for players who want front-row control first.",
    signature: "Mikage uses dominant blocking and sharp tilt routes to shut down predictable attacks and punish weak spacing.",
    whyPlayersSearch: "Mikage is a strong long-tail page because players specifically search blocker-first secret styles instead of generic offensive rankings.",
    availability: "Returned in Update 62 (March 21, 2026) and left again on April 4, 2026 at 11:30 AM ET. Watch for the next return window.",
    sourceTier: "Community",
    bestAbilities: ["steel-block", "rolling-thunder", "divine-strength"],
    bestRoles: ["Blocker", "Spiker"],
    searchTerms: ["mikage volleyball legends", "mikage stats volleyball legends", "best blocker volleyball legends"],
    scores: { offense: 8, control: 4, defense: 10, mobility: 3, difficulty: 7 },
    stats: { Block: 100, Bump: 20, Dive: 40, Jump: 100, Serve: 65, Set: 20, Speed: 30, Spike: 85 },
  },
  {
    slug: "akari",
    name: "Akari",
    rarity: "Ultra",
    role: "All-Rounder",
    communityTier: "S",
    summary: "Ultra style built around dash-based air movement, combo extensions, and unique mid-air repositioning.",
    signature: "Akari's dash system allows extra airborne actions before and after the dash, opening up much richer movement than standard styles.",
    whyPlayersSearch: "Akari is an obvious expansion page because unique Ultra mechanics and mastery routes create repeated search demand well beyond launch weekend.",
    availability: "Community pages list Akari as an Ultra style with mastery progression and special air-dash tech.",
    sourceTier: "Community",
    bestAbilities: ["redirection-jump", "extra-touch", "lead-feet"],
    bestRoles: ["All-Rounder", "Spiker"],
    searchTerms: ["akari volleyball legends", "akari stats volleyball legends", "ultra style volleyball legends"],
    scores: { offense: 8, control: 7, defense: 5, mobility: 10, difficulty: 9 },
  },
];

export const abilities: AbilityEntry[] = [
  {
    slug: "lead-feet",
    name: "Lead Feet",
    rarity: "Secret",
    kind: "Movement",
    communityTier: "S",
    summary: "Momentum-cancel ability that lets you stop mid-air, drop early, and create nasty bait sequences.",
    whyItMatters: "Lead Feet is one of the most searched abilities because it changes how you punish blockers and fake crosses during tight ranked points.",
    sourceTier: "Community",
    bestWith: ["kijo", "jinko", "yogan"],
    searchTerms: ["lead feet volleyball legends", "how to increase secret pity in volleyball legends"],
  },
  {
    slug: "curve-spike",
    name: "Curve Spike",
    rarity: "Godly",
    kind: "Offense",
    communityTier: "S",
    summary: "Adds hard-to-read curve and float behavior to spikes and serves through directional tilt inputs.",
    whyItMatters: "Curve Spike hits both search demand and real gameplay value because it scales from cheese serves all the way to advanced back-row attacks.",
    sourceTier: "Community",
    bestWith: ["jinko", "sanju", "azmei"],
    searchTerms: ["curve spike volleyball legends", "best volleyball legends abilities"],
  },
  {
    slug: "redirection-jump",
    name: "Redirection Jump",
    rarity: "Godly",
    kind: "Movement",
    communityTier: "S",
    summary: "Lets you change direction mid-air for fake lanes, clutch redirects, and surprise angle changes.",
    whyItMatters: "This is one of the cleanest high-skill tools in the game and a natural pair for spikers with already strong point-ending pressure.",
    sourceTier: "Community",
    bestWith: ["kijo", "ronin", "sanju"],
    searchTerms: ["redirection jump volleyball legends", "volleyball legends ability tier list"],
  },
  {
    slug: "shield-breaker",
    name: "Shield Breaker",
    rarity: "Secret",
    kind: "Offense",
    communityTier: "S",
    summary: "Turns the next spike into a block-breaking hammer that can pierce through front-line defense.",
    whyItMatters: "Shield Breaker is a top-end finisher for smaller team modes where one clean touch often ends the rally.",
    sourceTier: "Community",
    bestWith: ["ronin", "kijo", "azmei"],
    searchTerms: ["shield breaker volleyball legends", "secret ability volleyball legends"],
  },
  {
    slug: "steel-block",
    name: "Steel Block",
    rarity: "Legendary",
    kind: "Defense",
    communityTier: "A",
    summary: "Popular early-game defensive ability that can convert strong blocks into instant-downward offense.",
    whyItMatters: "Steel Block gives you outsized value for its rarity, which is why players search it long after upgrading past common abilities.",
    sourceTier: "Community",
    bestWith: ["kisuki", "kyoshin", "kozei"],
    searchTerms: ["steel block volleyball legends", "best common ability volleyball legends"],
  },
  {
    slug: "magnetic-pull",
    name: "Magnetic Pull",
    rarity: "Secret",
    kind: "Utility",
    communityTier: "A",
    summary: "Pulls the ball back into your hitting zone and opens up wild recovery or bait-and-switch plays.",
    whyItMatters: "Magnetic Pull is one of the best utility tools for coordinated teams and flexible setters who save ugly second touches.",
    sourceTier: "Community",
    bestWith: ["kyamo", "feiko", "yokai"],
    searchTerms: ["magnetic pull volleyball legends", "best utility ability volleyball legends"],
  },
  {
    slug: "boom-jump",
    name: "Boom Jump",
    rarity: "Rare",
    kind: "Movement",
    communityTier: "B",
    summary: "Straight-up jump boost that makes attack angles, blocking reach, and front-row pressure easier.",
    whyItMatters: "It is not fancy, but it shows up constantly in query data because players want a cheap offensive upgrade while they farm for rarer abilities.",
    sourceTier: "Community",
    bestWith: ["ronin", "kozei", "azmei"],
    searchTerms: ["boom jump volleyball legends", "volleyball legends jump ability"],
  },
  {
    slug: "zero-gravity-set",
    name: "Zero Gravity Set",
    rarity: "Legendary",
    kind: "Utility",
    communityTier: "A",
    summary: "Slows the tempo of your next set to create cleaner spike timing and easier follow-up reads.",
    whyItMatters: "This is a strong setter-first ability that earns long sessions because it improves consistency rather than single flashy clips.",
    sourceTier: "Community",
    bestWith: ["kyamo", "feiko", "okazu"],
    searchTerms: ["setter abilities volleyball legends", "best setting ability volleyball legends"],
  },
  {
    slug: "super-sprint",
    name: "Super Sprint",
    rarity: "Common",
    kind: "Movement",
    communityTier: "B",
    summary: "Starter movement ability that gives a huge short burst of speed and still matters in real matches.",
    whyItMatters: "Super Sprint has beginner search demand but also real ranked utility because raw speed fixes positioning mistakes and saves desperate balls.",
    sourceTier: "Community",
    bestWith: ["sagumi", "yachikusai", "yokai"],
    searchTerms: ["super sprint volleyball legends", "starter ability volleyball legends"],
  },
  {
    slug: "team-spirit",
    name: "Team Spirit",
    rarity: "Common",
    kind: "Utility",
    communityTier: "C",
    summary: "Team-wide movement buff that is niche in solo queue but can still create tempo swings in coordinated teams.",
    whyItMatters: "Players look this up because it appears often early, but many want to know whether it is actually worth holding once better individual abilities show up.",
    sourceTier: "Community",
    bestWith: ["sagumi", "sagafura", "kosumi"],
    searchTerms: ["team spirit volleyball legends", "worst ability volleyball legends"],
  },
  {
    slug: "rolling-thunder",
    name: "Rolling Thunder",
    rarity: "Common",
    kind: "Defense",
    communityTier: "B",
    summary: "Long-distance dive ability that covers a huge amount of court and helps defensive players survive bad positioning.",
    whyItMatters: "Rolling Thunder catches search demand because it is one of the few low-rarity abilities that visibly changes how far you can recover.",
    sourceTier: "Community",
    bestWith: ["kisuki", "hirakumi", "mikage"],
    searchTerms: ["rolling thunder volleyball legends", "best dive ability volleyball legends"],
  },
  {
    slug: "moonball",
    name: "Moonball",
    rarity: "Rare",
    kind: "Utility",
    communityTier: "C",
    summary: "Turns a bump into a high, fast-dropping moonball that can steal points against slower teams or weak back rows.",
    whyItMatters: "Moonball is not meta-defining, but it is a recurring search because players want to know if the weird utility is secretly better than its tier reputation.",
    sourceTier: "Community",
    bestWith: ["yachikusai", "sagafura", "kosumi"],
    searchTerms: ["moonball volleyball legends", "rare ability volleyball legends"],
  },
  {
    slug: "divine-strength",
    name: "Divine Strength",
    rarity: "Godly",
    kind: "Offense",
    communityTier: "A",
    summary: "Spike-power amplifier that also improves tilt reliability, giving offensive styles cleaner back-line and downward pressure.",
    whyItMatters: "Divine Strength is one of the first pages players look for when they want more offense without relying on a full Secret ability.",
    sourceTier: "Community",
    bestWith: ["bakuri", "mikage", "azmei"],
    searchTerms: ["divine strength volleyball legends", "godly ability volleyball legends"],
  },
  {
    slug: "extra-touch",
    name: "Extra Touch",
    rarity: "Secret",
    kind: "Utility",
    communityTier: "S",
    summary: "High-end utility ability that extends play sequences and gives coordinated teams extra room to create unusual scoring patterns.",
    whyItMatters: "Extra Touch creates real difference-maker search demand because players want to know whether the extra contact utility changes advanced reroll decisions.",
    sourceTier: "Community",
    bestWith: ["taichou", "timeskip-kyamo", "akari"],
    searchTerms: ["extra touch volleyball legends", "secret ability tier list volleyball legends"],
  },
];

export const updates: UpdateEntry[] = [
  {
    slug: "update-65-season-14",
    title: "Volleyball Legends Update 65: Season 14, Easter Season & Chaos Tease",
    published: "2026-04-11",
    summary: "Update 65 launched Season 14 and the Easter Season, brought back egg-themed rewards and cosmetics, teased Chaos mode for the following week, and shipped three fresh codes.",
    sourceTier: "Community",
    highlights: [
      "Season 14 / Easter Season launch: eggs now drop randomly in all servers, and the season pass UI gets a dedicated eggs tab.",
      "Event rewards include returning Season 2 cosmetics, new score effects, new player cards, and a new pink-and-purple jersey in the tournament store.",
      "New Easter bundle includes an Easter version of the Time Stopper score effect plus 10 Lucky Spins.",
      "Chaos mode was officially teased as the next week's gamemode.",
      "Balance note: Kisuki's dive hitbox was buffed to make the style more reliable on defense.",
      "2x Lucky event ran from April 11, 2026 to April 13, 2026 at 11:30 AM ET.",
      "Encho (the first-ever Evo rarity style from Update 63) went permanently unobtainable at 11:30 AM ET on April 11, 2026 — if you missed it, you missed it.",
      "Codes surfaced alongside the update: UPDATE_65, SEASON_14, EASTER_UPDATE.",
    ],
    codes: ["UPDATE_65", "SEASON_14", "EASTER_UPDATE"],
    focusStyles: ["kisuki", "encho"],
  },
  {
    slug: "update-64-tournament-week",
    title: "Volleyball Legends Update 64: Tournament Week, Challenger Tokens & Twins Return",
    published: "2026-04-04",
    summary: "Update 64 introduced a recurring Tournament Week system, a brand new Challenger Tokens currency and Tournament Shop, plus the Twins return and another 48-hour 2x Luck window.",
    sourceTier: "Community",
    highlights: [
      "Tournament Week: twice-daily 2-hour tournaments on a rotating map pool (Beach, Pro Beach, Christmas Court).",
      "New currency — Challenger Tokens — earned per tournament win and bonus-awarded by leaderboard position.",
      "New Tournament Shop lets you spend Challenger Tokens on titles, Lucky spins, gems, and a new jersey.",
      "Twins returned as a limited style until April 11, 2026 at 11:30 AM ET.",
      "2x Lucky event April 4–6: Secret pity halved 200 → 100, Secret rates doubled 0.5% → 1%, Evo pity 400 → 200, Evo rates 0.25% → 0.5%.",
      "Lucky Style/Ability spin handout: 12 free spins over April 4 from 10:30 AM to 12:30 PM ET.",
      "Codes: UPDATE_64, TOURNAMENTS, CHALLENGER.",
    ],
    codes: ["UPDATE_64", "TOURNAMENTS", "CHALLENGER"],
    focusStyles: ["kijo"],
  },
  {
    slug: "update-63-encho-evo",
    title: "Volleyball Legends Update 63: Encho & the First Evo Rarity",
    published: "2026-03-28",
    summary: "Update 63 was a milestone patch: it introduced Encho, the very first style in the brand-new Evo rarity tier, along with the Stretch mechanic and a 48-hour 2x Luck window.",
    sourceTier: "Community",
    highlights: [
      "Encho: the first style ever released at the new Evo rarity tier — an All-Rounder with the Stretch signature mechanic (arms extend mid-air for a larger hitbox on blocks, spikes, serves and sets).",
      "Evo rarity drop rate on Lucky Spins: roughly 0.25%, far rarer than Secret during normal conditions and on a separate pity track.",
      "48-hour 2x Luck event launched alongside the update.",
      "Encho went permanently unobtainable on April 11, 2026 at 11:30 AM ET — if you don't own it, it is gone for good.",
      "Codes: UPDATE_63, EVO_RARITY, STRETCH.",
    ],
    codes: ["UPDATE_63", "EVO_RARITY", "STRETCH"],
  },
  {
    slug: "update-62-mikage-forfeit",
    title: "Volleyball Legends Update 62: Mikage Return & Ranked Forfeit",
    published: "2026-03-21",
    summary: "Update 62 brought back the limited 'ghost blocker' Mikage for a two-week window and finally added a ranked forfeit option for games that were already decided.",
    sourceTier: "Community",
    highlights: [
      "Mikage returned as a limited style until April 4, 2026.",
      "Ranked Forfeit: teams can now concede ranked matches once they're down by 12 points, saving time on already-decided games.",
      "Ball launcher quality-of-life improvements for training mode.",
      "Another 2x Luck event window for secret/evo rolls.",
      "Codes: UPDATE_62, MIKAGE_IS_BACK, BALL_MACHINES.",
    ],
    codes: ["UPDATE_62", "MIKAGE_IS_BACK", "BALL_MACHINES"],
    focusStyles: ["mikage"],
  },
  {
    slug: "update-61-season-13",
    title: "Volleyball Legends Update 61: Season 13 & St. Patrick's Event",
    published: "2026-03-14",
    summary: "Update 61 launched Season 13 with a St. Patrick's-themed ranked reset, a limited John Doe cosmetic bundle, and an updated ban policy.",
    sourceTier: "Community",
    highlights: [
      "Season 13 launched with a ranked reset and St. Patrick's theming.",
      "John Doe cosmetic bundle dropped as a 10,000-copy limited item.",
      "Updated ban policy around stalling and exploiting.",
      "Codes: UPDATE_61, SEASON_13, STPATRICKS_DAY.",
    ],
    codes: ["UPDATE_61", "SEASON_13", "STPATRICKS_DAY"],
  },
  {
    slug: "update-60-kijo",
    title: "Volleyball Legends Update 60: Kijo, Super Tilts, 2x Luck & New Codes",
    published: "2026-03-07",
    summary: "Update 60 is the current spike driver: a new limited secret style, a weekend 2x luck event, and three fresh codes.",
    sourceTier: "Community",
    highlights: [
      "New limited secret style: Kijo.",
      "Super tilt mechanic rewards charged left and right angle attacks.",
      "2x Lucky Event runs from March 7, 2026 to March 9, 2026 at 11:30 AM ET.",
      "Community reports say secret pity is halved from 200 to 100 and Ultra pity from 400 to 200 during the event.",
      "Codes surfaced alongside the update: UPDATE_60, KIJO, SUPER_TILTS.",
    ],
    codes: ["UPDATE_60", "KIJO", "SUPER_TILTS"],
    focusStyles: ["kijo", "ronin", "jinko"],
  },
  {
    slug: "update-59-taichou-duels",
    title: "Volleyball Legends Update 59: Taichou 2026, Duels & Lucky Ability Spins",
    published: "2026-03-01",
    summary: "The pre-Kijo patch pushed duel-focused searches and seeded several still-circulating codes.",
    sourceTier: "Community",
    highlights: [
      "Community code trackers reported UPDATE_59, TAICHOU_2026, and DUELS on March 1, 2026.",
      "Search demand around ranked and 1v1-style play tends to lift after duel-focused updates.",
      "This patch is still worth linking from the codes page because players continue searching old update numbers.",
    ],
    codes: ["UPDATE_59", "TAICHOU_2026", "DUELS"],
    focusStyles: ["taichou", "timeskip-kyamo", "timeskip-okazu"],
  },
  {
    slug: "update-56-jinko-lead-feet",
    title: "Volleyball Legends Update 56: Jinko Return, Lead Feet & 2x Lucky Event",
    published: "2026-02-07",
    summary: "Update 56 matters because it connected a high-demand returning style with a new secret ability and a major pity conversation.",
    sourceTier: "Community",
    highlights: [
      "Jinko returned for a limited event window.",
      "Lead Feet launched as a new secret ability focused on momentum cancels.",
      "2x Lucky Event again pushed secret rates and pity discussion into search results.",
      "The update created long-tail demand around normal pity odds and whether Lead Feet was worth spinning for.",
    ],
    codes: ["UPDATE_56", "LEAD_FEET", "LIMITED_ABILITY"],
    focusStyles: ["jinko", "kisuki", "yogan"],
  },
];

export const heroImages: HeroImage[] = [
  { cdnUrl: "https://tr.rbxcdn.com/180DAY-109eb0b99850fe3a8ad89626a4b56d0c/768/432/Image/Png/noFilter", alt: "Volleyball Legends official preview 1" },
  { cdnUrl: "https://tr.rbxcdn.com/180DAY-88b10d89bb6a98d625ecd2b81a1e40a0/768/432/Image/Png/noFilter", alt: "Volleyball Legends official preview 2" },
  { cdnUrl: "https://tr.rbxcdn.com/180DAY-68cdb368cddb2f28cd0e8b6601076801/768/432/Image/Png/noFilter", alt: "Volleyball Legends official preview 3" },
  { cdnUrl: "https://tr.rbxcdn.com/180DAY-39b5068f62464aa880f40df677cfeb81/768/432/Image/Png/noFilter", alt: "Volleyball Legends official preview 4" },
  { cdnUrl: "https://tr.rbxcdn.com/180DAY-a8b6b60664852ab8b23230ea7c2b60fc/768/432/Image/Png/noFilter", alt: "Volleyball Legends official preview 5" },
  { cdnUrl: "https://tr.rbxcdn.com/180DAY-8e325982bd8c01897beb6772e0b2d566/768/432/Image/Png/noFilter", alt: "Volleyball Legends official preview 6" },
  { cdnUrl: "https://tr.rbxcdn.com/180DAY-9fa64d34b83879a4bc9174ddef561ab3/768/432/Image/Png/noFilter", alt: "Volleyball Legends official preview 7" },
  { cdnUrl: "https://tr.rbxcdn.com/180DAY-d22019d0a463ee9b5007f2c23372319d/768/432/Image/Png/noFilter", alt: "Volleyball Legends official preview 8" },
  { cdnUrl: "https://tr.rbxcdn.com/180DAY-bc57ae09891bf89635d3c970fce204c3/768/432/Image/Png/noFilter", alt: "Volleyball Legends official preview 9" },
];

export const videoPosterImage: HeroImage = {
  cdnUrl: "https://tr.rbxcdn.com/180DAY-94d8a00d83f26f36de332fbba2223f3c/768/432/UnknownImage/Png/noFilter",
  alt: "Volleyball Legends game preview video poster frame",
};

export const patchDiffs: PatchDiffSection[] = [
  {
    fromSlug: "update-64-tournament-week",
    toSlug: "update-65-season-14",
    label: "U64 → U65",
    summary: "Season 14 and the Easter Season replaced Tournament Week as the headline layer. The big losses were Encho leaving forever and the Challenger grind disappearing from center stage.",
    rows: [
      { field: "Current ranked season", before: "Season 13 (U61)", after: "Season 14 (U65)", delta: "ELO reset — ladder climb restarts for everyone" },
      { field: "Encho obtainability", before: "Obtainable (Evo banner, 0.25% on Lucky Spins)", after: "Permanently unobtainable", delta: "Evo pity track goes dormant until next Evo banner" },
      { field: "Active code pool", before: "UPDATE_64 / TOURNAMENTS / CHALLENGER", after: "UPDATE_65 / SEASON_14 / EASTER_UPDATE + prior U64 codes", delta: "6 active codes — the largest live pool in months" },
      { field: "Event layer", before: "Tournament Week rotation", after: "Easter Season egg grind + Season 14 banners", delta: "Shifts player attention from tournaments to event cosmetics and seasonal rewards" },
      { field: "Public teaser for next patch", before: "No next-week mode publicly teased", after: "Chaos mode announced for the following week", delta: "Signals another mode-focused Saturday update is queued immediately after U65" },
      { field: "Balance note", before: "No headline defensive buff", after: "Kisuki dive hitbox buffed", delta: "Libero/defense players got a quieter but real reliability bump" },
    ],
  },
  {
    fromSlug: "update-63-encho-evo",
    toSlug: "update-64-tournament-week",
    label: "U63 → U64",
    summary: "The pity-math patch. U64 halved Secret and Evo pity thresholds during its 2x Luck window and doubled the underlying rates.",
    rows: [
      { field: "Secret pity (2x event)", before: "200 spins", after: "100 spins", delta: "50% fewer spins to hard-pity a Secret" },
      { field: "Secret base rate (2x event)", before: "0.5%", after: "1.0%", delta: "2× baseline — effectively 4× cheaper vs a cold baseline spin" },
      { field: "Evo pity (2x event)", before: "400 spins", after: "200 spins", delta: "Only event where Encho hard-pity was reachable with a normal stack" },
      { field: "Evo base rate (2x event)", before: "0.25%", after: "0.5%", delta: "2× baseline Evo rate" },
      { field: "Free spin handout", before: "None", after: "12 Lucky spins over a 2-hour window", delta: "One-time seed stack tied to the Tournament Week launch" },
      { field: "Currency system", before: "Gems + Lucky Spins only", after: "+ Challenger Tokens", delta: "New currency with dedicated Tournament Shop" },
      { field: "Returning limited", before: "Encho banner", after: "Twins return window", delta: "Back-to-back limiteds — heavy spin pressure for completionists" },
    ],
  },
  {
    fromSlug: "update-62-mikage-forfeit",
    toSlug: "update-63-encho-evo",
    label: "U62 → U63",
    summary: "The rarity-ceiling patch. U63 introduced the Evo tier above Secret, fundamentally changing what 'top rarity' means.",
    rows: [
      { field: "Top rarity tier", before: "Secret + Ultra", after: "Evo (above Secret)", delta: "Adds a new ceiling — Evo runs on its own pity counter" },
      { field: "Evo rarity drop rate", before: "—", after: "~0.25% on Lucky Spins, ~0.005% on Normal", delta: "Roughly equivalent to Ultra odds" },
      { field: "New style", before: "Mikage (returning Secret)", after: "Encho (first-ever Evo, All-Rounder)", delta: "First Evo sets the template — Stretch mechanic extends hitboxes" },
      { field: "Pity track count", before: "1 (Secret)", after: "2 (Secret + Evo, separate counters)", delta: "Spinning for Encho did not progress Secret pity" },
    ],
  },
];

export const tradeValues: TradeValueEntry[] = [
  { styleSlug: "encho", rarity: "Evo", obtainability: "Unobtainable", valueTier: "T1", demand: "High", note: "First-ever Evo. Went permanently unobtainable on April 11, 2026. Will only appreciate from here." },
  { styleSlug: "kijo", rarity: "Secret", obtainability: "Limited", valueTier: "T2", demand: "High", note: "Limited Secret with the Super Tilt mechanic. Window closed; returns will reset demand temporarily." },
  { styleSlug: "twins", rarity: "Secret", obtainability: "Limited", valueTier: "T2", demand: "High", note: "Returning limited. Expected to rotate every few months during event weeks." },
  { styleSlug: "mikage", rarity: "Secret", obtainability: "Limited", valueTier: "T2", demand: "Medium", note: "Defensive blocker Secret. Solid meta niche, returned most recently in U62." },
  { styleSlug: "jinko", rarity: "Secret", obtainability: "Limited", valueTier: "T2", demand: "Medium", note: "Curve mechanic Secret. Long-tail trading demand every time it returns." },
  { styleSlug: "taichou", rarity: "Secret", obtainability: "Limited", valueTier: "T2", demand: "Medium", note: "Setter-focused Secret tied to the Duels patch (U59)." },
  { styleSlug: "timeskip-kyamo", rarity: "Secret", obtainability: "Limited", valueTier: "T2", demand: "High", note: "Time-skip variant of Kyamo. Limited banner style." },
  { styleSlug: "timeskip-okazu", rarity: "Secret", obtainability: "Limited", valueTier: "T2", demand: "Medium", note: "Time-skip variant of Okazu. Limited banner style." },
  { styleSlug: "ronin", rarity: "Ultra", obtainability: "Limited", valueTier: "T3", demand: "Medium", note: "Power-hitter Ultra. Traded less than Secrets but strong offensive meta." },
  { styleSlug: "feiko", rarity: "Secret", obtainability: "Permanent", valueTier: "T3", demand: "Medium", note: "Permanent Secret in the current pool — value is meta-driven, not scarcity-driven." },
  { styleSlug: "sanju", rarity: "Secret", obtainability: "Permanent", valueTier: "T3", demand: "Low", note: "Permanent Secret. Mostly traded as a stepping stone." },
  { styleSlug: "yogan", rarity: "Secret", obtainability: "Permanent", valueTier: "T3", demand: "Low", note: "Permanent Secret. Niche use cases." },
  { styleSlug: "akari", rarity: "Secret", obtainability: "Limited", valueTier: "T2", demand: "Medium", note: "Limited event Secret from earlier seasons." },
  { styleSlug: "kyamo", rarity: "Godly", obtainability: "Permanent", valueTier: "T4", demand: "Medium", note: "Classic setter Godly. Entry-tier trade fodder for newer players." },
  { styleSlug: "kisuki", rarity: "Godly", obtainability: "Permanent", valueTier: "T4", demand: "Low", note: "Permanent Godly. Low trade interest outside newer accounts." },
];

export const datamineSources: DatamineSource[] = [
  { label: "@Protori_ on X", url: "https://x.com/Protori_", kind: "Official", watchFor: "Teaser screenshots, short clips, countdown posts — usually drop 1–3 days before Saturday's update." },
  { label: "Official Discord announcements", url: siteConfig.officialLinks.discord, kind: "Official", watchFor: "Full patch notes ship here first. Pinned messages in #announcements carry the canonical code list." },
  { label: "Roblox game page", url: siteConfig.officialLinks.roblox, kind: "Official", watchFor: "Game-page updates and preview image refreshes are the earliest visual signal that a patch is staged." },
  { label: "Official Roblox group", url: siteConfig.officialLinks.group, kind: "Official", watchFor: "Group activity is another lightweight signal that the patch pipeline is moving, especially when the main game page refreshes." },
  { label: "Fandom Updates page", url: "https://volleyball-legends.fandom.com/wiki/Updates", kind: "Community", watchFor: "Community editors usually have a full writeup within 24–48 hours of release." },
  { label: "MrGuider patch recaps", url: "https://www.mrguider.org/", kind: "Community", watchFor: "Same-day blog-style patch recap with code list." },
  { label: "gamestratwiki", url: "https://gamestratwiki.com/", kind: "Community", watchFor: "Style-specific pages (first-look style breakdowns after release)." },
];

export const homepageFaq = [
  {
    question: "What is the main keyword this site is targeting first?",
    answer: "The site is built around the highest-intent query cluster: Volleyball Legends codes. From there, it funnels traffic into styles, abilities, updates, and tools.",
  },
  {
    question: "Are the odds and style stats on this site official?",
    answer: "Not always. This site separates official links from community-confirmed data and site-maintained tools. Odds, pity math, and many style stat sheets should be treated as community-tracked unless the game itself publishes them.",
  },
  {
    question: "Why are styles like Encho, Twins, Mikage, and Kijo featured first?",
    answer: "They align with current long-tail demand and rising update searches after Updates 62-65. Encho in particular was the game's first Evo rarity style and went permanently unobtainable on April 11, 2026, which makes it a high-traffic lookup for players who missed the window.",
  },
  {
    question: "Why not launch with every page at once?",
    answer: "This site is intentionally query-first. Codes, styles, abilities, updates, and a small tool set should go live first because those pages match the current SERP and are faster to keep accurate.",
  },
];

export const guideCards = [
  {
    title: "Pity System",
    href: "/guides/pity-system",
    description: "Full pity math including Evo rarity, 2x Luck event thresholds, and a cumulative probability curve.",
  },
  {
    title: "Patch Diff",
    href: "/patch-diff",
    description: "Numerical before/after tables covering U63 → U64 → U65. What actually changed, not a patch note replay.",
  },
  {
    title: "Trading Value List",
    href: "/trading",
    description: "Editorial tier rankings for Secret, Evo, Ultra, and Godly styles. Built for players who already own the basics.",
  },
  {
    title: "Next Update Tracker",
    href: "/next-update",
    description: "Monitoring board for the upcoming update. Tracks confirmed features, dev teasers, and community leaks.",
  },
  {
    title: "Top 100",
    href: "/guides/top-100",
    description: "Ranked progression advice for players pushing toward the top of the ladder.",
  },
  {
    title: "Ranks",
    href: "/guides/ranks",
    description: "Ranked unlocks, queue expectations, and the ranked system notes that matter past level gates.",
  },
  {
    title: "Discord",
    href: "/guides/discord",
    description: "Official Discord links — where code and update signals usually surface first.",
  },
  {
    title: "Player Cards",
    href: "/guides/player-cards",
    description: "Community-led notes on player-card searches, secret cards, and event card demand.",
  },
  {
    title: "Beginner Guide",
    href: "/guides/beginner",
    description: "New to Volleyball Legends? Start here — leveling, early spins, role selection, and what to practice first.",
  },
  {
    title: "Tutorial",
    href: "/guides/tutorial",
    description: "General tutorial hub for players who do not know which exact guide they need yet.",
  },
  {
    title: "Controls",
    href: "/guides/controls",
    description: "PC, console, and mobile control flow for new players.",
  },
  {
    title: "How to Spike",
    href: "/guides/how-to-spike",
    description: "Timing, approach, tilt direction, and why clean contact matters more than flashy clips.",
  },
  {
    title: "How to Serve",
    href: "/guides/how-to-serve",
    description: "Power control, toss rhythm, jump serves, and how abilities like Curve Spike change serve plans.",
  },
  {
    title: "How to Set",
    href: "/guides/how-to-set",
    description: "Setter-first guide on tempo, positioning, and why readable sets win more than greedy dump plays.",
  },
  {
    title: "Best Binds",
    href: "/guides/best-binds",
    description: "Practical bind philosophy for PC and controller players.",
  },
  {
    title: "FPS Settings",
    href: "/guides/fps-settings",
    description: "How performance affects timing and what to tweak before you blame your style or ability.",
  },
];

export const toolCards = [
  {
    title: "Spin Budget Calculator",
    href: "/tools/spin-budget",
    description: "Enter your spin stack and target rarity — get the probability, 50%/95% milestones, and hard-pity ceiling. 2x Luck toggle built in.",
  },
  {
    title: "Style Compare",
    href: "/tools/style-compare",
    description: "Put two high-demand styles next to each other and compare role fit, offense, control, defense, and mobility.",
  },
  {
    title: "Reroll Advisor",
    href: "/tools/reroll-advisor",
    description: "A heuristic tool, not an official calculator. Helps decide whether to push spins now or wait for a stronger event.",
  },
  {
    title: "Update Countdown",
    href: "/tools/update-countdown",
    description: "Track the next Saturday reset around the community-reported weekly update time.",
  },
];

export function getStyle(slug: string) {
  return featuredStyles.find((style) => style.slug === slug);
}

export function getAbility(slug: string) {
  return abilities.find((ability) => ability.slug === slug);
}

export function getUpdate(slug: string) {
  return updates.find((update) => update.slug === slug);
}
