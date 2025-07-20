import { test, expect } from "@playwright/test";
import {
  generateTestUser,
  fillRegistrationForm,
  openRegisterModal,
} from "../support/utils";

test.describe("Registration UI Flow", () => {
  test("should open and close register modal", async ({ page }) => {
    await page.goto("/");

    // Use the utility function to handle mobile/desktop navigation
    await openRegisterModal(page);

    // Check if modal opens
    await expect(page.getByTestId("register-modal")).toBeVisible();

    // Check if form fields are present
    await expect(page.getByPlaceholder("Enter your first name")).toBeVisible();
    await expect(page.getByPlaceholder("Enter your last name")).toBeVisible();
    await expect(page.getByPlaceholder("example@email.com")).toBeVisible();
    await expect(page.getByPlaceholder("Enter your username")).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();

    // Close modal
    await page
      .getByRole("button", { name: /i don't want to register/i })
      .click();

    // Check if modal closes
    await expect(
      page.locator('[data-testid="register-modal"]')
    ).not.toBeVisible();
  });

  test("should fill registration form", async ({ page }) => {
    const testUser = generateTestUser();

    await page.goto("/");
    await openRegisterModal(page);
    await page.waitForSelector('[data-testid="register-modal"]');

    // Fill the form
    await fillRegistrationForm(page, testUser);

    // Verify form is filled
    await expect(page.getByPlaceholder("Enter your first name")).toHaveValue(
      testUser.firstName
    );
    await expect(page.getByPlaceholder("Enter your last name")).toHaveValue(
      testUser.lastName
    );
    await expect(page.getByPlaceholder("example@email.com")).toHaveValue(
      testUser.email
    );
    await expect(page.getByPlaceholder("Enter your username")).toHaveValue(
      testUser.username
    );
    await expect(page.locator('input[type="password"]')).toHaveValue(
      testUser.password
    );
  });

  test("should show create account button", async ({ page }) => {
    await page.goto("/");
    await openRegisterModal(page);
    await page.waitForSelector('[data-testid="register-modal"]');

    // Check if create account button is present
    await expect(page.getByTestId("create-account-button")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /create account/i })
    ).toBeVisible();
  });
});
