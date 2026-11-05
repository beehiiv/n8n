# beehiiv for n8n

Official [beehiiv](https://www.beehiiv.com) community node for [n8n](https://n8n.io/). Create, get, and update subscribers, add or remove tags, manage newsletter list membership, and enroll a subscriber in an automation.

n8n is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation) · [Operations](#operations) · [Credentials](#credentials) · [Development](#development) · [Release](#release)

## Installation

After this package is published and verified, install it from the n8n nodes panel. Until then, self-hosted n8n can install the npm package `@beehiiv/n8n-nodes-beehiiv` as a community node. See the [n8n community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/).

## Operations

v1 covers the REQ-2493 subscriber workflow. Each operation needs a publication.

| Resource | Operation | API |
| --- | --- | --- |
| Subscriber | Create | `POST /v2/publications/{publicationId}/subscriptions` |
| Subscriber | Get by Email | `GET /v2/publications/{publicationId}/subscriptions/by_email/{email}` |
| Subscriber | Update | `PUT /v2/publications/{publicationId}/subscriptions/{id}` or `.../by_email/{email}` |
| Subscriber | Add Tags | `POST /v2/publications/{publicationId}/subscriptions/{id}/tags` |
| Subscriber | Remove Tags | `DELETE /v2/publications/{publicationId}/subscriptions/{id}/tags` |
| Subscriber | Add to List | `POST /v2/publications/{publicationId}/newsletter_lists/{listId}/subscriptions` |
| Subscriber | Update List Subscription | `PATCH /v2/publications/{publicationId}/newsletter_lists/{listId}/subscriptions/by_subscription_id/{id}` |
| Subscriber | Enroll in Automation | `POST /v2/publications/{publicationId}/automations/{automationId}/journeys` |

Create and update accept custom fields, UTM values, and related subscription options. Get by Email can expand tags, custom fields, stats, referrals, premium tiers, and newsletter lists. Add Tags, Remove Tags, and Update List Subscription look up the subscription by email when you do not have the subscription ID. Remove Tags does not delete the tag from the publication. Update List Subscription currently unsubscribes the person from that list only, not from the publication. Add to List and Enroll in Automation accept either email or subscription ID.

Enroll in Automation requires the automation to have an active **Add by API** trigger. Existing subscribers are not enrolled by Create; use Enroll in Automation for that.

## Credentials

1. In beehiiv, open **Settings → API** and create an API key.
2. In n8n, add a **beehiiv API** credential and paste the key. The field is stored as a password.
3. The node sends `Authorization: Bearer <api key>` to `https://api.beehiiv.com/v2`.
4. n8n checks the key with `GET /v2/publications`.

OAuth is not included in v1. beehiiv API keys are the supported n8n credential.

## Compatibility

Built with `@n8n/node-cli` against `n8nNodesApiVersion: 1`. Requires Node.js 22.23.4 for local development (see `mise.toml`).

## Usage

Typical flow for a new reader:

1. **Create** the subscriber with their email.
2. **Add Tags** for segmentation.
3. **Add to List** if they belong on a newsletter list that is not auto-subscribe.
4. **Enroll in Automation** only for people who already exist in beehiiv.

To look up an existing subscriber, use **Get by Email**. To change one, use **Update** with email or subscription ID. To take someone off a newsletter list, use **Update List Subscription**.

## Development

### Prerequisites

- Node.js **22.23.4** (`mise install` uses `mise.toml`)
- [pnpm](https://pnpm.io/) **10.6.5** (pinned as `packageManager`)
- Docker or Podman only if you run `pnpm dev` (n8n 3 starts a local container)

This repo uses the same JS toolchain as `beehiiv/zapier-appv3`: pnpm, Biome 1.9.4, husky, and lint-staged. n8n verification still runs `n8n-node lint` (eslint). Do not replace that with Biome. n8n forbids `prepare` / other install lifecycle scripts on community nodes, so husky is not auto-installed. After `pnpm install`, run `pnpm run hooks` once so `.husky/pre-commit` runs `pnpm exec lint-staged`.

### Setup

```bash
git clone https://github.com/beehiiv/n8n.git
cd n8n
mise install          # optional; installs Node from mise.toml
pnpm install --frozen-lockfile
pnpm run hooks        # enable the Zapier-style husky pre-commit hook
```

### Commands

| Command | Purpose |
| --- | --- |
| `pnpm run dev` | Start local n8n with this node loaded |
| `pnpm run build` | Compile TypeScript and copy assets |
| `pnpm run lint` | n8n community-node eslint (`n8n-node lint`) |
| `pnpm run lint:fix` | Apply n8n eslint fixes |
| `pnpm run lint:biome` | Biome lint |
| `pnpm run format` | Biome format |
| `pnpm run release` | Interactive version bump via n8n-node (does not publish) |

CI runs on every pull request: Biome format and lint (no `pnpm install`), then `pnpm install --frozen-lockfile` plus `n8n-node lint` and build.

There is no `.npmrc`, no `pnpm.overrides`, and no `onlyBuiltDependencies` / `ignore-scripts` allowlist. `pnpm-workspace.yaml` only sets `minimumReleaseAge: 10080`.

## Release

Merge to `main` does **not** publish. Ship only from a stable GitHub Release:

1. Bump `version` in `package.json` and update `CHANGELOG.md`.
2. Merge the PR to `main`.
3. Create a GitHub Release for that commit.
4. `.github/workflows/publish.yml` installs with `pnpm install --frozen-lockfile`, lints, builds, and runs `pnpm publish --provenance --access public`.

One-time npm setup: add this repository as a trusted GitHub Actions publisher for `@beehiiv/n8n-nodes-beehiiv`, or set `NPM_TOKEN`. See the comments in `publish.yml`. After npm publish, submit the package through the [n8n Creator Portal](https://docs.n8n.io/integrations/community-nodes/building-community-nodes). Reviews can take up to four weeks.

## Resources

- [beehiiv API](https://developers.beehiiv.com)
- [n8n community nodes](https://docs.n8n.io/integrations/#community-nodes)
- [n8n verified-node guidelines](https://docs.n8n.io/integrations/creating-nodes/build/reference/verification-guidelines/)

## Version history

See [CHANGELOG.md](CHANGELOG.md).
