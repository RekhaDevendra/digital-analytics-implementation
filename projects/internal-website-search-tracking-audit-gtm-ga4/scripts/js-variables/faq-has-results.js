// GTM Variable: JS - FAQ Has Results
// Type: Custom JavaScript
//
// Boolean version of faq-result-count.js — true if the FAQ page's
// .resultCounter shows a count greater than zero.
//
// IMPORTANT: do not use element visibility on .contactBlock for this
// purpose — that element is a persistent "Didn't find what you're
// looking for?" CTA shown on every FAQ page regardless of result count.
// See docs/bug-log.md #2.

function() {
  var el = document.querySelector('.resultCounter');
  if (!el) return false;
  var text = el.innerText.replace(/[^0-9]/g, '');
  return text && parseInt(text) > 0 ? true : false;
}
