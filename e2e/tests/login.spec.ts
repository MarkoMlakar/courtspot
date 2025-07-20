import { test, expect } from "@playwright/test";
import {
  generateTestUser,
  openRegisterModal,
  fillRegistrationForm,
  waitForModalToClose,
  expectUserToBeLoggedIn,
  clearAuthState,
  openLoginModal,
  fillLoginForm,
} from "../support/utils";

test.describe("Login Flow", () => {
  test("should open login modal", async ({ page }) => {
    await page.goto("/");

    // Use the utility function to handle mobile/desktop navigation
    await openLoginModal(page);

    // Check if modal opens
    await expect(page.getByTestId("login-modal")).toBeVisible();

    // Check if form fields are present
    await expect(page.getByPlaceholder("example@email.com")).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test("should fill login form", async ({ page }) => {
    const testUser = generateTestUser();

    await page.goto("/");
    await openLoginModal(page);
    await page.waitForSelector('[data-testid="login-modal"]');

    // Fill the form using utility function
    await fillLoginForm(page, testUser.email, testUser.password);

    // Verify form is filled
    await expect(page.getByPlaceholder("example@email.com")).toHaveValue(
      testUser.email
    );
    await expect(page.locator('input[type="password"]')).toHaveValue(
      testUser.password
    );
  });

  test("should close login modal when clicking close button", async ({
    page,
  }) => {
    await page.goto("/");

    // Use the utility function to handle mobile/desktop navigation
    await openLoginModal(page);

    // Wait for login modal to appear
    await page.waitForSelector('[data-testid="login-modal"]');

    // Click the close button
    await page.getByRole("button", { name: /i don't want to login/i }).click();

    // Verify modal is closed
    await expect(page.locator('[data-testid="login-modal"]')).not.toBeVisible();
  });

  test("should login successfully with valid credentials", async ({ page }) => {
    const testUser = generateTestUser();

    // First register a user
    await page.goto("/");
    await openRegisterModal(page);
    await page.waitForSelector('[data-testid="register-modal"]');
    await fillRegistrationForm(page, testUser);
    await page.getByRole("button", { name: /create account/i }).click();
    await waitForModalToClose(page);

    // Clear auth state to simulate fresh login
    await clearAuthState(page);

    // Now login with the same credentials
    await openLoginModal(page);
    await page.waitForSelector('[data-testid="login-modal"]');

    // Fill login form using utility function
    await fillLoginForm(page, testUser.email, testUser.password);

    // Submit the form
    await page.getByRole("button", { name: /login to your account/i }).click();

    // Wait for login to complete and modal to close
    await waitForModalToClose(page);

    // Verify user is logged in
    await expectUserToBeLoggedIn(page, testUser.username);
  });

  test("should show error for invalid credentials", async ({ page }) => {
    await page.goto("/");

    // Use the utility function to handle mobile/desktop navigation
    await openLoginModal(page);
    await page.waitForSelector('[data-testid="login-modal"]');

    // Fill with invalid credentials
    await fillLoginForm(page, "invalid@email.com", "wrongpassword");

    // Submit the form
    await page.getByRole("button", { name: /login to your account/i }).click();

    // Check for error message
    await expect(page.getByText(/invalid email or password/i)).toBeVisible();
  });

  test("should show error for empty form submission", async ({ page }) => {
    await page.goto("/");

    // Use the utility function to handle mobile/desktop navigation
    await openLoginModal(page);
    await page.waitForSelector('[data-testid="login-modal"]');

    // Submit empty form
    await page.getByRole("button", { name: /login to your account/i }).click();

    // Check for error message (this might vary based on your validation)
    // You might need to adjust this based on your actual error handling
    await expect(page.getByText(/login failed/i)).toBeVisible();
  });

  test("should handle mobile navigation for login", async ({ page }) => {
    // This test will run on mobile browsers
    await page.goto("/");

    // Use the utility function to handle mobile/desktop navigation
    await openLoginModal(page);

    // Check if modal opens
    await expect(page.getByTestId("login-modal")).toBeVisible();
  });
});
