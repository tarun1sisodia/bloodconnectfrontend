## 2025-05-22 - [Complex CSP for Static Site with Inline Scripts and Multiple CDNs]
**Vulnerability:** XSS risk due to extensive use of `innerHTML` with unsanitized data across multiple HTML files.
**Learning:** In a static site with many inline scripts and multiple external dependencies (CDNs), a Content Security Policy must be carefully tuned to allow `'unsafe-inline'` and specific trusted domains to avoid breaking functionality while still providing a layer of defense.
**Prevention:** Future development should aim to refactor inline scripts into external files and use `textContent` or DOM manipulation instead of `innerHTML` to allow for a stricter CSP (without `'unsafe-inline'`).
