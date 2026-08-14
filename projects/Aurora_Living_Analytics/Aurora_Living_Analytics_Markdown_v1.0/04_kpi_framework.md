# 04 — KPI Framework

## KPI design principle

A KPI should answer a business question and support a decision. We should avoid creating metrics simply because GA4 can collect them.

## KPI hierarchy

| Business goal | Website goal | Primary KPI | Supporting KPIs |
|---|---|---|---|
| Increase online revenue | Complete purchases | Ecommerce revenue | Purchases, AOV, key-event rate |
| Sell more products | Product discovery & purchase intent | Purchases | Product views, add-to-cart rate, checkout rate |
| Increase repeat customers | Build relationships | Repeat-purchase rate | Returning customers, repeat revenue |
| Increase brand visibility | Improve discovery | Qualified traffic / engagement | Engaged sessions, product discovery |
| Grow newsletter | Build owned audience | Newsletter subscriptions | Subscription rate, source/landing page |
| Increase email/upsell sales | Drive repeat/upsell behavior | Email-attributed revenue | Upsell revenue, upsell conversion |

## Leading KPIs

These indicate movement toward the outcome:

- Product views
- Product selections
- Add to cart
- Begin checkout
- Newsletter subscription
- Returning behavior

## Lagging KPIs

These represent the business outcome:

- Revenue
- Purchases
- Repeat revenue
- Email-attributed revenue

## KPI rules

1. Define the KPI before defining the event.
2. Define how it will be calculated.
3. Define the reporting timeframe.
4. Establish a baseline before setting aggressive targets.
5. Document the business decision the KPI supports.

## Example

**Question:** Are visitors progressing toward purchase?

**KPI:** Add-to-cart rate.

**Supporting events:** `view_item`, `add_to_cart`.

**Decision:** If product views are healthy but add-to-cart rate is weak, investigate product-page content, pricing, UX or merchandising.

## Status

**Complete — KPI framework.**
