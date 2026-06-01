# Project Overview

## Background

A custom Shopify ecommerce store required complete GA4 Ecommerce tracking implementation.

The developer had already implemented ecommerce dataLayer pushes but additional development support was unavailable.

The objective was to implement a scalable solution using existing resources.

---

## Project Goals

Track:

- Product List Views
- Product Detail Views
- Add to Cart
- Begin Checkout
- Shipping Selection
- Payment Information
- Purchases

---

## Constraints

### Transaction ID Missing

Purchase events lacked transaction IDs.

### Coupon Missing

Coupon information was not included in the dataLayer.

### DOM Timing Risk

Purchase events could fire before coupon information becomes available.
