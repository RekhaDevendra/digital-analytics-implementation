# .ca Rollout Checklist

`.ca` runs on a **separate GTM container** (GTM-KQ3WBZ) and a **separate GA4 property** (`G-5GDMD8HLKP`) from `.com` (GTM-P77F4J, `G-8Q9PT3VNTH`). Nothing published in one propagates to the other — every fix had to be independently diagnosed and re-applied.

**Status: Complete.** This checklist reflects what was actually done, kept as a reference for future similar work (e.g. if a third property/container is ever added).

## Pre-existing State Found in `.ca`

`.ca` already had a `GA4 - FAQ Search Results` tag, built by the same previous consultancy — but it had the **identical bugs** found in `.com`:

- Firing on page Initialization, not on actual search (bug-log.md #1)
- A `GA4 - faq_zero_results` tag built on the same flawed `.contactBlock` visibility logic (bug-log.md #2)
- Same `contains query=` empty-value vulnerability (bug-log.md #3)

This confirmed the bugs were systemic to how the previous consultancy built the tracking, not a one-off mistake on a single property.

## Steps Completed

- [x] Confirmed `.ca` URL patterns match `.com`: `/search/faq?query=`, same DOM structure (`.resultCounter`, `.contactBlock`)
- [x] Confirmed `.ca` GA4 Measurement ID: `G-5GDMD8HLKP`
- [x] Created `JS - FAQ Search Term from URL` in `.ca` container
- [x] Created `JS - FAQ Result Count` in `.ca` container
- [x] Created `JS - FAQ Has Results` in `.ca` container
- [x] Created `pageview - faq_search_results` trigger with regex-tightened `query=` condition
- [x] Rewired existing `GA4 - FAQ Search Results` tag: swapped trigger, repointed `search_term`/`search_result_count`/`search_has_results` to the new JS variables
- [x] Paused existing `GA4 - faq_zero_results` tag
- [x] Paused existing `GA4 - search_result_click` tag (same broken `gtm.click contains /search` condition as `.com`)
- [x] QA'd in GTM Preview: zero-results search, successful search, empty-query landing — all confirmed correct
- [x] Set up Internal Traffic + Data Filter in the `.ca` GA4 property (separate from `.com`'s)
- [x] Published `.ca` container

## Main Search — Still Pending (Both Properties)

The dev ticket (`jira-ticket.md`) covers the dataLayer push needed for main search. Once implemented:

- [ ] Confirm whether dev implements on both `.com` and `.ca`, or if `.ca` needs a separate ticket (depends on whether they share a codebase/template across domains, which was not confirmed during this project)
- [ ] Build `dlv -` variables, `custom - search_performed` trigger, and `GA4 - search_performed` tag in `.ca` container (the `.com` versions already exist and are dormant, confirmed not firing)
- [ ] QA, then publish

## Differences Found Between `.com` and `.ca`

- None in URL structure or DOM class names — both properties use identical markup for the FAQ search page, which meant the same fix could be applied without modification
- GA4 Measurement IDs and GTM container IDs differ, as expected (separate properties/containers)
- Pre-existing internal traffic rules in GA4 already had entries from prior work — new rules were added rather than editing existing ones (UI did not expose an edit path for the existing rule's IP list)
