// Frontend Security Utilities
class FrontendSecurity {
  constructor() {
    this.setupSecurityHeaders();
    this.setupCSRFProtection();
    this.setupXSSProtection();
    this.setupContentSecurityPolicy();
  }

  // Setup security headers
  setupSecurityHeaders() {
    // Add security headers to all requests
    this.addSecurityHeaders = (headers = {}) => {
      return {
        ...headers,
        "X-Requested-With": "XMLHttpRequest",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "X-XSS-Protection": "1; mode=block",
      };
    };
  }

  // CSRF Protection
  setupCSRFProtection() {
    this.csrfToken = this.generateCSRFToken();

    // Add CSRF token to all requests
    this.addCSRFToken = (headers = {}) => {
      return {
        ...headers,
        "X-CSRF-Token": this.csrfToken,
      };
    };
  }

  // Generate CSRF token
  generateCSRFToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
      ""
    );
  }

  // XSS Protection
  setupXSSProtection() {
    this.sanitizeInput = (input) => {
      if (typeof input !== "string") return input;

      return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .replace(/<[^>]*>/g, "")
        .replace(/javascript:/gi, "")
        .replace(/on\w+\s*=/gi, "")
        .trim();
    };

    this.sanitizeHTML = (html) => {
      const div = document.createElement("div");
      div.textContent = html;
      return div.innerHTML;
    };
  }

  // Content Security Policy
  setupContentSecurityPolicy() {
    this.validateCSP = () => {
      const meta = document.querySelector(
        'meta[http-equiv="Content-Security-Policy"]'
      );
      if (!meta) {
        console.warn("Content Security Policy not found");
        return false;
      }
      return true;
    };
  }

  // Secure Storage
  secureStorage = {
    setItem: (key, value) => {
      try {
        const encrypted = this.encryptData(value);
        localStorage.setItem(key, encrypted);
      } catch (error) {
        console.error("Secure storage error:", error);
      }
    },

    getItem: (key) => {
      try {
        const encrypted = localStorage.getItem(key);
        if (!encrypted) return null;
        return this.decryptData(encrypted);
      } catch (error) {
        console.error("Secure storage error:", error);
        return null;
      }
    },

    removeItem: (key) => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error("Secure storage error:", error);
      }
    },
  };

  // Simple encryption for sensitive data
  encryptData(data) {
    try {
      const jsonString = JSON.stringify(data);
      return btoa(jsonString); // Base64 encoding (not secure, just obfuscation)
    } catch (error) {
      console.error("Encryption error:", error);
      return data;
    }
  }

  // Simple decryption for sensitive data
  decryptData(encryptedData) {
    try {
      const jsonString = atob(encryptedData); // Base64 decoding
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Decryption error:", error);
      return null;
    }
  }

  // Input validation
  validateInput = {
    email: (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    phone: (phone) => {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      return phoneRegex.test(phone.replace(/\s/g, ""));
    },

    password: (password) => {
      const minLength = 8;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      return {
        isValid:
          password.length >= minLength &&
          hasUpperCase &&
          hasLowerCase &&
          hasNumbers &&
          hasSpecialChar,
        requirements: {
          minLength: password.length >= minLength,
          hasUpperCase,
          hasLowerCase,
          hasNumbers,
          hasSpecialChar,
        },
      };
    },

    bloodType: (bloodType) => {
      const validTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
      return validTypes.includes(bloodType);
    },

    age: (age) => {
      const numAge = parseInt(age);
      return numAge >= 0 && numAge <= 120;
    },
  };

  // Secure API calls
  secureAPI = {
    get: async (url, options = {}) => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: this.addSecurityHeaders(this.addCSRFToken(options.headers)),
          credentials: "include",
          ...options,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error("Secure API GET error:", error);
        throw error;
      }
    },

    post: async (url, data, options = {}) => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: this.addSecurityHeaders(
            this.addCSRFToken({
              "Content-Type": "application/json",
              ...options.headers,
            })
          ),
          body: JSON.stringify(data),
          credentials: "include",
          ...options,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error("Secure API POST error:", error);
        throw error;
      }
    },

    put: async (url, data, options = {}) => {
      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: this.addSecurityHeaders(
            this.addCSRFToken({
              "Content-Type": "application/json",
              ...options.headers,
            })
          ),
          body: JSON.stringify(data),
          credentials: "include",
          ...options,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error("Secure API PUT error:", error);
        throw error;
      }
    },

    delete: async (url, options = {}) => {
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: this.addSecurityHeaders(this.addCSRFToken(options.headers)),
          credentials: "include",
          ...options,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error("Secure API DELETE error:", error);
        throw error;
      }
    },
  };

  // Session management
  session = {
    start: (userData) => {
      this.secureStorage.setItem("user", userData);
      this.secureStorage.setItem("sessionStart", Date.now());
    },

    end: () => {
      this.secureStorage.removeItem("user");
      this.secureStorage.removeItem("sessionStart");
      this.secureStorage.removeItem("token");
    },

    isValid: () => {
      const sessionStart = this.secureStorage.getItem("sessionStart");
      if (!sessionStart) return false;

      const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
      return Date.now() - sessionStart < sessionDuration;
    },

    getCurrentUser: () => {
      if (!this.session.isValid()) {
        this.session.end();
        return null;
      }
      return this.secureStorage.getItem("user");
    },
  };

  // Rate limiting
  rateLimit = {
    requests: new Map(),

    check: (key, maxRequests = 10, windowMs = 60000) => {
      const now = Date.now();
      const windowStart = now - windowMs;

      if (!this.rateLimit.requests.has(key)) {
        this.rateLimit.requests.set(key, []);
      }

      const requests = this.rateLimit.requests.get(key);

      // Remove old requests
      const validRequests = requests.filter((time) => time > windowStart);
      this.rateLimit.requests.set(key, validRequests);

      if (validRequests.length >= maxRequests) {
        return false;
      }

      validRequests.push(now);
      return true;
    },
  };

  // Security monitoring
  monitor = {
    logSecurityEvent: (event, details = {}) => {
      console.warn(`🔒 Security Event: ${event}`, details);

      // Send to backend for logging
      if (typeof API_URL !== "undefined") {
        fetch(`${API_URL}/api/security/log`, {
          method: "POST",
          headers: this.addSecurityHeaders({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            event,
            details,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
          }),
        }).catch((error) => {
          console.error("Failed to log security event:", error);
        });
      }
    },

    detectSuspiciousActivity: () => {
      // Check for suspicious patterns
      const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /eval\(/i,
        /document\.cookie/i,
      ];

      const inputs = document.querySelectorAll("input, textarea, select");
      inputs.forEach((input) => {
        if (input.value) {
          suspiciousPatterns.forEach((pattern) => {
            if (pattern.test(input.value)) {
              this.monitor.logSecurityEvent("SUSPICIOUS_INPUT", {
                input: input.name || input.id,
                value: input.value.substring(0, 100),
              });
            }
          });
        }
      });
    },
  };

  // Initialize security
  init() {
    // Validate CSP
    this.validateCSP();

    // Setup monitoring
    setInterval(() => {
      this.monitor.detectSuspiciousActivity();
    }, 30000); // Check every 30 seconds

    // Clear sensitive data on page unload
    window.addEventListener("beforeunload", () => {
      // Don't clear everything, just sensitive data
      this.secureStorage.removeItem("token");
    });

    // Monitor for XSS attempts
    document.addEventListener("DOMContentLoaded", () => {
      this.monitor.detectSuspiciousActivity();
    });
  }
}

// Create global instance
const frontendSecurity = new FrontendSecurity();

// Initialize security
frontendSecurity.init();

// Export for use in other modules
window.FrontendSecurity = frontendSecurity;
