# 05 — GA4 Event Taxonomy

## Purpose

Define the events needed to answer business questions before creating GTM tags.

For every event we document:

- Business question
- Why it matters
- Event name
- Trigger concept
- Required parameters
- Priority
- QA validation

## Priority 1 — Revenue / ecommerce

| Event | Business purpose | Priority |
|---|---|---|
| `purchase` | Measure completed transactions and revenue | P1 |
| `begin_checkout` | Measure checkout initiation | P1 |
| `add_payment_info` | Understand checkout progression | P1 |
| `add_shipping_info` | Understand checkout progression | P1 |

## Priority 2 — Cart / purchase intent

| Event | Business purpose | Priority |
|---|---|---|
| `add_to_cart` | Measure purchase intent | P1 |
| `remove_from_cart` | Understand cart abandonment behavior | P2 |

## Priority 3 — Product discovery

| Event | Business purpose | Priority |
|---|---|---|
| `view_item` | Measure product interest | P1 |
| `view_item_list` | Measure product-list exposure | P2 |
| `select_item` | Measure product selection from a list | P2 |

## Priority 4 — Search / engagement

| Event | Business purpose | Priority |
|---|---|---|
| `search` | Understand internal search behavior | P2 |
| Newsletter subscription event | Measure owned-audience growth | P1 |
| Selected meaningful engagement events | Diagnose discovery/UX | P2/P3 |

## Ecommerce parameters

The exact ecommerce item data must be taken from the site's implementation and GA4 ecommerce requirements rather than invented.

Potential item-level data includes:

- `item_id`
- `item_name`
- `item_category`
- `price`
- `quantity`

Transaction-level data includes:

- `transaction_id`
- `value`
- `currency`

## Naming convention

Use GA4 recommended event names where an applicable recommended event exists. Ecommerce events must follow Google's required naming.

For custom events, use a consistent naming convention such as `snake_case`.

## QA requirement

Every event must be tested in GTM Preview and GA4 DebugView before publication.

## Status

**Complete — taxonomy drafted.**
