# beehiiv for n8n

Official [beehiiv](https://www.beehiiv.com) community node for [n8n](https://n8n.io/). Create, get, and update subscribers, add or remove tags, list newsletter lists, manage list membership, and enroll a subscriber in an automation.

[Installation](#installation) · [Operations](#operations) · [Credentials](#credentials) · [Development](#development) · [Release](#release)

## Installation

After this package is published and verified, install it from the n8n nodes panel. Until then, self-hosted n8n can install `@beehiiv/n8n-nodes-beehiiv` as a community node. See the [n8n community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/).

## Operations

Each operation needs a publication.

| Resource | Operation | API |
| --- | --- | --- |
| Subscriber | Create | `POST /v2/publications/{publicationId}/subscriptions` |
| Subscriber | Get Many | `GET /v2/publications/{publicationId}/subscriptions` |
| Subscriber | Get by Email | `GET /v2/publications/{publicationId}/subscriptions/by_email/{email}` |
| Subscriber | Update | `PUT /v2/publications/{publicationId}/subscriptions/{id}` or `.../by_email/{email}` |
| Subscriber | Add Tags | `POST /v2/publications/{publicationId}/subscriptions/{id}/tags` |
| Subscriber | Remove Tags | `DELETE /v2/publications/{publicationId}/subscriptions/{id}/tags` |
| Subscriber | Add to List | `POST /v2/publications/{publicationId}/newsletter_lists/{listId}/subscriptions` |
| Subscriber | Update List Subscription | `PATCH /v2/publications/{publicationId}/newsletter_lists/{listId}/subscriptions/by_subscription_id/{id}` |
| Subscriber | Enroll in Automation | `POST /v2/publications/{publicationId}/automations/{automationId}/journeys` |
| Newsletter List | Get Many | `GET /v2/publications/{publicationId}/newsletter_lists` |

Create and update accept custom fields, UTM values, and related subscription options. Get Many lists subscriptions with Return All / Limit and cursor pagination, and can filter by email, status, tier, premium tier IDs, and creation date. Get Many and Get by Email can expand tags, custom fields, stats, referrals, premium tiers, and newsletter lists. Tag and list operations look up the subscriber by email when you do not have the ID. Remove Tags leaves the publication tag in place. Update List Subscription unsubscribes from that list only, not the publication.

Enroll in Automation requires the automation to have an active **Add by API** trigger. Existing subscribers are not enrolled by Create; use Enroll in Automation for that.

## Credentials

1. In beehiiv, open **Settings → API** and create an API key.
2. In n8n, add a **beehiiv API** credential and paste the key. The field is stored as a password.
3. The node sends `Authorization: Bearer <api key>` to `https://api.beehiiv.com/v2`.
4. n8n checks the key with `GET /v2/publications`.

## Compatibility

Built with `@n8n/node-cli` against `n8nNodesApiVersion: 1`. Local development uses Node.js 22.23.4 (`mise.toml`).

## Usage

Typical flow for a new reader:

1. **Create** the subscriber with their email.
2. **Add Tags** for segmentation.
3. **Add to List** if they belong on a newsletter list that is not auto-subscribe.
4. **Enroll in Automation** only for people who already exist in beehiiv.

To look up an existing subscriber, use **Get by Email**. To change one, use **Update** with email or subscription ID. To take someone off a newsletter list, use **Update List Subscription**.

## Development

- Node.js **22.23.4** and pnpm **10.6.5**
- `pnpm install --frozen-lockfile`
- `pnpm run hooks` once so the pre-commit hook runs (n8n forbids a `prepare` script on community nodes)
- `pnpm run dev` starts local n8n with this node loaded (needs Docker or Podman)
- `pnpm run lint` is n8n's eslint check. `pnpm run format` and `pnpm run lint:biome` are Biome.

## Release

Merge to `main` does not publish. Ship from a GitHub Release: bump `version` and `CHANGELOG.md`, merge, then create a stable release. `.github/workflows/publish.yml` lints, builds, and runs `pnpm publish --provenance --access public`.

One-time npm setup: add this repository as a trusted GitHub Actions publisher for `@beehiiv/n8n-nodes-beehiiv` (workflow filename `publish.yml`), or set `NPM_TOKEN`. After npm publish, submit [https://www.npmjs.com/package/@beehiiv/n8n-nodes-beehiiv](https://www.npmjs.com/package/@beehiiv/n8n-nodes-beehiiv) through the [n8n Creator Portal](https://creators.n8n.io).

## Resources

- [beehiiv API](https://developers.beehiiv.com)
- [n8n community nodes](https://docs.n8n.io/integrations/#community-nodes)
