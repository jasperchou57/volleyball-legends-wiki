import Link from 'next/link';

export function Footer() {
    return (
        <footer className="mt-auto w-full border-t border-border bg-surface/90">
            <div className="container mx-auto px-4 py-10">
                <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
                    <div className="space-y-3">
                        <span className="text-lg font-heading font-bold tracking-tight text-white">
                            Volleyball Legends Wiki
                        </span>
                        <p className="max-w-md text-sm leading-6 text-muted">
                            Fan-made wiki and tools hub for Roblox Volleyball Legends. Built around codes, styles, abilities, update tracking, and search-first landing pages.
                        </p>
                        <p className="text-xs leading-5 text-muted">
                            Source labels matter here: official links come from Roblox and the official Discord, while pity notes, tier lists, and many style snapshots are community-maintained.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Main Pages</p>
                        <div className="flex flex-col gap-2 text-sm text-muted">
                            <Link href="/codes" className="hover:text-white transition-colors">Codes</Link>
                            <Link href="/styles" className="hover:text-white transition-colors">Styles</Link>
                            <Link href="/abilities" className="hover:text-white transition-colors">Abilities</Link>
                            <Link href="/updates" className="hover:text-white transition-colors">Updates</Link>
                            <Link href="/tier-list/styles" className="hover:text-white transition-colors">Tier List</Link>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Useful Links</p>
                        <div className="flex flex-col gap-2 text-sm text-muted">
                            <Link href="/guides/discord" className="hover:text-white transition-colors">Official Discord</Link>
                            <Link href="/tools/style-compare" className="hover:text-white transition-colors">Style Compare</Link>
                            <Link href="/tools/update-countdown" className="hover:text-white transition-colors">Update Countdown</Link>
                            <Link href="/about" className="hover:text-white transition-colors">About</Link>
                            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
