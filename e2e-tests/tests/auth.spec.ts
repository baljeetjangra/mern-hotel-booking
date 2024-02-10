import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:3000";

test("should allow user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  //get sign in
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

  await page.locator("[name=email]").fill("abc@gmail.com");

  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("link", { name: "sign out" })).toBeVisible();
});

test("should allow the user to register", async ({ page }) => {
  const testEmail = `test_register_${Math.floor(
    Math.random() * 90000
  )}@test.com`;

  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign up" }).click();

  await expect(
    page.getByRole("heading", { name: "Create an account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("def");
  await page.locator("[name=lastName]").fill("ghi");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("123456");
  await page.locator("[name=confirmPassword]").fill("123456");

  await page.getByRole("button", { name: "signup" }).click();

  await expect(page.getByText("Registration Success!")).toBeVisible();
});
