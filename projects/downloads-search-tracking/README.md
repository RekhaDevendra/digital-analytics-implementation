# Downloads Search Tracking – Schluter

## Project Overview

Implemented GA4 + Google Tag Manager tracking for the Downloads page search functionality on the Schluter website.

The objective was to capture:

- Search terms entered by users
- Document Type selected
- File Type selected
- Search interaction method (button click, enter key, form submit)

This tracking was required because the Downloads page does not update the URL with query parameters, making standard query-parameter-based tracking impossible.

---

## Business Requirement

Stakeholders needed visibility into how users interact with the Downloads page search bar and filters.

The tracking helps answer:

- What are users searching for?
- Which document types are most used?
- Which file types are most requested?
- How often users search before downloading files?
- Whether Downloads page search behavior can support future UX and content decisions.

This supports:

- UX decisions
- Content optimization
- Download strategy improvements
- Internal reporting

---

## Implementation Approach

### GTM Custom HTML Listener

A custom HTML listener was implemented to detect:

- Search button click
- Enter key submission
- Form submit behavior

The listener pushes a custom event into the dataLayer:

```javascript
event: 'download_search'


## Measurement Classification

This is internal site search tracking, not traditional form tracking.

Although the Downloads page uses an HTML form, the business objective is to measure search behavior rather than form completion.

### GA4 event used:
```javascript
view_search_results

### Internal GTM custom event used:
```javascript
download_search

## Initial Problem

The existing FAQ search tracking worked because the FAQ search changed the URL or query parameter.

- The Downloads page behaved differently:

- URL did not change with query parameters.
- Search happened through a form interface.
- Dropdown filters were part of the search experience.
- Native GTM form submit events were noisy.
- A custom event-based tracking approach was required.

## DOM Elements Used

| Element                | Selector                                 |
| ---------------------- | ---------------------------------------- |
| Search form            | `#searchFilesForm`                       |
| Search input           | `#searchPhrase`                          |
| Document type dropdown | `#documentType`                          |
| File type dropdown     | `#mimeType`                              |
| Search button          | `#searchFilesForm button[type="submit"]` |

## Measurement Design Decision
The event fires only when a search is intentionally executed.

Tracked actions:

- Search button click
- Enter key submission
- Form submit fallback

Not tracked:

- Dropdown selection alone
- Typing without submitting
- Opening dropdowns
- Empty search with no keyword and no filters

This keeps reporting focused on stronger search intent and avoids noisy interaction data.

## Event Architecture
Custom HTML listener
↓
dataLayer.push({ event: "download_search" })
↓
GTM Custom Event Trigger: download_search
↓
GA4 Event Tag
↓
GA4 Event Name: view_search_results

## Data Layer Event Example
```javascript

window.dataLayer.push({
  event: 'download_search',
  search_term: 'DOWNLOAD_TEST_999',
  download_document_type: 'Articles',
  download_file_type: 'Pdf',
  search_location: 'downloads_page',
  search_method: 'search_button'
});

## Captured Parameters

| Parameter                | Description                   | Example                                     |
| ------------------------ | ----------------------------- | ------------------------------------------- |
| `search_term`            | Keyword entered by user       | `Ditra`                                     |
| `download_document_type` | Selected document type filter | `Articles`                                  |
| `download_file_type`     | Selected file type filter     | `Pdf`                                       |
| `search_location`        | Search module location        | `downloads_page`                            |
| `search_method`          | Search execution method       | `search_button`, `enter_key`, `form_submit` |

When users search with filters but no keyword:
```javascript
search_term = (not provided)

## Final Custom HTML Listener

See implementation file:
```javascript
gtm/custom-html-downloads-search-listener.html

## GTM Setup
```javascript
## Tag 1: Custom HTML Listener
Tag name: cHTML - Downloads Search Listener
Tag type: Custom HTML
Trigger: Page view - download_page

## Trigger: Listener Page View
Trigger type: Page View
Condition: Page Path contains /download/files

## Trigger: Custom Event
Trigger name: custom - download_search
Trigger type: Custom Event
Event name: download_search

## Data Layer Variables
| GTM Variable                   | Data Layer Variable Name |
| ------------------------------ | ------------------------ |
| `dlv - search_term`            | `search_term`            |
| `dlv - download_document_type` | `download_document_type` |
| `dlv - download_file_type`     | `download_file_type`     |
| `dlv - search_location`        | `search_location`        |
| `dlv - search_method`          | `search_method`          |

## GA4 Event Tag
Tag name: GA4 event - view_search_results - Downloads
Event name: view_search_results
Trigger: custom - download_search

## GA4 Event Parameters
| Event Parameter          | Value                              |
| ------------------------ | ---------------------------------- |
| `search_term`            | `{{dlv - search_term}}`            |
| `download_document_type` | `{{dlv - download_document_type}}` |
| `download_file_type`     | `{{dlv - download_file_type}}`     |
| `search_location`        | `{{dlv - search_location}}`        |
| `search_method`          | `{{dlv - search_method}}`          |

## GA4 Custom Dimensions

Recommended event-scoped custom dimensions:

| Dimension Name         | Event Parameter          |
| ---------------------- | ------------------------ |
| Search Term            | `search_term`            |
| Download Document Type | `download_document_type` |
| Download File Type     | `download_file_type`     |
| Search Method          | `search_method`          |

Optional:

Dimension Name	Event Parameter
Search Location	search_location

## QA Validation

QA was completed using:

- GTM Preview
- Browser console
- dataLayer validation
- GA4 DebugView
- Manual search testing

## QA Test Cases
| Test Case                         | Expected Result                  |
| --------------------------------- | -------------------------------- |
| Keyword + filters + search button | `download_search` fires once     |
| Keyword + Enter key               | `search_method = enter_key`      |
| Filters only + search button      | `search_term = (not provided)`   |
| Empty search + no filters         | No event fires                   |
| Duplicate click                   | Duplicate prevention works       |
| GA4 tag firing                    | `view_search_results` fires once |

## Successful QA Example
```javascript

{
  event: 'download_search',
  search_term: 'DOWNLOAD_TEST_999',
  download_document_type: 'Articles',
  download_file_type: 'Pdf',
  search_location: 'downloads_page',
  search_method: 'search_button'
}

GA4 event fired as:

view_search_results

### Known DebugView Note

GA4 DebugView may not always display search_term consistently because search_term is a recommended GA4 parameter and multiple search implementations may use the same view_search_results event.

The source of truth for QA was:

GTM Preview dataLayer event + GA4 tag firing

## Reporting Use Cases

This implementation supports reporting on:

Top Downloads page search terms
Most selected document types
Most selected file types
Search method usage
Search to file download journey
Search behavior across US and Canada properties

## Final Status
Completed and published

Commit message:

```text
Add downloads search tracking project documentation
