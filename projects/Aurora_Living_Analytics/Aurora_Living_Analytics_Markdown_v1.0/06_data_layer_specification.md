# 06 — Data Layer Specification

## Purpose

Define what information the website needs to expose so GTM can read it reliably.

The Data Layer is the bridge between website interactions/data and tools such as GTM and GA4.

## Principle

Use the simplest reliable source of data:

1. Built-in GTM functionality
2. Custom listener, if necessary
3. Developer/plugin Data Layer implementation

This follows the DVTT-style reasoning used in the Analytics Mania course materials.

## Required ecommerce data

### Product interaction

For product-related events, the Data Layer should expose the product information required by the GA4 ecommerce specification.

Example conceptual structure:

```javascript
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'view_item',
  ecommerce: {
    currency: 'CAD',
    value: 29.99,
    items: [{
      item_id: 'PRODUCT_ID',
      item_name: 'PRODUCT_NAME',
      price: 29.99,
      quantity: 1
    }]
  }
});
```

**Important:** The example is a structure, not production data. Replace placeholders with actual site values.

## Purchase data

A purchase event should expose:

- `transaction_id`
- `value`
- `currency`
- `items`
- Any other required ecommerce data

Purchase tracking must be protected against duplicate firing.

## Newsletter subscription

The website should expose a reliable signal when a subscription is successfully completed, not merely when the form is viewed or clicked.

Potential conceptual structure:

```javascript
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'newsletter_subscription'
});
```

The final event name and implementation must be validated against the actual form behavior.

## GTM variables

Potential variables:

- Data Layer Variable — transaction ID
- Data Layer Variable — ecommerce value
- Data Layer Variable — currency
- Data Layer Variable — ecommerce items
- Data Layer Variable — item ID
- Data Layer Variable — item name
- Data Layer Variable — quantity

## Data Layer rules

- Prefer `dataLayer.push()` rather than replacing the Data Layer.
- Keep key names consistent.
- Avoid personally identifiable information.
- Use the GA4 ecommerce structure for ecommerce events.
- Document developer requirements before implementation.
- Test every Data Layer push in GTM Preview.

## Status

**Complete — specification ready for hands-on implementation.**
