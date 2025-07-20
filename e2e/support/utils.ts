import { Page, expect } from "@playwright/test";

export interface TestUser {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export const generateTestUser = (): TestUser => {
  const timestamp = Date.now();
  return {
    email: `test${timestamp}@example.com`,
    username: `testuser${timestamp}`,
    password: "TestPassword123!",
    firstName: "Test",
    lastName: "User",
    dateOfBirth: "1990-01-01",
  };
};

export const clearAuthState = async (page: Page) => {
  // Clear localStorage to reset authentication state
  await page.evaluate(() => {
    localStorage.clear();
  });

  // Navigate to fresh page to reset UI state
  await page.goto("/");
};

export const openRegisterModal = async (page: Page) => {
  // Check if we're on mobile by looking for hamburger menu
  // The class name might be CSS module generated, so let's look for partial matches
  const hamburgerMenu = page.locator('[class*="hbMenu"]').first();

  if (await hamburgerMenu.isVisible()) {
    // Mobile view - open hamburger menu first
    await hamburgerMenu.click();

    // Wait for mobile menu to appear - look for CSS module generated class
    await page.waitForSelector('[class*="view"]');

    // Now click the New Account button inside the mobile menu
    await page.getByRole("button", { name: /new account/i }).click();
  } else {
    // Desktop view - click directly
    await page.getByRole("button", { name: /new account/i }).click();
  }
};

export const openLoginModal = async (page: Page) => {
  // Check if we're on mobile by looking for hamburger menu
  const hamburgerMenu = page.locator('[class*="hbMenu"]').first();

  if (await hamburgerMenu.isVisible()) {
    // Mobile view - open hamburger menu first
    await hamburgerMenu.click();

    // Wait for mobile menu to appear
    await page.waitForSelector('[class*="view"]');

    // Now click the Login button inside the mobile menu
    // Use a more specific selector to target the login button inside the mobile menu
    await page.locator('[class*="view"]').getByTestId("login-button").click();
  } else {
    // Desktop view - click directly
    await page.getByTestId("login-button").first().click();
  }
};

export const fillLoginForm = async (
  page: Page,
  email: string,
  password: string
) => {
  // Fill email
  await page.getByPlaceholder("example@email.com").fill(email);

  // Fill password
  await page.locator('input[type="password"]').fill(password);
};

export const fillRegistrationForm = async (page: Page, user: TestUser) => {
  // Fill first name
  await page.getByPlaceholder("Enter your first name").fill(user.firstName);

  // Fill last name
  await page.getByPlaceholder("Enter your last name").fill(user.lastName);

  // Fill date of birth
  await page.locator('input[type="date"]').fill(user.dateOfBirth);

  // Fill email
  await page.getByPlaceholder("example@email.com").fill(user.email);

  // Fill username
  await page.getByPlaceholder("Enter your username").fill(user.username);

  // Fill password
  await page.locator('input[type="password"]').fill(user.password);
};

export const waitForModalToClose = async (page: Page) => {
  // Wait for modal to disappear
  await page.waitForSelector(
    '[data-testid="register-modal"], [data-testid="login-modal"]',
    {
      state: "hidden",
    }
  );
};

export const expectUserToBeLoggedIn = async (page: Page, username: string) => {
  // Wait a bit for the UI to update after registration
  await page.waitForTimeout(3000);

  // Check if mobile menu is open and close it if needed
  const mobileMenu = page.locator('[class*="view"]');
  if (await mobileMenu.isVisible()) {
    console.log("Mobile menu is open, closing it");
    // Click outside the mobile menu to close it, or find a close button
    await page.click("body");
    await page.waitForTimeout(1000);
  }

  // Check if user profile shows the correct username
  // First check if the user profile element exists
  const userProfile = page.locator('[data-testid="user-profile"]');

  console.log("User profile element exists:", await userProfile.count());
  console.log("User profile element visible:", await userProfile.isVisible());

  if ((await userProfile.count()) > 0) {
    const text = await userProfile.textContent();
    console.log("User profile text:", text);

    // Check if the text contains the username (even if element is not visible)
    if (text && text.includes(username)) {
      console.log("User profile contains correct username");
      return; // Success - user is logged in
    }
  }

  // If we get here, either the user profile doesn't exist or doesn't have the correct text
  // Let's try to wait a bit more and check again
  await page.waitForTimeout(2000);

  const userProfile2 = page.locator('[data-testid="user-profile"]');
  if ((await userProfile2.count()) > 0) {
    const text = await userProfile2.textContent();
    console.log("User profile text after additional wait:", text);

    if (text && text.includes(username)) {
      console.log("User profile contains correct username after wait");
      return; // Success
    }
  }

  // If still not found, throw an error
  throw new Error(
    `User profile not found or does not contain username: ${username}`
  );
};

export const openProfileModal = async (page: Page) => {
  // Check if we're on mobile by looking for hamburger menu
  const hamburgerMenu = page.locator('[class*="hbMenu"]').first();

  if (await hamburgerMenu.isVisible()) {
    // Mobile view - open hamburger menu first
    await hamburgerMenu.click();

    // Wait for mobile menu to appear
    await page.waitForSelector('[class*="view"]');

    // Now click the user profile button inside the mobile menu
    await page.locator('[class*="view"]').getByTestId("user-profile").click();
  } else {
    // Desktop view - click directly
    await page.getByTestId("user-profile").click();
  }
};
