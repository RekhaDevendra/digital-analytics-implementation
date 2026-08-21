# Measurement Plan — Interactive Estimator

## Objective

Measure user engagement with guidance features within a multi-step estimator and identify where users seek additional information.

## Measurement Matrix

| Business question | Event | Key parameters |
|---|---|---|
| Do users use Help? | `estimator_help_click` | `question_number`, `question_text`, `click_text`, `estimator_type` |
| Do users use Tutorials? | `estimator_tutorial_click` | `question_number`, `question_text`, `click_text`, `estimator_type` |
| Do users use Video Guidance? | `estimator_video_guidance_click` | `question_number`, `question_text`, `click_text`, `estimator_type` |

## Recommended Reporting Dimensions

- Event name
- Interaction type
- Question number
- Question text
- Estimator type
- Estimator choice, where available

## Example Analysis

A GA4 Exploration can answer:

- Total guidance interactions
- Help vs tutorial vs video guidance usage
- Guidance interactions by estimator step
- Most frequently supported questions
- Interaction rate by estimator step

## Data Quality Rules

- One user action should produce one interaction event.
- Do not send separate events for the icon and text when they are one control.
- Avoid relying on fragile DOM text when a stable application/data-layer value exists.
- Validate values in GTM Preview before publishing.
- Validate the final GA4 request after publishing.
- Do not use production IDs or real user data in portfolio examples.
