## 2025-02-02 - [XSS Pattern in Template Literals]
**Vulnerability:** Widespread use of `innerHTML` with unsanitized data from API responses.
**Learning:** The application consistently uses template literals to build HTML strings from API data (e.g., in `index.html`, `donors.html`, `profile.html`) and injects them into the DOM using `innerHTML`. This pattern exists in both page-specific scripts and utility functions like `Toast`.
**Prevention:** Use `textContent` or `innerText` for simple text data. For complex HTML structures, create elements programmatically using `document.createElement()` and set their attributes and text content individually, or use a trusted sanitization library before using `innerHTML`.
