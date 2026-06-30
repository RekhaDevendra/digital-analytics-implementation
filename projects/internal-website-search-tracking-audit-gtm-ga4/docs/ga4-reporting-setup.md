# GA4 Reporting Setup

## Internal Traffic Filtering

QA/testing traffic from this project's own debugging was found polluting standard GA4 reports (test search terms like "ditra", "ff", "schene" appearing in real reports). This is expected — GTM Preview mode does not prevent tags from sending real hits to GA4, it only allows visibility into what's firing.

### Setup (repeated per GA4 property — `.com` and `.ca` are separate properties)

1. **Admin → Data Streams → [stream] → Configure Tag Settings → Show all → Define Internal Traffic**
2. Add a rule (or new rule, if an existing one has no room to add IPs) with:
   - Match type: `IP address equals`
   - Value: your testing IP(s) — recommended to add **both home and office** IPs, since testing location varies
3. **Admin → Data Settings → Data Filters → Create Filter**
   - Filter type: `Internal Traffic`
   - Filter operation: `Exclude`
   - Filter state: **Testing** first (not Active) — Google's recommended workflow is to verify the filter is correctly catching internal traffic before activating it, to avoid silently excluding real user data due to misconfiguration
4. Verify in **Reports → Realtime** that your own traffic is correctly tagged `traffic_type: internal`
5. Once confirmed, switch the filter from **Testing** to **Active**

### Notes
- This must be configured separately for each GA4 property (`.com` and `.ca` are separate properties with separate Measurement IDs — `G-8Q9PT3VNTH` and `G-5GDMD8HLKP` respectively)
- Already-collected test data prior to activation is not retroactively removed from reports — this only affects new incoming data going forward
- If testing from additional locations later (e.g. new office, VPN), add the new IP under the same internal traffic definition rather than creating a new filter

---

## Querying Zero-Results Searches

Since zero-results detection lives within the main search event (`search_has_results` parameter) rather than a separate event name (see `bug-log.md` #2), use GA4 Explore rather than standard Reports.

### Basic Zero-Results Rate

**GA4 → Explore → Free Form**

- Rows: `search_has_results`
- Values: Event count, Total users
- Filter: Event name = `view_search_results`, `search_context` = `faq` (or `main` once the dev ticket is implemented)

```
search_has_results | Event count
false               | X
true                | Y

Zero-results rate = X / (X + Y) × 100
```

### Which Terms Are Failing

Add `search_term` as a second row dimension, filter the table to `search_has_results = false`, sort by event count descending. This produces a ranked list of failing search terms — the actionable list for content/search improvements and for the Intentive workshop.

### Once Main Search Is Live

The same report structure works for main search once the dev ticket (`jira-ticket.md`) is implemented — just change the `search_context` filter to `main`, or remove the filter entirely to see all surfaces combined, broken out by `search_context` as an additional dimension.
