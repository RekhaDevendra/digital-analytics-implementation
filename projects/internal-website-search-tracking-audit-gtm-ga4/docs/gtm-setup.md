# GTM Setup Runbook

Step-by-step build instructions. Use this to replicate the setup in the `.ca` container, or to rebuild/audit the `.com` container.

## Prerequisites

- GA4 Measurement ID for the target property
- Confirm the search page URL patterns match what's listed below (if `.ca` uses different paths, adjust the trigger conditions accordingly)

---

## 1. Variables

### `JS - FAQ Search Term from URL`
Type: Custom JavaScript
```javascript
function() {
  // Try current URL first
  var url = window.location.search;
  var match = url.match(/[?&]query=([^&]*)/);
  if (match) return decodeURIComponent(match[1]);

  // Fallback to referrer URL (handles zero-results page reset)
  var ref = document.referrer;
  var refMatch = ref.match(/[?&]query=([^&]*)/);
  return refMatch ? decodeURIComponent(refMatch[1]) : '(not set)';
}
```

### `JS - FAQ Result Count`
Type: Custom JavaScript
```javascript
function() {
  var el = document.querySelector('.resultCounter');
  if (!el) return 0;
  var text = el.innerText.replace(/[^0-9]/g, '');
  return text ? parseInt(text) : 0;
}
```

### `JS - FAQ Has Results`
Type: Custom JavaScript
```javascript
function() {
  var el = document.querySelector('.resultCounter');
  if (!el) return false;
  var text = el.innerText.replace(/[^0-9]/g, '');
  return text && parseInt(text) > 0 ? true : false;
}
```

### Data Layer Variables (for main search, once dev push is live)
Create as standard "Data Layer Variable" type, pointing to the matching key:

| Variable Name | Data Layer Key |
|---|---|
| `dlv - search_term` | `search_term` |
| `dlv - search_context` | `search_context` |
| `dlv - search_result_count` | `search_result_count` |
| `dlv - search_has_results` | `search_has_results` |
| `dlv - search_method` | `search_method` |
| `dlv - filter_name` | `filter_name` |
| `dlv - filter_value` | `filter_value` |

---

## 2. Triggers

### `pageview - faq_search_results`
- Type: Page View
- Fires on: Some Page Views
- Conditions (all must be true):
  - `{{Page URL}}` contains `/search/faq`
  - `{{Page URL}}` matches RegEx `[?&]query=[^&]+`

⚠️ The second condition was originally `contains query=`, which incorrectly matched empty query parameters (`?query=` with nothing after it) and misfired the tag on default page loads. Fixed to require a regex match with at least one character after the equals sign. See `bug-log.md` #3.

### ~~`visibility - faq_zero_results`~~ — DEPRECATED, kept paused
- Originally: Element Visibility on `.faqPage .contactBlock`
- **Do not rebuild this approach.** That element is a persistent CTA shown on every FAQ page regardless of result count — it is not a reliable zero-results signal. See `bug-log.md` #2.
- Zero-results detection is instead handled via `search_has_results` on the main search results tag (below).

### `custom - search_performed` (for main search, once dev push is live)
- Type: Custom Event
- Event name: `search_performed`

---

## 3. Tags

### `GA4 - FAQ Search Results`
- Type: Google Analytics: GA4 Event
- Event Name: `view_search_results`
- Trigger: `pageview - faq_search_results`
- Parameters:
  | Parameter | Value |
  |---|---|
  | `search_term` | `{{JS - FAQ Search Term from URL}}` |
  | `page_location` | `{{Page URL}}` |
  | `search_context` | `faq` |
  | `search_result_count` | `{{JS - FAQ Result Count}}` |
  | `search_has_results` | `{{JS - FAQ Has Results}}` |

### ~~`GA4 - faq_zero_results`~~ — PAUSED, do not republish
- Was built on the now-deprecated `visibility - faq_zero_results` trigger.
- Paused rather than deleted, in case the underlying trigger logic is corrected with a proper zero-results-specific element in future.
- Zero-results data is fully available without this tag — see `ga4-reporting-setup.md`.

### `GA4 - search_performed` (main search, once dev push is live)
- Type: Google Analytics: GA4 Event
- Event Name: `view_search_results`
- Trigger: `custom - search_performed`
- Parameters: all `dlv -` variables from section 1, mapped 1:1 to matching parameter names
- Status: built and dormant — confirmed via testing that it does not fire, since nothing currently pushes a `search_performed` event to the dataLayer. Will activate automatically once dev implements the ticket in `jira-ticket.md`, no further GTM changes needed.

### ~~`GA4 - search_result_click`~~ — PAUSED, broken
- Type: Google Analytics: GA4 Event, Event Name: `search_result_click`
- Trigger: `click - search_result` — condition `gtm.click contains /search` checks the page URL, not the clicked element, so it fired on any click anywhere on a search page
- Paused. Requires a full rebuild scoped to an actual result item's CSS selector before re-enabling.

---

## 4. QA Checklist (GTM Preview Mode)

- [ ] Search FAQ with a term that has results → `GA4 - FAQ Search Results` fires, `search_term` populated, `search_has_results: true`, correct `search_result_count`
- [ ] Search FAQ with a term that returns zero results → same tag fires, `search_has_results: false`, `search_result_count: 0`
- [ ] Land on FAQ page fresh, no search performed → tag does NOT fire
- [ ] Visit `/search/faq?query=` (empty value) directly → tag does NOT fire
- [ ] Confirm FAQ tag does NOT fire on main search page (`/search?text=`)
- [ ] Confirm `GA4 - faq_zero_results` is paused and does not appear in Tags Fired for any scenario above
- [ ] Confirm `GA4 - search_result_click` is paused
- [ ] Once dev push is live: search main site → `GA4 - search_performed` fires with all fields populated
- [ ] Confirm zero-results search on main site → `search_has_results: false`, `search-no-results` element visible

Repeat this entire checklist independently for `.ca` — see `ca-rollout-checklist.md`. Fixes in `.com` do not propagate; `.ca` is a fully separate GTM container and GA4 property.
