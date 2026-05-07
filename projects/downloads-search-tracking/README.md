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

Stakeholders needed visibility into:

- What users are searching for
- Which file types are most requested
- Which document categories are most used
- How users interact with the Downloads page

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
