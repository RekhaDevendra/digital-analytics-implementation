# GTM Implementation Blueprint

This blueprint documents a reusable implementation pattern without exposing any production container configuration.

## 1. Enable Built-in Click Variables

Enable:

- Click Element
- Click Classes
- Click ID
- Click Text
- Page Path

## 2. Create Estimator Context Variables

Create Data Layer Variables only for values that the application actually provides.

```text
question_number
question_text
estimator_type
estimator_choice
```

If a variable returns `undefined` in Preview, inspect the Data Layer before changing the variable configuration.

## 3. Create Interaction Triggers

Use one trigger per interaction type.

### Help

```text
Event: gtm.click
Click Element matches CSS selector for the Help control and descendants
```

### Tutorial

```text
Event: gtm.click
Click Element matches CSS selector for the Tutorial control and descendants
```

### Video Guidance

```text
Event: gtm.click
Click Element matches CSS selector for the Video Guidance control and descendants
```

The selector should be based on the actual DOM structure, not only the visible label.

## 4. Create GA4 Event Tags

Each tag should have a distinct event name but a consistent parameter structure.

```text
estimator_help_click
estimator_tutorial_click
estimator_video_guidance_click
```

## 5. Avoid Duplicate Firing

If a user clicks a nested span inside a link/button, the browser may report the span as the Click Element. A selector that includes the parent and descendants allows the same interaction to be captured regardless of which nested element receives the click.

However, do not combine multiple overlapping triggers for the same interaction unless there is a clear blocking/exclusion strategy. Otherwise a single click can generate multiple GA4 events.

## 6. Debugging Checklist

In GTM Preview:

- Select the click event.
- Inspect Click Element.
- Inspect Click Text.
- Inspect Click Classes.
- Check which trigger fired.
- Check whether another interaction trigger also fired.
- Inspect Data Layer values.
- Confirm GA4 tag parameters before publishing.

## 7. Production Safety

Before publishing:

- Remove test Measurement IDs.
- Confirm the destination GA4 property.
- Confirm no personal test data is being intentionally sent.
- Validate consent behavior.
- Test in Preview.
- Publish with a clear version description.
