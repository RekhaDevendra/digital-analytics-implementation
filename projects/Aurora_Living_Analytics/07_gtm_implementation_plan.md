# 07 — GTM Implementation Plan

## Status

**Next implementation session — hands-on build**

This document is intentionally a build plan. The actual GTM configuration should be created and tested manually in the analytics lab.

## Implementation order

### Phase 1 — Foundation

- Confirm GA4 property
- Confirm Web data stream
- Confirm GTM container
- Confirm Google tag / GA4 installation
- Test page data collection
- Verify DebugView

### Phase 2 — Ecommerce

Implement and test:

1. `view_item`
2. `add_to_cart`
3. `begin_checkout`
4. `add_shipping_info`
5. `add_payment_info`
6. `purchase`

### Phase 3 — Product discovery

Implement and test:

- `view_item_list`
- `select_item`
- `search`

### Phase 4 — Newsletter

Implement successful newsletter subscription measurement.

### Phase 5 — Additional engagement

Only add events that answer a documented business question.

## DVTT approach

For each interaction:

**D — Data:** Is the data available?

**V — Variables:** Can GTM read the required values?

**T — Trigger:** What condition should fire the event?

**T — Tag:** What GA4 tag sends the event?

## Naming conventions

### Tags

`GA4 | Event | event_name`

Example:

`GA4 | Event | add_to_cart`

### Triggers

`CE | event_name`

or, where appropriate:

`Click | Add to Cart`

### Variables

`DLV | parameter_name`

Example:

`DLV | ecommerce.items`

## Testing workflow

1. Create one change.
2. Enter GTM Preview.
3. Perform the interaction.
4. Confirm the trigger.
5. Confirm variable values.
6. Confirm GA4 event payload.
7. Confirm DebugView.
8. Document the result.
9. Publish only after QA passes.

## Publish discipline

Use descriptive GTM version names.

Example:

`v1.0 — GA4 ecommerce foundation`

Maintain the ability to identify and roll back versions.

## Status

**Not yet implemented — this is the hands-on next phase.**
