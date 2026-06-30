# Bug Log

Every bug identified during the audit, with root cause, fix, and verification evidence. Listed in the order discovered.

---

## #1 — FAQ Search Tag Fired on Page Load, Not on Actual Search

**Symptom**
`GA4 - FAQ Search Results` was firing on page **Initialization** rather than when a user actually performed a search. `search_term` arrived empty in GA4.

**Root Cause**
The tag's trigger was a Custom Event named `view_search_results` with `_event matches RegEx view_search_results` — but nothing on the FAQ page ever pushed an event with that name to the dataLayer. The tag was instead firing on GTM's `Initialization` message, which happens on every page load regardless of user action, and `search_term` was wired to a Data Layer Variable (`dlv - search_term`) that was never populated, since there was no corresponding dataLayer push.

**Why It Still "Looked Like It Worked"**
Search terms did appear in GA4 historically — but only because the search query lives in the page URL (`?query=`), and a separate mechanism happened to read it. The tag firing and the search term appearing were two disconnected things that coincidentally lined up often enough to go unnoticed.

**Fix**

1. Built a Custom JavaScript variable to read the term directly from the URL (with a referrer fallback for edge cases where the URL resets):

```javascript
// JS - FAQ Search Term from URL
function() {
  var url = window.location.search;
  var match = url.match(/[?&]query=([^&]*)/);
  if (match) return decodeURIComponent(match[1]);

  var ref = document.referrer;
  var refMatch = ref.match(/[?&]query=([^&]*)/);
  return refMatch ? decodeURIComponent(refMatch[1]) : '(not set)';
}
```

2. Replaced the trigger with a Page View trigger scoped to the FAQ search results state specifically:

```
Trigger: pageview - faq_search_results
Type: Page View, Some Page Views
Conditions:
  {{Page URL}} contains /search/faq
  {{Page URL}} matches RegEx [?&]query=[^&]+
```

(The second condition was tightened from `contains query=` to a regex — see Bug #3 below for why.)

3. Repointed the tag's `search_term` parameter from `{{dlv - search_term}}` to `{{JS - FAQ Search Term from URL}}`.

**Verification**
Confirmed via GTM Preview + GA4 DebugView across multiple real searches:
- `search_term: ditra` → `search_has_results: true`, `search_result_count: 100`
- `search_term: ff` → `search_has_results: false`, `search_result_count: 0`
- `search_term: schene` → `search_has_results: false`, `search_result_count: 0`

---

## #2 — Zero-Results Tag Built on a False Premise

**Symptom**
A separate tag, `GA4 - faq_zero_results`, was firing correctly on genuine zero-results searches during initial testing — but later testing showed it also firing on searches that returned 100 results (e.g. searching "ditra"), and even on plain page landings with no search performed at all.

**Root Cause**
The trigger watched for visibility of `.faqPage .contactBlock`, based on the observation that a "Didn't find what you're looking for? Ask us a question / Call us" block appeared on a zero-results page. Further inspection revealed this block is a **persistent CTA present on every FAQ page** regardless of result count — it simply renders below the result list, with or without results. Element visibility on it was never a reliable zero-results signal; it coincidentally appeared to be one during the first test because zero-results pages have little content above it, making it visible sooner on scroll.

**Fix**
The tag and its trigger (`visibility - faq_zero_results`) were **paused**, not deleted (kept for reference / possible future use with a corrected trigger). Zero-results detection is instead handled entirely within the main `GA4 - FAQ Search Results` tag (Bug #1's fix), using:

```javascript
// JS - FAQ Has Results
function() {
  var el = document.querySelector('.resultCounter');
  if (!el) return false;
  var text = el.innerText.replace(/[^0-9]/g, '');
  return text && parseInt(text) > 0 ? true : false;
}

// JS - FAQ Result Count
function() {
  var el = document.querySelector('.resultCounter');
  if (!el) return 0;
  var text = el.innerText.replace(/[^0-9]/g, '');
  return text ? parseInt(text) : 0;
}
```

Both wired as parameters on the main `GA4 - FAQ Search Results` tag: `search_has_results` and `search_result_count`.

**Reporting Equivalent**
Zero-results rate is now queried in GA4 Explore by filtering `event name = view_search_results` and breaking out by the `search_has_results` parameter, rather than relying on a separate event name.

**Verification**
GA4 Explore (Free Form), `search_has_results` as row dimension, event count as metric, filtered to `search_context = faq`:

| search_has_results | Event count |
|---|---|
| false | 3 |
| true | 2 |

(Small early sample, includes QA testing — see `ga4-reporting-setup.md` for the internal traffic filter set up afterward to prevent this going forward.)

---

## #3 — Empty `query=` Parameter Misread as a Valid Search

**Symptom**
A page load at `/search/faq?query=` (empty value, no search term after the equals sign) was, in some cases, captured as a successful search with `search_has_results: true` and a full result count — effectively a default/landing page state being logged as if a user had searched and found 100 results.

**Root Cause**
The trigger condition `{{Page URL}} contains query=` is satisfied by any URL containing that literal substring, including one where `query=` has nothing after it. This let default page states with an empty query parameter slip through and fire the tag.

**Fix**
Tightened the condition from a `contains` match to a regex requiring at least one character after the equals sign:

```
Before: {{Page URL}} contains query=
After:  {{Page URL}} matches RegEx [?&]query=[^&]+
```

**Verification**
Tested `/search/faq?query=` (empty) directly in GTM Preview after the fix — confirmed `GA4 - FAQ Search Results` did **not** fire. Only baseline tags (GA4 Config, Hotjar, Clarity, Pinterest) fired. Re-tested with a real term immediately after to confirm the tag still fires correctly for genuine searches.

---

## #4 — Result-Click Tracking Fired on Any Click, Anywhere on a Search Page

**Symptom**
`GA4 - search_result_click` fired on every single click on any page whose URL contained `/search` — including clicking into the empty search input box itself, before typing anything.

**Root Cause**
The trigger condition was `gtm.click contains /search`, which checks the **current page URL**, not what element was actually clicked. Any click anywhere on `/search`, `/search/faq`, or similar pages satisfied this condition, regardless of whether the click was on an actual search result.

**Status**
Identified as broken and **paused**, rather than patched, since a correct implementation requires inspecting the actual DOM structure of a result item (a product card, an FAQ answer link) and scoping the trigger to that specific element — the same precision-targeting approach used for the other fixes in this log. Deprioritized below the main search dev ticket; flagged as a follow-up task.

---

## #5 — `.ca` Container Had the Original, Unfixed Bugs

**Symptom**
After fixing all of the above in the `.com` GTM container, the equivalent `.ca` container still showed the original broken behavior — tag firing on Initialization, empty `search_term`, zero-results tag misfiring on successful searches.

**Root Cause**
`.com` and `.ca` run on **entirely separate GTM containers** under the same GTM account, and separate GA4 properties. No configuration, publish, or fix in one propagates to the other automatically.

**Fix**
Every fix in this log (#1–#4) was independently re-diagnosed and re-applied in the `.ca` container, using the same variables, trigger logic, and tag structure as `.com`. See `ca-rollout-checklist.md` for the step-by-step process used.

**Verification**
Same multi-scenario test pass repeated in `.ca`: zero-results search, successful search, empty-query landing — all confirmed correct post-fix.
