// GTM Variable: JS - FAQ Result Count
// Type: Custom JavaScript
//
// Reads the numeric result count from the .resultCounter DOM element on the
// FAQ search results page. There is no dataLayer push for this surface, so
// the count is read directly from the rendered page.

function() {
  var el = document.querySelector('.resultCounter');
  if (!el) return 0;
  var text = el.innerText.replace(/[^0-9]/g, '');
  return text ? parseInt(text) : 0;
}
