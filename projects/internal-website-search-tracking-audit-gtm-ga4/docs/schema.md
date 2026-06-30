# Search Event Schema

## Event Name

`search_performed` — used for every search interaction, on every search surface (main, FAQ, downloads), for both typed searches and filter selections.

Why one event instead of several: `search_context` and `search_method` differentiate the scenario, so GA4 reporting stays unified — one event, sliceable by any dimension — instead of needing different reports for different event names.

## Full Field Reference

| Field | Type | Required | Description | Example |
|---|---|---|---|---|
| `search_term` | string | yes | The query the user typed, or empty if filter-only | `'shower pan'` |
| `search_context` | string | yes | Which search surface | `'main'`, `'faq'`, `'downloads'` |
| `search_result_count` | number | yes | Total results returned | `44` |
| `search_has_results` | boolean | yes | `true` if count > 0 | `true` |
| `search_method` | string | yes | How the search was triggered | `'text_input'`, `'filter'` |
| `filter_name` | string | only if `search_method = 'filter'` | Which filter was used | `'document_type'` |
| `filter_value` | string | only if `search_method = 'filter'` | Selected filter value | `'PDF'` |

## Per-Surface Examples

### Main Search
```javascript
window.dataLayer.push({
  event: 'search_performed',
  search_term: 'shower pan',
  search_context: 'main',
  search_result_count: 44,
  search_has_results: true,
  search_method: 'text_input',
  filter_name: '',
  filter_value: ''
});
```

### FAQ Search
Same schema, `search_context: 'faq'`. Implemented client-side in GTM by reading the `query=` URL parameter — no dev dataLayer push needed, since the FAQ search page already encodes the term in the URL. Trigger requires a non-empty `query=` value (`[?&]query=[^&]+`) to avoid misreading a default/empty page load as a real search — see `bug-log.md` #3.

`search_result_count` and `search_has_results` are read directly from the page's `.resultCounter` DOM element via Custom JavaScript variables, rather than via dataLayer, since there is no application-level push on this surface. See `gtm-setup.md` for the variable code.

### Downloads Search
Already implemented by dev as `download_search` (legacy event name, kept as-is since it predates this project and works correctly). Carries equivalent fields: `search_term`, `download_document_type`, `download_file_type`, `search_location`, `search_method`.

## Why Explicit dataLayer Pushes Instead of GTM Auto-Events

GTM's auto-event listeners (Form Submit, Click, Element Visibility) react to generic browser events — they don't know anything about business outcomes. A Form Submit auto-event only knows "a form was submitted," not whether the search succeeded, how many results came back, or what page context it happened in.

An explicit dataLayer push is the application itself declaring "a search just completed, here is the outcome" — at the exact moment it happens, with full context. This is:

- **Resilient to DOM/CSS changes** — doesn't break when developers restructure HTML
- **Outcome-aware** — captures result count and success/failure, which generic listeners structurally cannot
- **Enables alerting** — `search_has_results: false` spikes can be monitored directly
