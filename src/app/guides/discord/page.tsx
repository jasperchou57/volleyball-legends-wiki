import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, Ticket, Megaphone, Users, MessageCircle, Plus, CircleHelp } from "lucide-react";
import { siteConfig } from "@/data/volleyball";
import styles from "./DiscordGuide.module.css";

export const metadata: Metadata = {
  title: "Volleyball Legends Discord",
  description:
    "Official Volleyball Legends Discord link, what it is used for, and why it matters for codes, updates, and fast verification.",
  alternates: { canonical: "/guides/discord" },
};

const inviteUrl = "https://discord.com/invite/volleyballlegends";
const channels = [
  { icon: Ticket, label: "# codes", text: "Find code announcements and the rewards they offer.", tone: "orange" },
  { icon: Megaphone, label: "# announcements", text: "Catch up on game updates and official announcements.", tone: "teal" },
  { icon: Users, label: "Stay connected", text: "Meet other players and find people to play with.", tone: "purple" },
];
const steps = [
  { label: "Open the invite", text: "Use the button above to open the official server invite." },
  { label: "Join the server", text: "Sign in if needed, then follow Discord’s prompts to join." },
  { label: "Explore the channels", text: "Look for codes and announcements in the channel list." },
];

export default function DiscordGuidePage() {
  return (
    <div className={styles.page}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <Link href="/">Home</Link><ChevronRight size={15} aria-hidden="true" />
        <Link href="/guides">Guides</Link><ChevronRight size={15} aria-hidden="true" />
        <span aria-current="page">Discord</span>
      </nav>
      <section className={styles.hero}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Community guide</p>
          <h1 className={styles.title}>Volleyball Legends Discord</h1>
          <p className={styles.description}>Find the official Volleyball Legends Discord server for code announcements, game updates, and community news.</p>

        </div>
        <div className={styles.art}>
          <Image src="/images/discord-volleyball-hero.webp" alt="Original fan illustration of a volleyball player jumping to spike at an indoor court" width={1024} height={1024} priority sizes="(max-width: 760px) 100vw, 50vw" />
          <div className={styles.actions}>
            <a className={styles.primary} href={inviteUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={23} aria-hidden="true" />Join Official Discord<ArrowUpRight size={19} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link className={styles.secondary} href="/codes"><Ticket size={21} aria-hidden="true" />View Active Codes</Link>
          </div>
        </div>
      </section>
      <section aria-label="What to find in the server" className={styles.cards}>
        {channels.map(({icon: Icon, label, text, tone}) => (
          <div key={label} className={`${styles.card} ${styles[tone]}`}>
            <Icon size={34} strokeWidth={1.8} aria-hidden="true" />
            <div><p className={styles.cardLabel}>{label}</p><p className={styles.cardText}>{text}</p></div>
          </div>
        ))}
      </section>
      <section aria-label="How to join" className={styles.section}>
        <p className={styles.sectionLabel}>How to join</p>
        <ol className={styles.steps}>
          {steps.map(({label, text}, i) => <li key={label}><span className={styles.number} aria-hidden="true">0{i+1}</span><div><p className={styles.stepLabel}>{label}</p><p className={styles.cardText}>{text}</p></div></li>)}
        </ol>
      </section>
      <section aria-label="Help joining Discord" className={styles.section}>
        <p className={styles.sectionLabel}>Need help?</p>
        <div className={styles.faq}>
          <details><summary><CircleHelp size={21} aria-hidden="true" /><span>Invite not opening?</span><Plus className={styles.plus} size={20} aria-hidden="true" /></summary><p>Try opening the invite in your browser. If it still does not work, visit the <a href={siteConfig.officialLinks.discord} target="_blank" rel="noopener noreferrer">official server page<span className="sr-only"> (opens in a new tab)</span></a> and use its Join Server button.</p></details>
          <details><summary><MessageCircle size={21} aria-hidden="true" /><span>Cannot see a channel?</span><Plus className={styles.plus} size={20} aria-hidden="true" /></summary><p>Check for any server rules or setup prompts in Discord and follow the instructions shown. Available channels can depend on your server access.</p></details>
        </div>
      </section>
    </div>
  );
}
