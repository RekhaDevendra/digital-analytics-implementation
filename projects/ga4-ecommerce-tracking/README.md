# GA4 Ecommerce Tracking Implementation for a Custom Shopify Store

## Project Overview

This project demonstrates the end-to-end implementation of Google Analytics 4 Ecommerce Tracking using Google Tag Manager on a custom Shopify store.

The implementation was completed under real-world constraints where developer support was unavailable and certain business-critical parameters were not available directly in the data layer.

To address these limitations, additional data was collected through URL parameter extraction, DOM element extraction, and custom GTM configuration while maintaining GA4 ecommerce best practices.

The objective was to design a scalable tracking solution that accurately captures the full ecommerce funnel while minimizing technical debt.

---

## Measurement Objective

Implement complete GA4 ecommerce tracking for:

- Product List Views
- Product Detail Views
- Add to Cart
- Begin Checkout
- Shipping Selection
- Payment Information
- Purchase

while solving several tracking limitations without requesting additional developer resources.

---

## Technology Stack

- Google Tag Manager (GTM)
- Google Analytics 4 (GA4)
- Chrome DevTools
- Data Layer Inspection
- DOM Element Extraction

---

## Tracking Scope

| Event | Status |
|---------|---------|
| view_item_list | ✅ |
| view_item | ✅ |
| add_to_cart | ✅ |
| begin_checkout | ✅ |
| add_shipping_info | ✅ |
| add_payment_info | ✅ |
| purchase | ✅ |
