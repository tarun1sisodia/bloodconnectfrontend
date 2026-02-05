/**
 * Sanitizes a string to prevent XSS attacks.
 * @param {string} str - The string to sanitize.
 * @returns {string} - The sanitized string.
 */
function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    const div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML;
}
