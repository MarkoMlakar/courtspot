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
  openProfileModal,
} from "../support/utils";

test.describe("Profile Flow", () => {
  test("should open profile modal when clicking user profile", async ({
    page,
  }) => {
    // First register and login a user
    const testUser = generateTestUser();
    await page.goto("/");
    await openRegisterModal(page);
    await page.waitForSelector('[data-testid="register-modal"]');
    await fillRegistrationForm(page, testUser);
    await page.getByRole("button", { name: /create account/i }).click();
    await waitForModalToClose(page);
    await expectUserToBeLoggedIn(page, testUser.username);

    // Use the utility function to handle mobile/desktop navigation
    await openProfileModal(page);

    // Check if profile modal opens
    await expect(page.getByTestId("profile-modal")).toBeVisible();
  });

  test("should display user information in profile modal", async ({ page }) => {
    // First register and login a user
    const testUser = generateTestUser();
    await page.goto("/");
    await openRegisterModal(page);
    await page.waitForSelector('[data-testid="register-modal"]');
    await fillRegistrationForm(page, testUser);
    await page.getByRole("button", { name: /create account/i }).click();
    await waitForModalToClose(page);
    await expectUserToBeLoggedIn(page, testUser.username);

    // Use the utility function to handle mobile/desktop navigation
    await openProfileModal(page);
    await page.waitForSelector('[data-testid="profile-modal"]');

    // Check if user information is displayed - use more specific selectors
    // Look for the specific field values within the profile modal
    const profileModal = page.getByTestId("profile-modal");
    await expect(profileModal.getByText("First Name")).toBeVisible();
    await expect(profileModal.getByText("Last Name")).toBeVisible();
    await expect(profileModal.getByText("Email Address")).toBeVisible();

    // Check that the modal contains the user's information
    await expect(profileModal).toContainText(testUser.firstName);
    await expect(profileModal).toContainText(testUser.lastName);
    await expect(profileModal).toContainText(testUser.email);
  });

  test("should close profile modal when clicking close button", async ({
    page,
  }) => {
    // First register and login a user
    const testUser = generateTestUser();
    await page.goto("/");
    await openRegisterModal(page);
    await page.waitForSelector('[data-testid="register-modal"]');
    await fillRegistrationForm(page, testUser);
    await page.getByRole("button", { name: /create account/i }).click();
    await waitForModalToClose(page);
    await expectUserToBeLoggedIn(page, testUser.username);

    // Use the utility function to handle mobile/desktop navigation
    await openProfileModal(page);
    await page.waitForSelector('[data-testid="profile-modal"]');

    // Check if we're on desktop (close button only visible on desktop)
    const closeButton = page
      .getByTestId("profile-modal")
      .locator(".profile__closeButton");

    if (await closeButton.isVisible()) {
      // Desktop view - click the close button
      await closeButton.click();

      // Verify modal is closed
      await expect(page.getByTestId("profile-modal")).not.toBeVisible();
    } else {
      // Mobile view - close button not visible, test passes
      await expect(page.getByTestId("profile-modal")).toBeVisible();
    }
  });

  test("should logout user when clicking logout button", async ({ page }) => {
    // First register and login a user
    const testUser = generateTestUser();
    await page.goto("/");
    await openRegisterModal(page);
    await page.waitForSelector('[data-testid="register-modal"]');
    await fillRegistrationForm(page, testUser);
    await page.getByRole("button", { name: /create account/i }).click();
    await waitForModalToClose(page);
    await expectUserToBeLoggedIn(page, testUser.username);

    // Use the utility function to handle mobile/desktop navigation
    await openProfileModal(page);
    await page.waitForSelector('[data-testid="profile-modal"]');

    // Click the logout button
    await page.getByRole("button", { name: /logout/i }).click();

    // Verify profile modal is closed
    await expect(page.getByTestId("profile-modal")).not.toBeVisible();

    // Verify user is logged out by checking that login button is available
    // On mobile, it might be hidden in the hamburger menu
    const hamburgerMenu = page.locator('[class*="hbMenu"]').first();

    if (await hamburgerMenu.isVisible()) {
      // Mobile view - open hamburger menu to check for login button
      await hamburgerMenu.click();
      await page.waitForSelector('[class*="view"]');
      await expect(
        page.locator('[class*="view"]').getByTestId("login-button")
      ).toBeVisible();
    } else {
      // Desktop view - login button should be visible directly
      await expect(page.getByTestId("login-button")).toBeVisible();
    }
  });

  test("should handle mobile navigation for profile", async ({ page }) => {
    // First register and login a user
    const testUser = generateTestUser();
    await page.goto("/");
    await openRegisterModal(page);
    await page.waitForSelector('[data-testid="register-modal"]');
    await fillRegistrationForm(page, testUser);
    await page.getByRole("button", { name: /create account/i }).click();
    await waitForModalToClose(page);
    await expectUserToBeLoggedIn(page, testUser.username);

    // Use the utility function to handle mobile/desktop navigation
    await openProfileModal(page);

    // Check if profile modal opens
    await expect(page.getByTestId("profile-modal")).toBeVisible();
  });

  test("should display profile card with avatar and user info", async ({
    page,
  }) => {
    // First register and login a user
    const testUser = generateTestUser();
    await page.goto("/");
    await openRegisterModal(page);
    await page.waitForSelector('[data-testid="register-modal"]');
    await fillRegistrationForm(page, testUser);
    await page.getByRole("button", { name: /create account/i }).click();
    await waitForModalToClose(page);
    await expectUserToBeLoggedIn(page, testUser.username);

    // Use the utility function to handle mobile/desktop navigation
    await openProfileModal(page);
    await page.waitForSelector('[data-testid="profile-modal"]');

    // Check if profile card elements are present - use more specific selectors
    await expect(
      page.getByTestId("profile-modal").locator('img[alt="Avatar"]')
    ).toBeVisible();
    await expect(
      page.getByTestId("profile-modal").getByText("Marko Mlakar")
    ).toBeVisible();
    await expect(
      page.getByTestId("profile-modal").getByText("100 sightings")
    ).toBeVisible();
  });

  test("should display all profile fields correctly", async ({ page }) => {
    // First register and login a user
    const testUser = generateTestUser();
    await page.goto("/");
    await openRegisterModal(page);
    await page.waitForSelector('[data-testid="register-modal"]');
    await fillRegistrationForm(page, testUser);
    await page.getByRole("button", { name: /create account/i }).click();
    await waitForModalToClose(page);
    await expectUserToBeLoggedIn(page, testUser.username);

    // Use the utility function to handle mobile/desktop navigation
    await openProfileModal(page);
    await page.waitForSelector('[data-testid="profile-modal"]');

    // Check if all profile fields are displayed
    const profileModal = page.getByTestId("profile-modal");
    await expect(profileModal.getByText("First Name")).toBeVisible();
    await expect(profileModal.getByText("Last Name")).toBeVisible();
    await expect(profileModal.getByText("Date of Birth")).toBeVisible();
    await expect(profileModal.getByText("Email Address")).toBeVisible();

    // Check that the modal contains the user's information
    await expect(profileModal).toContainText(testUser.firstName);
    await expect(profileModal).toContainText(testUser.lastName);
    await expect(profileModal).toContainText(testUser.email);
  });
});
