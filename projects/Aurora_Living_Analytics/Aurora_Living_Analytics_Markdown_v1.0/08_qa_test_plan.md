# 08 — QA & Testing Plan

## Purpose

Verify that analytics implementation is accurate, complete and stable before publishing.

## Test environments

- GTM Preview
- GA4 DebugView
- Browser developer tools where necessary
- Website test environment

## Core test matrix

| Test | Expected result | Status |
|---|---|---|
| Page load | Google tag fires as expected | ☐ |
| Product view | `view_item` fires with correct item data | ☐ |
| Add to cart | `add_to_cart` fires once with correct value/items | ☐ |
| Begin checkout | `begin_checkout` fires once | ☐ |
| Shipping info | `add_shipping_info` fires correctly | ☐ |
| Payment info | `add_payment_info` fires correctly | ☐ |
| Purchase | `purchase` fires once with transaction ID/value/items | ☐ |
| Newsletter success | Subscription event fires only after successful submission | ☐ |
| Internal search | `search` captures intended query context | ☐ |

## Ecommerce QA

Check:

- Event name
- Trigger condition
- Currency
- Value
- Transaction ID
- Item ID
- Item name
- Price
- Quantity
- Duplicate firing
- Missing values
- Incorrect values

## Negative tests

Confirm that:

- Purchase does not fire on page refresh unless a new transaction actually occurs.
- Add-to-cart does not fire from unrelated clicks.
- Newsletter event does not fire from failed submissions.
- Internal interactions are not accidentally classified as outbound clicks.
- Test/debug activity is handled appropriately.

## QA evidence

For each completed test, record:

- Date
- Environment
- Test case
- Expected result
- Actual result
- Screenshot/reference
- Pass/fail
- Fix required

## Status

**Ready for implementation.**
