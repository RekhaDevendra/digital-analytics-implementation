# 10. Cookie Consent & Privacy Implementation

## Aurora Living — Digital Analytics Lab

**Project:** Aurora Living Analytics Lab  
**Document:** Cookie Consent & Privacy Implementation  
**Status:** Completed  
**Date:** August 15, 2026  
**Implementation stage:** Pre-GTM / Privacy foundation  
**Consent platform:** CookieYes  
**Analytics collection:** Not enabled for general website visitors

---

## 1. Purpose

Before implementing Google Tag Manager, GA4, or other analytics technologies, a privacy and consent foundation was established for the Aurora Living Analytics Lab.

The objective was not to introduce unnecessary tracking. Instead, the goal was to create a privacy-respecting analytics architecture that allows analytics concepts to be learned and tested without turning the portfolio website into a production tracking system for ordinary visitors.

The implementation separates the public-facing portfolio experience, privacy and consent management, future analytics implementation, and controlled analytics testing.

---

## 2. Privacy Design Principles

### Minimal data collection
The website follows a minimal-data approach. Normal visitors are not intended to have their behavior collected for analytics purposes.

### No advertising or remarketing
The website does not use cookies for advertising, remarketing, personalized advertising, advertising profiles, or marketing profiling.

### Consent before optional analytics
If optional analytics functionality is introduced in the future, it must respect the applicable consent state rather than firing unconditionally.

### Learning without unnecessary visitor tracking
The website is an education and portfolio environment. Analytics implementation can therefore be tested deliberately without treating every portfolio visitor as an analytics subject.

> **The website demonstrates analytics engineering without requiring the website to collect analytics data from ordinary visitors.**

---

## 3. Consent Management Platform

CookieYes was implemented as the website's consent-management mechanism.

Its role is to provide visitors with a visible consent notice, consent choices, a preference center, access to cookie information, and the ability to revisit their preferences.

CookieYes is being used for consent management, not as an indication that the website is running advertising or analytics tracking.

---

## 4. Initial Cookie Audit

A CookieYes scan was performed against the deployed website.

| Metric | Result |
|---|---:|
| Pages scanned | 38 |
| Cookies detected | 0 |
| Categories containing detected cookies | 0 |

The scan covered major website areas including Home, Shop, Cart, Wishlist, Contact, Resources, About, Analytics Lab, product pages, category pages, and case studies.

> **At the time of the audit, CookieYes detected no cookies across the scanned website pages.**

This supported the decision not to manually invent or add cookie records simply to populate the cookie inventory.

---

## 5. Consent Categories

CookieYes provides the following consent categories:

- Necessary
- Functional
- Analytics
- Performance
- Advertisement

The categories were reviewed against the actual purpose of the project.

**Necessary:** Retained because consent-management and essential website functionality may require it.

**Functional:** No functional third-party cookies were intentionally introduced.

**Analytics:** Analytics functionality is not configured to collect analytics information from general website visitors. The category remains available for future controlled learning and testing.

**Performance:** No performance-tracking cookies were intentionally introduced.

**Advertisement:** Advertisement tracking is outside the scope of the project. The website does not use advertising or remarketing.

---

## 6. Consent Banner

The default CookieYes wording was reviewed because it contained generic language referring to personalized advertising and analytics. That language did not accurately represent the Aurora Living project.

### Final banner message

> **We use necessary cookies to operate this website. If optional analytics cookies are enabled in the future, they will only be used with your consent to understand aggregate website usage. This website does not use cookies for advertising, remarketing, or building marketing profiles.**

The wording communicates why necessary cookies may exist, that optional analytics are not currently used for ordinary visitors, that future optional analytics would require consent, and that advertising/remarketing is not part of the implementation.

---

## 7. Preference Center

The CookieYes preference center was reviewed and customized because its generic language referenced third-party analytics, personalized content, and advertisements.

### Final preference-center description

> **We use necessary cookies to operate this website and manage your consent preferences. Optional cookies are not used to collect analytics information from general website visitors. This website does not use cookies for advertising, remarketing, or building marketing profiles. You can choose whether to allow optional cookies and you can change your preferences at any time.**

This prevents the consent interface from making claims inconsistent with the site's actual implementation.

---

## 8. Privacy Policy

A dedicated Privacy Policy page was created at `/privacy-policy`.

The policy documents the website purpose, minimal-data approach, technical information that may be processed for operation and security, voluntarily submitted contact information, consent management, absence of advertising and remarketing, current analytics limitations, information sharing with essential service providers where applicable, visitor choices, and policy updates.

A key implementation statement is:

> **Analytics tags are not configured to collect analytics information from general website visitors.**

The policy describes the actual implementation rather than a generic future analytics architecture.

---

## 9. Cookie Policy

A dedicated Cookie Policy page was created at `/cookie-policy`.

The policy explains what cookies are, how cookies may be used, necessary and consent-management functionality, absence of advertising and remarketing, current absence of analytics collection from general visitors, cookie preference management, browser-level controls, and how the policy will be updated if practices change.

The CookieYes cookie-audit element was retained so the cookie inventory can reflect actual cookies detected by the platform.

---

## 10. Consent Preference Access

A consent system should not depend exclusively on the initial popup.

The implementation includes:

- CookieYes consent banner
- CookieYes preference center
- Cookie Policy
- Privacy Policy
- Footer access to privacy information
- Manage Cookie Preferences footer control

The CookieYes `cky-banner-element` mechanism is used to reopen the consent interface rather than redirecting visitors to another page.

**Consent lifecycle:**

**Initial visit → Consent choice → Preference management → Revisit/change preference**

---

## 11. Footer Privacy Navigation

Privacy resources were integrated into the existing website footer without creating a large additional navigation column.

The footer provides:

**Privacy Policy · Cookie Policy · Manage Cookie Preferences**

The links are intentionally subtle and consistent with the site's editorial design.

---

## 12. Why Analytics Is Not Currently Enabled for General Visitors

The purpose of Aurora Living is to learn and demonstrate analytics implementation, not to maximize visitor data collection.

Therefore:

> **Normal website interactions should not automatically become analytics events simply because someone visits the portfolio.**

The intended model is:

**Public visitor → website interaction → no analytics collection**

while:

**Controlled testing session → deliberate test conditions → GTM debugging/testing → analytics implementation validation**

This allows the project to demonstrate technical analytics skills without making ordinary visitors part of the measurement dataset.

---

## 13. GTM Implementation Constraint

When GTM is introduced, it must not automatically turn every visitor interaction into analytics data.

Future tags will therefore be designed and tested with explicit conditions.

The implementation must ensure that:

- analytics tags do not fire for ordinary visitors,
- consent state is respected,
- analytics testing can be performed deliberately,
- and no advertising or remarketing tags are introduced.

This becomes a technical requirement for the upcoming GTM architecture.

---

## 14. Validation Performed

### Website validation

- Privacy Policy route tested.
- Cookie Policy route tested.
- Footer links tested.
- Cookie Policy link from the consent interface tested.
- Consent preference interface opened successfully.
- CookieYes preference center reviewed.

### Cookie audit validation

CookieYes scanned **38 pages**.

**Result: 0 cookies detected.**

### Consent interface validation

Reviewed:

- Initial consent banner
- Accept All
- Reject/optional consent behavior
- Customize/Preference Center
- Necessary category
- Analytics category
- Performance category
- Advertisement category
- Consent preference controls

---

## 15. Key Technical Decisions

### Decision 1 — Use CookieYes for consent management
**Reason:** Provides a dedicated consent-management layer without requiring a custom consent implementation.

### Decision 2 — Do not manually populate cookie records
**Reason:** The CookieYes scan detected zero cookies. Adding fictional cookie records would reduce implementation accuracy.

### Decision 3 — Remove advertising language
**Reason:** The project does not use advertising, remarketing, or marketing profiling.

### Decision 4 — Keep analytics collection disabled for ordinary visitors
**Reason:** The website is a learning and portfolio environment rather than a production analytics property.

### Decision 5 — Keep privacy pages accessible
**Reason:** Visitors should be able to understand the privacy approach and manage preferences without depending solely on the initial consent popup.

### Decision 6 — Separate consent management from analytics implementation
**Reason:** Consent management establishes the privacy boundary. GTM/GA4 implementation will be designed within that boundary later.

---

## 16. What Was Learned

### Consent is not the same thing as analytics
A website can have a consent-management system without actively collecting analytics data.

### A cookie banner should describe reality
Generic vendor language may mention advertising or analytics capabilities that the actual website does not use. The banner therefore needs to be reviewed rather than accepted unchanged.

### Cookie scanning is a useful validation technique
The CookieYes scan provided evidence that the current implementation was not producing detectable cookies across the scanned pages.

### Policies should follow implementation
The Privacy Policy and Cookie Policy were written around the actual architecture rather than copied from a generic ecommerce template.

### Privacy is part of analytics architecture
Consent decisions affect how GTM, GA4, events, triggers, and future measurement architecture should be designed.

---

## 17. Current State

### Completed

- [x] CookieYes installed/configured
- [x] Consent banner customized
- [x] Preference center reviewed/customized
- [x] Privacy Policy created
- [x] Cookie Policy created
- [x] Footer privacy navigation added
- [x] Cookie Policy route validated
- [x] Privacy Policy route validated
- [x] CookieYes cookie audit performed
- [x] 38 website pages scanned
- [x] 0 cookies detected during audit
- [x] Advertising/remarketing excluded from scope
- [x] General visitor analytics collection excluded from current implementation

### Next

- [ ] GTM container implementation
- [ ] Consent-aware GTM architecture
- [ ] Data Layer implementation
- [ ] Event implementation
- [ ] GA4 configuration for controlled testing
- [ ] GTM Preview/Debug validation
- [ ] QA evidence
- [ ] Reporting implementation

---

## 18. Final Architecture Decision

The privacy foundation establishes the following principle for the remainder of the Aurora Living project:

> **Privacy first. Measurement second. Implementation third.**

The project will not begin with tags and work backward.

Instead:

**Business objectives → Measurement strategy → Privacy & consent requirements → Data Layer → GTM architecture → Controlled analytics implementation → QA & validation → Reporting**

This keeps the project aligned with the broader goal of demonstrating end-to-end digital analytics engineering, rather than simply installing tracking code.

---

## Portfolio Takeaway

This implementation demonstrates more than installing a cookie banner.

It demonstrates the ability to evaluate vendor defaults, identify mismatches between platform language and actual business practices, define a privacy boundary, implement consent management, validate the deployed environment, document technical decisions, and carry privacy requirements forward into the analytics architecture.

The result is a privacy-aware foundation for the next phase of the Aurora Living analytics implementation.
