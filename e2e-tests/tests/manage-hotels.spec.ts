import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:3000";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  //get sign in
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

  await page.locator("[name=email]").fill("abc@gmail.com");

  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("link", { name: "sign out" })).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(UI_URL + "/add-hotel");

  await page.locator('[name="name"]').fill("Test hotel");
  await page.locator('[name="country"]').fill("Test country");
  await page.locator('[name="city"]').fill("Test city");
  await page.locator("#description").fill("description");

  await page.locator('[name="pricePerNight"]').fill("100");
  await page.locator('[name="starRating"]').fill("3");

  await page.getByText("Budget").click();
  await page.getByText("Parking").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("1");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "hotel1.jpg"),
    path.join(__dirname, "files", "hotel2.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hotel Saved!")).toBeVisible();
});

test("should allow user to view their hotels", async ({ page }) => {
  await page.goto(UI_URL + "/my-hotels");

  await expect(page.getByText("Test hotel")).toBeVisible();

  await expect(page.locator(':has-text("description")')).toBeVisible();

  await expect(page.getByText("Test city")).toBeVisible();
  await expect(page.getByText("Test country")).toBeVisible();

  await expect(page.getByText("100$ / night")).toBeVisible();
  await expect(page.getByText("2 Adults")).toBeVisible();
  await expect(page.getByText("1 Children")).toBeVisible();
  await expect(page.getByText("3")).toBeVisible();

  await expect(page.getByRole("link", { name: "View Details" })).toBeVisible();
});

test("should edit hotel details", async ({ page }) => {
  await page.goto(UI_URL + "/my-hotels");

  await page.getByRole("link", { name: "View Details" }).click();

  await page.waitForSelector('[name="name"]', { state: "attached" });

  await expect(page.locator('[name="name"]')).toHaveValue("Test hotel");

  await page.locator('[name="name"]').fill("Updated hotel");

  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hotel Saved!")).toBeVisible();

  await page.reload();

  await expect(page.locator('[name="name"]')).toHaveValue("Updated hotel");
});
