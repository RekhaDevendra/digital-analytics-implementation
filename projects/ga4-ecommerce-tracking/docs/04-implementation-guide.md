# GTM Implementation

## Variables

### Data Layer Variables

- DLV - ecommerce.items
- DLV - ecommerce.currency
- DLV - ecommerce.value
- DLV - ecommerce.tax
- DLV - ecommerce.shipping
- DLV - ecommerce.shipping_tier

### URL Variable

URL - transaction_id

### DOM Variable

DOM - Coupon Code

---

## Triggers

### Custom Events

- view_item_list
- view_item
- add_to_cart
- begin_checkout
- add_shipping_info
- add_payment_info

### Purchase Trigger

DOM Ready + transaction_id exists

---

## Tags

### GA4 Ecommerce Events

- view_item_list
- view_item
- add_to_cart
- begin_checkout
- add_shipping_info
- add_payment_info
- purchase
