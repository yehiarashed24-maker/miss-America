/**
 * ============================================================================
 * Egypt-American Machinery Global - Easy Configuration & API Keys
 * ============================================================================
 * 
 * 1. OpenRouter API Key (For Floating AI Assistant)
 *    Get your key from: https://openrouter.ai/keys
 *    Note: If left empty, the site automatically uses the built-in smart local
 *    industrial AI knowledge base!
 * 
 * 2. Web3Forms Direct Email Integration (Sends form inquiries to your inbox!)
 *    Get your free Access Key from: https://web3forms.com
 *    Example: "a1b2c3d4-e5f6-7890-abcd-1234567890ab"
 *    Note: If left empty, submissions are saved locally in localStorage (#admin)
 *    with instant success confirmation!
 * ============================================================================
 */

window.EGYPT_AMERICAN_CONFIG = Object.freeze({
  // OpenRouter API Configuration
  OPENROUTER_API_KEY: "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", // "
  OPENROUTER_MODEL: "openai/gpt-oss-20b:free",

  // Web3Forms Integration
  WEB3FORMS_ACCESS_KEY: "2c270465-085e-4249-8420-8b1dd5f11626", // "

  // Cryptographically Secured SHA-256 Credential Hashes (Zero Plaintext in JS/Inspect/Burp)
  ADMIN_PASS_HASH: "e9aa5a0818a22aaa53095e60150c6518fd735137826fe009cee32b6ee10a4e2d",
  ADMIN_PHONE_HASH: "8726ab7e2a44594ad132a98ab44606773cdf80d2744d7c76b996fef46c50f394"
});
