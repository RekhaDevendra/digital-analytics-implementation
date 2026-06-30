// GTM Variable: JS - FAQ Search Term from URL
// Type: Custom JavaScript
//
// Reads the search term from the `query=` URL parameter on the FAQ search
// page. Falls back to the referrer URL to handle cases where the page URL
// resets (e.g. after certain zero-results page states).
//
// See docs/bug-log.md #1 for why this replaced the original (broken)
// approach of reading from a dataLayer variable that nothing populated.

function() {
  // Try current URL first
  var url = window.location.search;
  var match = url.match(/[?&]query=([^&]*)/);
  if (match) return decodeURIComponent(match[1]);

  // Fallback to referrer URL
  var ref = document.referrer;
  var refMatch = ref.match(/[?&]query=([^&]*)/);
  return refMatch ? decodeURIComponent(refMatch[1]) : '(not set)';
}
