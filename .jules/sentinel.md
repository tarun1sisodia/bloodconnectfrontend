## 2024-05-20 - Subresource Integrity (SRI) for External Assets

**Vulnerability:** The application loaded external CSS and JavaScript resources from CDNs (jsdelivr.net, unpkg.com) without using Subresource Integrity (SRI) checks.

**Learning:** This exposed the application to a risk where a compromise of the third-party CDN could lead to arbitrary code execution within our application. An attacker could have replaced the legitimate Tailwind CSS or Lucide icons libraries with malicious code. Because the repository only contains the frontend, its security is heavily dependent on the integrity of these external resources.

**Prevention:** All externally loaded, third-party resources that support it MUST have the `integrity` and `crossorigin` attributes. Any new external resource added to this project should be checked for SRI compatibility and implemented with it. We should generate the hash for the exact version of the library we intend to use.