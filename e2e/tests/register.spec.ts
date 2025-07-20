import { test, expect } from "@playwright/test";
import {
  generateTestUser,
  fillRegistrationForm,
  waitForModalToClose,
  expectUserToBeLoggedIn,
  clearAuthState,
  openRegisterModal,
} from "../support/utils";

test.describe("Registration Flow", () => {
  test("should register a new user successfully", async ({ page }) => {
    const testUser = generateTestUser();

    // Navigate to the home page
    await page.goto("/");

    // Use the utility function to handle mobile/desktop navigation
    await openRegisterModal(page);

    // Wait for register modal to appear
    await page.waitForSelector('[data-testid="register-modal"]');

    // Fill the registration form
    await fillRegistrationForm(page, testUser);

    // Submit the form
    await page.getByRole("button", { name: /create account/i }).click();

    // Wait for registration to complete and modal to close
    await waitForModalToClose(page);

    // Verify user is logged in
    await expectUserToBeLoggedIn(page, testUser.username);
  });

  test("should show error for existing email", async ({ page }) => {
    const testUser = generateTestUser();

    // First registration
    await page.goto("/");
    await openRegisterModal(page);
    await page.waitForSelector('[data-testid="register-modal"]');
    await fillRegistrationForm(page, testUser);
    await page.getByRole("button", { name: /create account/i }).click();
    await waitForModalToClose(page);

    // Clear authentication state to reset UI
    await clearAuthState(page);

    // Try to register with same email again
    await openRegisterModal(page);
    await page.waitForSelector('[data-testid="register-modal"]');

    // Use same email but different username
    const duplicateUser = { ...testUser, username: `duplicate${Date.now()}` };
    await fillRegistrationForm(page, duplicateUser);
    await page.getByRole("button", { name: /create account/i }).click();

    // Check for error message
    await expect(page.getByText(/user.*already exists/i)).toBeVisible();
  });

  test("should close modal when clicking close button", async ({ page }) => {
    // Navigate to the home page
    await page.goto("/");

    // Use the utility function to handle mobile/desktop navigation
    await openRegisterModal(page);

    // Wait for register modal to appear
    await page.waitForSelector('[data-testid="register-modal"]');

    // Click the close button (it says "I don't want to register")
    await page
      .getByRole("button", { name: /i don't want to register/i })
      .click();

    // Verify modal is closed
    await expect(
      page.locator('[data-testid="register-modal"]')
    ).not.toBeVisible();
  });
});
