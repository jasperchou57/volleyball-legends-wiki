# Official announcement automation

Production source of this automation: `jasperchou57/volleyball-legends-wiki`, default branch `main`.
The collector checkout is the local development copy. Publish changes through the repository's `automation/` directory and `.github/workflows/official-codes.yml`.

## Destinations

- Volleyball: `main` → Vercel project `volleyball-legends-wiki`, team `jasperchous-projects-84a4d356` → `https://www.volleyballlegends.wiki/codes`. Runtime writes only `src/data/codes-automated.json` in an independent checkout, checks evidence/frozen metadata, lints, builds, commits, pushes without force, explicitly requests a Vercel production deployment for the exact commit, waits for READY, checks `/api/code-status` and visible code/reward HTML.
- Brixumi: existing public Sites project `appgprj_6a661285a15c8191b9dfb922a175ec73` → `https://brixumi.com`. Its D1 writer `/api/automation/codes` updates durable per-game snapshots with compare-and-swap concurrency. Daily data updates do not deploy source. Codes directory, game Codes pages and game hubs use the same server-side view. Original reviewedCodes / reviewedCodeEvidence and Dance Studio data are the baseline; managed records overlay only named codes.
- Only Volleyball's receipt channel is configured initially. Dance Studio has an explicit adapter and official-source allowlist but requires its actual receipt channel to be added before collection can begin. Other games require an explicit trusted-source configuration and adapter, not a guessed schema.

## First-time configuration

GitHub repository Settings → Secrets and variables → Actions:

| Kind | Name | Purpose |
|---|---|---|
| Secret | DISCORD_BOT_TOKEN | Read the configured receipt channel and message history |
| Secret | OPENAI_API_KEY | Official Codex Action extraction; API billing |
| Secret | BRIXUMI_UPDATE_TOKEN | Must match Sites runtime secret CODES_UPDATE_TOKEN |
| Secret | VERCEL_TOKEN | Production deployment access to the verified Vercel team/project |
| Variable | VERCEL_PROJECT_ID | Project ID or verified name volleyball-legends-wiki |
| Variable | VERCEL_TEAM_SLUG | jasperchous-projects-84a4d356 |
| Variable | OFFICIAL_CODES_ENABLED | true enables the workflow; false pauses it |

`configure-github.py` can copy local `.env` values to encrypted repository secrets using the existing Git credential helper. It never prints credentials. It does not enable the schedule by default. Run with `--enable` only after bootstrap publication, credentials, source access and writer readback pass. Do not commit `.env`, auth.json, local state or credentials. Cloud execution uses GitHub's Node 24 runner and has no Mac cache paths.

## Operation

The workflow runs at minutes 7 and 37 each hour; schedule times are approximate. GitHub Actions may delay jobs. Public repository schedules can be disabled after inactivity; inspect the Actions tab if runs stop. State commits normally provide ongoing activity. There is also a Run workflow button. GitHub sends configured failure notifications; the job summary and `official-codes-run` artifact identify the affected site/message without credentials.

Durable progress lives on `codes-automation-state`, separately from source. Its `vercel.json` disables automatic deployments of state commits. GitHub workflow concurrency serializes cloud runs. Local runs also take a filesystem lock. Never run two independent schedulers against different copies of the state. Never delete the state to retry a deployment.

Local Node 24 commands (from the collector):

```sh
node automation/cli.mjs prepare         # read Discord, persist progress, prepare extraction only
node automation/cli.mjs status
node automation/cli.mjs run             # collect/extract/publish; requires Codex CLI, credentials and isolated checkout
node automation/cli.mjs retry-extraction MESSAGE_ID
node --test automation/test/*.test.mjs
```

Set `VOLLEYBALL_CHECKOUT` to a clean, independent checkout of production main with dependencies installed. Never point it at unfinished development. `AUTOMATION_STATE_FILE`, `AUTOMATION_WORK_DIR` and `AUTOMATION_CHANNELS_FILE` can override local paths. In the production repository, channels are at `automation/channels.json`. The local launcher supports an ignored `.local-node` symlink; the cloud workflow does not use it.

## State and evidence rules

- Fetch all pages down to the saved cursor, not the latest 20. Re-read previously observed official messages for edits. Retry Discord rate limits and transient failures. On partial fetch failure, keep the cursor so missing pages are retried. Ordinary messages and Follow setup notifications are never sent to the model or stored as announcement content.
- Source guild/channel/message IDs come from Discord crosspost references and the allowlist. The model cannot supply or change them. Prompt content is untrusted data. The cloud extractor runs under a separate unprivileged account with read-only sandbox, with no access to the Git credential directories or deployment secrets.
- Only new/edited official message hashes enter extraction. Body and embed claims require verbatim source quotes containing the code and reward; expiry requires explicit words. Image claims require two independent matching readings, an exact matching quote and matching observations. Unreadable images are exceptions; reliable text entries still proceed. Signed CDN URL refreshes do not count as edits.
- New announcements never remove old codes. Deletion never implies expiry. Edited removals retain previous status and create an exception. Reward conflicts and suspected reactivation require review; other valid claims continue. Baseline review dates prevent older backfill overwriting a newer known record.
- Each site/game keeps its own frozen in-flight batch and completed message hashes. A crash after commit/deployment is retried without acknowledging newer messages. Only verified production results become published. Terminal Vercel failures permit a later new deployment; pending deployments retain their ID.
- No fetch advances record review dates. No operation creates an in-game redemption attempt. Brixumi separates last-known status from source-review age. Volleyball computes code count, Style Spins and Ability Spins separately. Its legacy gameplay/patch tracker remains a separate reviewed snapshot: a mentioned update number is shown on the Codes page, but does not fabricate a new patch release date or summary.

## Pause, retry and recovery

Set OFFICIAL_CODES_ENABLED=false or disable the workflow to pause future runs. Do not cancel a run during deployment unless necessary; persisted state is saved in an always-run step. Re-enable and use Run workflow to resume. Failed site batches retry automatically; successful destinations are skipped. Correct the underlying credentials/build/conflict first. For an extraction exception, edit the official message or deliberately mark its receipt ID pending with retry-extraction, then save that updated state. A local lock remaining after a killed process can be removed only after confirming the old process stopped.

The normal workflow is fail-closed on corrupt/missing-restoration state, unsupported sources, out-of-scope file changes, failing builds and failed readback. It does not bypass branch protections. Existing full-game content freshness checks remain available; code-only automation uses its dedicated evidence check and never updates old gameplay review dates to make the broader check pass.

## Verification boundary

Fixture tests never call production. `test/live-local.mjs` refuses non-loopback URLs and exercises a real local Worker/D1 database (auth rejection, dry run, new code, replay, explicit expiry, source spoof rejection and rendered HTML). Local test databases are excluded from published artifacts. Empty initialization of the production snapshot verifies the authenticated writer and durable readback without publishing any test code or changing review dates.
