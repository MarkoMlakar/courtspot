import { test, expect } from "@playwright/test";
import { openRegisterModal } from "../support/utils";

test.describe("Basic Application Tests", () => {
  test("should load the home page", async ({ page }) => {
    await page.goto("/");

    // Check if the page loads
    await expect(page).toHaveTitle(/CourtSpot/i);

    // Check if navigation is visible
    await expect(page.getByRole("navigation")).toBeVisible();
  });

  test("should open register modal", async ({ page }) => {
    await page.goto("/");

    // Use the utility function to handle mobile/desktop navigation
    await openRegisterModal(page);

    // Check if modal opens
    await expect(page.getByTestId("register-modal")).toBeVisible();

    // Check if form fields are present using placeholders
    await expect(page.getByPlaceholder("Enter your first name")).toBeVisible();
    await expect(page.getByPlaceholder("Enter your last name")).toBeVisible();
    await expect(page.getByPlaceholder("example@email.com")).toBeVisible();
    await expect(page.getByPlaceholder("Enter your username")).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });
});
