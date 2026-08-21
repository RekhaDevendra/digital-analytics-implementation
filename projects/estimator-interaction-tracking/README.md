# Interactive Estimator Interaction Tracking

A portfolio case study demonstrating how to design and implement GA4 + GTM tracking for a multi-step product/configuration estimator.

> **Portfolio note:** This project is intentionally anonymized. It contains no production company measurement IDs, domains, customer data, proprietary code, or production configuration exports.

## Business Question

The primary objective was to understand how users interact with guidance content inside a multi-step estimator:

- Do users use Help content?
- Do users use Tutorial / Video Guidance content?
- At which estimator step are these interactions most common?
- Which question was on screen when the interaction occurred?
- Can click behavior be distinguished between text and the clickable guidance control without double-counting?

## Measurement Approach

The implementation uses a small interaction taxonomy rather than separate event logic for every visual variation.

| Interaction | GA4 event | `interaction_type` |
|---|---|---|
| Help | `estimator_help_click` | `help` |
| Tutorial | `estimator_tutorial_click` | `tutorial` |
| Video guidance | `estimator_video_guidance_click` | `video_guidance` |

Common parameters:

- `question_number`
- `question_text`
- `click_text`
- `estimator_type`
- `estimator_choice` (when reliably available)

## GTM Architecture

### Variables

**Built-in GTM variables**

- Click Text
- Click Classes
- Click ID
- Click Element
- Page Path

**Estimator context variables**

- `question_text` — Data Layer Variable when supplied by the application
- `question_number` — Data Layer Variable when supplied by the application
- `estimator_type` — Data Layer / Custom JavaScript depending on implementation
- `estimator_choice` — only populated when a reliable source exists

### Trigger strategy

Use **Click – All Elements** when the guidance control is not a native link/button structure that can be reliably targeted with Link Click.

For a control whose clickable area is represented by a parent element and nested spans, use a CSS selector that covers the intended clickable element and its descendants.

Example pattern:

```text
div.guidance-control,
div.guidance-control *
```

The exact production selector should be replaced with the class/structure of the implementation being measured.

### Important QA principle

Do not create multiple triggers for the same interaction simply because the UI contains both an icon and text. If both are inside one clickable control, target the control and its descendants once. This prevents duplicate events and makes the measurement easier to maintain.

## Example GA4 Event Configuration

```text
Event name: estimator_help_click

Parameters:
  interaction_type = help
  question_number = {{question_number}}
  question_text   = {{question_text}}
  click_text      = {{Click Text}}
  estimator_type  = {{estimator_type}}
  estimator_choice = {{estimator_choice}}
```

The same structure can be reused for tutorial and video guidance by changing the event name and interaction type.

## Data Layer Considerations

A recurring implementation issue is assuming a Data Layer Variable creates data. It does not.

For example:

```javascript
dataLayer.push({
  event: 'estimator_question_view',
  question_number: 8,
  question_text: 'Choose a product',
  estimator_type: 'interactive_estimator'
});
```

GTM can then read those values with Data Layer Variables.

If the application does not push `choice`, `question_number`, or another value, the GTM variable will correctly return `undefined`. In that situation, the solution is to identify another reliable source or request a data-layer enhancement rather than creating additional duplicate variables.

## QA Framework

Each interaction should be tested for:

1. Click on the visible text.
2. Click on the icon.
3. Click elsewhere inside the same control.
4. Confirm exactly one GA4 event fires.
5. Confirm the correct `interaction_type`.
6. Confirm question context is captured when available.
7. Confirm no unrelated estimator click fires the event.
8. Test navigation forward and backward through estimator steps.
9. Test different estimator questions and UI states.
10. Validate the final request in GA4 DebugView / network requests.

## Key Learning

The most important lesson from this implementation is that **the visual appearance of a control is not necessarily the same as its DOM click target**. A user may perceive an entire grey guidance button as clickable while the browser event may originate from a nested `<span>` or `<a>`.

Reliable tracking therefore starts with inspecting the DOM and understanding the actual clickable hierarchy before building GTM triggers.

## Recommended Event Taxonomy

```text
estimator_help_click
estimator_tutorial_click
estimator_video_guidance_click
```

Keep the taxonomy stable and use parameters for context instead of creating a new event for every question, product, or UI variation.

## Skills Demonstrated

- GA4 event architecture
- Google Tag Manager trigger design
- CSS selector targeting
- Data Layer auditing
- DOM inspection with Chrome DevTools
- DebugView validation
- Event parameter design
- QA and troubleshooting
- Measurement strategy
- Stakeholder-focused analytics design

## Privacy / Portfolio Safety

This case study deliberately excludes:

- Production GA4 Measurement IDs
- GTM Container IDs
- Company domains
- Production screenshots containing sensitive configuration
- User/customer data
- Proprietary source code
- Credentials or API keys

All examples are genericized for portfolio and learning purposes.
