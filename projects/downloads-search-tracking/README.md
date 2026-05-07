# Downloads Search Tracking — Enterprise Manufacturing Website

## Project Overview

Implemented GA4 + Google Tag Manager tracking for the Downloads page search functionality for a large enterprise manufacturing website with global US and Canada properties.

The objective was to capture:

- Search terms entered by users  
- Document Type selected  
- File Type selected  
- Search interaction method (button click, Enter key, form submit)

This tracking was required because the Downloads page does not update the URL with query parameters, making standard query-parameter-based tracking impossible.

---

## Business Requirement

Stakeholders needed visibility into how users interact with the Downloads page search bar and filters.

The tracking helps answer:

- What are users searching for?  
- Which document types are most used?  
- Which file types are most requested?  
- How often users search before downloading files  
- Whether Downloads page search behavior can support future UX and content decisions  

This supports:

- UX decisions  
- Content optimization  
- Download strategy improvements  
- Internal reporting  

---

## Problem Statement

Existing FAQ search tracking worked because the FAQ search updated the URL or query parameters.

The Downloads page behaved differently:

- URL did not change after search  
- Search used a form-based interaction  
- Dropdown filters were part of the search flow  
- Native GTM form submit tracking created noisy events  
- Standard GA4 search tracking was not sufficient  

A custom event-based tracking approach was required.

---

## Solution Approach

A GTM Custom HTML Listener was implemented to detect:

- Search button click  
- Enter key submission  
- Form submit fallback  

The listener pushes a custom event into the dataLayer:

```javascript
event: 'download_search'

## Captured Parameters
## DOM Elements Used

| Element                | Selector                                 |
| ---------------------- | ---------------------------------------- |
| Search form            | `#searchFilesForm`                       |
| Search input           | `#searchPhrase`                          |
| Document type dropdown | `#documentType`                          |
| File type dropdown     | `#mimeType`                              |
| Search button          | `#searchFilesForm button[type="submit"]` |

## When users search with filters but no keyword:

```javascript
search_term = "(not provided)"

This ensures filter-based searches are still measurable.

## Event Architecture

Custom HTML Listener
↓
dataLayer.push({ event: "download_search" })
↓
GTM Custom Event Trigger: download_search
↓
GA4 Event Tag
↓
GA4 Event Name: view_search_results

---

## QA Validation
Validation was completed using:

- GTM Preview
- Browser Console
- dataLayer validation
- GA4 DebugView
- Manual search testing

### Confirmed scenarios:

- Keyword search + button click
- Enter key submission
- Filter-only searches
- Empty search prevention
- Duplicate prevention
- GA4 tag firing validation

### Detailed QA documentation is available in:
qa-checklist.md

---

## Final Status

Completed and published for production.

The same implementation pattern can be replicated across additional regional properties where the Downloads page structure matches.

---
