# E2E Testing with Playwright

This directory contains end-to-end tests for the CourtSpot application using Playwright.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install Playwright and browsers
npm install
npx playwright install
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests with UI mode (interactive)
npm run test:ui

# Run specific test file
npm test -- tests/register-ui.spec.ts

# Run tests for specific browser
npm test -- --project=chromium
```

## 📁 Directory Structure

```
e2e/
├── tests/                    # Test files
│   ├── basic.spec.ts        # Basic page loading tests
│   ├── register-ui.spec.ts  # Registration UI tests
│   ├── register.spec.ts     # Full registration flow tests
│   └── debug.spec.ts        # Debug utilities
├── support/
│   └── utils.ts             # Test utilities and helpers
├── fixtures/                # Test data and fixtures
├── playwright.config.ts     # Playwright configuration
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🧪 Test Suites

### Basic Tests (`basic.spec.ts`)

- Page loading and navigation
- Modal opening/closing
- Form field presence

### UI Tests (`register-ui.spec.ts`)

- Form interaction
- Input validation
- Button functionality
- Modal state management

### Full Flow Tests (`register.spec.ts`)

- Complete registration process
- Backend integration
- Error handling
- User authentication

## 🛠️ Available Scripts

```bash
# Run tests
npm test                    # Run all tests
npm run test:headed        # Run with visible browser
npm run test:debug         # Run with debug mode
npm run test:ui            # Run with Playwright UI
npm run test:report        # Open test report

# Browser management
npm run test:install       # Install browsers
```

## 🔧 Configuration

### Playwright Config (`playwright.config.ts`)

- **Base URL**: `http://localhost:5173` (Vite dev server)
- **Browsers**: Chromium, Firefox, WebKit
- **Mobile**: Chrome Mobile, Safari Mobile
- **Web Server**: Auto-starts client dev server
- **Screenshots**: On failure
- **Videos**: On failure
- **Traces**: On retry

### Test Environment

- **Frontend**: Vite dev server (port 5173)
- **Backend**: Express server (port 3000) - optional
- **Database**: MySQL - required for full flow tests

## 📝 Writing Tests

### Test Structure

```typescript
import { test, expect } from "@playwright/test";

test.describe("Feature Name", () => {
  test("should do something", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("element")).toBeVisible();
  });
});
```

### Best Practices

1. **Use data-testid attributes** for reliable element selection
2. **Use descriptive test names** that explain the behavior
3. **Group related tests** in describe blocks
4. **Use page object pattern** for complex interactions
5. **Keep tests independent** - each test should be self-contained

### Common Selectors

```typescript
// By test ID (recommended)
await page.getByTestId("register-modal");

// By role and name
await page.getByRole("button", { name: /new account/i });

// By placeholder
await page.getByPlaceholder("Enter your email");

// By type
await page.locator('input[type="password"]');
```

## 🧩 Test Utilities

### Helper Functions (`support/utils.ts`)

```typescript
// Generate test user data
const testUser = generateTestUser();

// Fill registration form
await fillRegistrationForm(page, testUser);

// Wait for modal to close
await waitForModalToClose(page);

// Check if user is logged in
await expectUserToBeLoggedIn(page, username);
```

### Test Data

- **TestUser interface**: Standardized user data structure
- **generateTestUser()**: Creates unique test users
- **Timestamp-based uniqueness**: Prevents conflicts

## 🐛 Debugging Tests

### Debug Mode

```bash
# Run with debug mode
npm run test:debug

# Run specific test in debug mode
npm test -- --debug tests/register-ui.spec.ts
```

### Screenshots and Videos

- **Screenshots**: Automatically saved on test failure
- **Videos**: Recorded for failed tests
- **Location**: `test-results/` directory

### Playwright UI

```bash
# Open interactive UI
npm run test:ui
```

- Step through tests
- Inspect elements
- Record new tests

## 📊 Test Reports

### HTML Report

```bash
# Open test report
npm run test:report
```

- Detailed test results
- Screenshots and videos
- Performance metrics
- Timeline view

### Console Output

```bash
# Verbose output
npm test -- --reporter=list

# JSON output
npm test -- --reporter=json
```

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: cd e2e && npm install
      - run: cd e2e && npx playwright install
      - run: cd e2e && npm test
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: e2e/test-results/
```

## 🚨 Troubleshooting

### Common Issues

**1. Tests timeout**

- Check if dev server is running
- Increase timeout in config
- Check for slow network requests

**2. Element not found**

- Verify data-testid attributes
- Check if element is visible
- Use debug mode to inspect

**3. Modal not opening**

- Check if modal store is working
- Verify button click events
- Check for JavaScript errors

**4. Form not filling**

- Verify input selectors
- Check for dynamic content
- Use waitForSelector if needed

### Debug Commands

```bash
# Run with headed browser
npm run test:headed

# Run with slow motion
npm test -- --headed --slow-mo=1000

# Run with specific browser
npm test -- --project=firefox

# Run with trace
npm test -- --trace=on
```

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Test Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [CI/CD Setup](https://playwright.dev/docs/ci)

## 🤝 Contributing

When adding new tests:

1. Follow the existing naming conventions
2. Add appropriate data-testid attributes
3. Use helper functions from utils.ts
4. Include both positive and negative test cases
5. Update this README if needed
