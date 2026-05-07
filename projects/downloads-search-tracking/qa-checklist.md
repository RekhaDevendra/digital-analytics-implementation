# QA Checklist — Downloads Search Tracking

## GTM Preview Validation

- [ ] Custom HTML listener fires on Page View.
- [ ] Listener trigger condition uses `Page Path contains /download/files`.
- [ ] `download_search` event appears after search execution.
- [ ] GA4 event tag fires on `download_search`.
- [ ] GA4 event name is `view_search_results`.
- [ ] Event fires once per search action.

## Data Layer Validation

Expected dataLayer payload:

```javascript
{
  event: 'download_search',
  search_term: 'DOWNLOAD_TEST_999',
  download_document_type: 'Articles',
  download_file_type: 'Pdf',
  search_location: 'downloads_page',
  search_method: 'search_button'
}

## Test Cases

| Scenario                            | Expected Result                    | Status |
| ----------------------------------- | ---------------------------------- | ------ |
| Keyword search + button click       | Event fires once                   | Pass   |
| Keyword search + Enter key          | `search_method = enter_key`        | Pass   |
| Keyword + document type + file type | All values captured                | Pass   |
| Filters only + search button        | `search_term = (not provided)`     | Pass   |
| Empty search + no filters           | No event fires                     | Pass   |
| Duplicate click                     | No duplicate event within 1 second | Pass   |
| GA4 tag fires                       | `view_search_results` fires        | Pass   |
| Console dataLayer test              | Correct payload logged             | Pass   |


## Browser Console Validation  
## Console helper  

```javascript

(function () {
  var originalPush = window.dataLayer.push;

  window.dataLayer.push = function () {
    console.log('dataLayer push:', arguments);
    return originalPush.apply(window.dataLayer, arguments);
  };
})();

## Final QA Result
Passed

Commit message:

```text
Add downloads search QA checklist
