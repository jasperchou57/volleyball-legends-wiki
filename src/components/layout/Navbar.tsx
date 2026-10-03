import Link from 'next/link';
import Image from 'next/image';

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

                    <div className="hidden items-center gap-5 xl:flex">
                        <Link href="/codes" className="text-sm font-medium text-muted hover:text-white transition-colors">Codes</Link>
                        <Link href="/styles" className="text-sm font-medium text-muted hover:text-white transition-colors">Styles</Link>
                        <Link href="/abilities" className="text-sm font-medium text-muted hover:text-white transition-colors">Abilities</Link>
                        <Link href="/tier-list/styles" className="text-sm font-medium text-muted hover:text-white transition-colors">Tier List</Link>
                        <Link href="/style-return-dates" className="text-sm font-medium text-muted hover:text-white transition-colors">Return Dates</Link>
                        <Link href="/updates" className="text-sm font-medium text-muted hover:text-white transition-colors">Updates</Link>
                        <Link href="/guides" className="text-sm font-medium text-muted hover:text-white transition-colors">Guides</Link>
                        <Link href="/tools" className="text-sm font-medium text-muted hover:text-white transition-colors">Tools</Link>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                        <Link href="/codes" className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-white/30">
                            Codes
                        </Link>
                        <Link href="/guides/discord" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5865F2] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#4752C4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5865F2] sm:px-4">
                            <Image src="/images/discord-symbol-white.svg" alt="" width={20} height={15} aria-hidden="true" />
                            Discord
                        </Link>
                        <Link href="/tools/style-compare" className="hidden whitespace-nowrap sm:inline-flex rounded-full bg-gradient-to-r from-accent-orange to-accent-teal px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(255,106,43,0.28)] transition hover:shadow-[0_18px_40px_rgba(255,106,43,0.4)]">
                            Compare Styles
                        </Link>
                    </div>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-3 xl:hidden">
                    {[
                        ["Codes", "/codes"],
                        ["Styles", "/styles"],
                        ["Abilities", "/abilities"],
                        ["Tier List", "/tier-list/styles"],
                        ["Return Dates", "/style-return-dates"],
                        ["Updates", "/updates"],
                        ["Guides", "/guides"],
                        ["Tools", "/tools"],
                        ["Compare Styles", "/tools/style-compare"],
                    ].map(([label, href]) => (
                        <Link
                            key={href}
                            href={href}
                            className={`${href === "/tools/style-compare" ? "sm:hidden " : ""}whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 transition hover:border-white/30 hover:text-white`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
