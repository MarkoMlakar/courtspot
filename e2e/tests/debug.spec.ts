import { test, expect } from "@playwright/test";
import { openRegisterModal } from "../support/utils";

test.describe("Debug Tests", () => {
  test("should debug the page structure", async ({ page }) => {
    await page.goto("/");

    // Wait a bit for the page to load
    await page.waitForTimeout(2000);

    // Take a screenshot to see what's on the page
    await page.screenshot({ path: "debug-homepage.png" });

    // Log all buttons on the page
    const buttons = await page.locator("button").all();
    console.log("Found buttons:", buttons.length);

    for (let i = 0; i < buttons.length; i++) {
      const text = await buttons[i].textContent();
      console.log(`Button ${i}: "${text}"`);
    }

    // Use the utility function to handle mobile/desktop navigation
    await openRegisterModal(page);

    // Wait a bit and take another screenshot
    await page.waitForTimeout(2000);
    await page.screenshot({ path: "debug-after-click.png" });

    // Check if modal is visible
    const modal = page.locator('[data-testid="register-modal"]');
    const isVisible = await modal.isVisible();
    console.log("Modal visible:", isVisible);

    if (isVisible) {
      // Log all form fields
      const inputs = await page.locator("input").all();
      console.log("Found inputs:", inputs.length);

      for (let i = 0; i < inputs.length; i++) {
        const placeholder = await inputs[i].getAttribute("placeholder");
        const type = await inputs[i].getAttribute("type");
        console.log(`Input ${i}: type=${type}, placeholder="${placeholder}"`);
      }
    }
  });
});
