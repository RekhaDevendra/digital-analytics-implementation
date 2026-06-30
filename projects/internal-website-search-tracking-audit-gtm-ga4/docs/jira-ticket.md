# JIRA Ticket — Search Analytics: Main Search dataLayer Implementation + Zero Results UX Fix

## Background

We have been auditing and improving our search tracking across schluter.com and .ca as part of the Intentive search improvement project. After a full GTM audit we found:

- FAQ and Downloads search tracking — working correctly, no changes needed
- Main search — this is the only remaining gap

## The Problem

Right now, main search tracking relies on GTM's generic Form Submit auto-event listener. This means GTM is watching for any form submission on the page and reacting to it — it isn't something the application explicitly tells us.

This current setup is fragile for a few reasons:

- It's tied to the DOM structure (CSS classes, button paths). If the search box HTML changes, tracking can silently break with no error.
- It only knows a form was submitted — it has no idea how many results came back or whether the search succeeded.
- Search terms currently show up in GA4 only because we separately read them from the page URL — not because the form submit event itself sends that data.
- There is no way to detect zero-result searches at all today.

## What We Need

A proper dataLayer push that the website sends the moment search results load — telling us directly what happened, instead of GTM guessing from a generic form submit.

## ITEM 1 — dataLayer Push on Main Search Results Page

URL: `/search?text=`
Fire on page load:

```javascript
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'search_performed',
  search_term: '<dynamic: search query from URL text= parameter>',
  search_context: 'main',
  search_result_count: <dynamic: total number of results>,
  search_has_results: <dynamic: true if count > 0, false if count = 0>,
  search_method: 'text_input',
  filter_name: '',
  filter_value: ''
});
```

**Dynamic Fields Reference**

| Field | What to pass | Example |
|---|---|---|
| `search_term` | Search query from URL `text=` parameter | `'shower pan'` |
| `search_result_count` | Total results the page returns | `44` |
| `search_has_results` | `true` if count > 0, `false` if 0 | `true` |

## ITEM 2 — Zero Results UX Fix

When the main search returns 0 results the page renders completely blank with no message to the user. We confirmed this by inspecting the DOM — there is no element or class for this state at all.

This is both a UX problem and a tracking problem. Please add this element and show it only when `search_result_count = 0`:

```html
<div class="search-no-results">
  No results found for your search. Try different keywords or browse our products.
</div>
```

This fixes two things at once:
- Users get feedback instead of a blank page
- GTM gets a CSS hook to detect and track zero result searches

## Why This Matters

Right now we can see search usage and conversions both improved after last week's deployment, but we can't tell whether search is driving those conversions or measure the difference between users who find what they're searching for versus those who don't. This data will let us show:

- Which keywords users are searching
- Which searches return zero results
- Whether the recent fixes changed how users search
- Zero results rate before and after deployment

## After Implementation

1. We'll QA in GTM, and once confirmed we'll deprecate the old fragile form submit tracking.
2. We'll build a GA4 report to monitor search performance and an alert for zero results spikes — you'll only hear about it when something is actually wrong.
