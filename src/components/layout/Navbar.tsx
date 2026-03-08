import Link from 'next/link';

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-xl">
            <div className="container mx-auto px-4">
                <div className="flex min-h-16 items-center justify-between gap-4 py-3">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-heading font-bold tracking-tight text-white">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-teal">Volleyball Legends</span> Wiki
                        </span>
                    </Link>

                    <div className="hidden items-center gap-6 lg:flex">
                        <Link href="/codes" className="text-sm font-medium text-muted hover:text-white transition-colors">Codes</Link>
                        <Link href="/styles" className="text-sm font-medium text-muted hover:text-white transition-colors">Styles</Link>
                        <Link href="/abilities" className="text-sm font-medium text-muted hover:text-white transition-colors">Abilities</Link>
                        <Link href="/tier-list/styles" className="text-sm font-medium text-muted hover:text-white transition-colors">Tier List</Link>
                        <Link href="/updates" className="text-sm font-medium text-muted hover:text-white transition-colors">Updates</Link>
                        <Link href="/guides" className="text-sm font-medium text-muted hover:text-white transition-colors">Guides</Link>
                        <Link href="/tools" className="text-sm font-medium text-muted hover:text-white transition-colors">Tools</Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href="/codes" className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-white/30">
                            Codes
                        </Link>
                        <Link href="/tools/style-compare" className="rounded-full bg-gradient-to-r from-accent-orange to-accent-teal px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(255,106,43,0.28)] transition hover:shadow-[0_18px_40px_rgba(255,106,43,0.4)]">
                            Compare Styles
                        </Link>
                    </div>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-3 lg:hidden">
                    {[
                        ["Codes", "/codes"],
                        ["Styles", "/styles"],
                        ["Abilities", "/abilities"],
                        ["Tier List", "/tier-list/styles"],
                        ["Updates", "/updates"],
                        ["Guides", "/guides"],
                        ["Tools", "/tools"],
                    ].map(([label, href]) => (
                        <Link
                            key={href}
                            href={href}
                            className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 transition hover:border-white/30 hover:text-white"
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
