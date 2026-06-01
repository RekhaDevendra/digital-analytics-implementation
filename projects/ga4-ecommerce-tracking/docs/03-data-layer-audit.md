# Data Layer Audit

## Audit Process

Using Chrome DevTools, the dataLayer implementation was reviewed.

## Events Identified

- view_item_list
- view_item
- add_to_cart
- begin_checkout
- add_shipping_info
- add_payment_info
- purchase

---

## Purchase Event Review

Purchase data contained:

- Currency
- Value
- Tax
- Shipping
- Product Information

Missing:

- transaction_id
- coupon

This required additional enrichment within GTM.
