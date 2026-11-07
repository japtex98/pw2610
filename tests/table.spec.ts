import { test, expect } from "@playwright/test";

const tablePage = "https://the-internet.herokuapp.com/tables";

type Person = {
  fullName: string;
  due: number;
};

let persons: Person[] = [];
let dueData: number[] = [];

test.describe("Verify due data from table", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(tablePage);
    persons = [];
    dueData = [];

    await test.step("Get due data from table", async () => {
      const rows = await page.locator("#table1 tbody tr");
      const rowCount = await rows.count();

      for (let i = 0; i < rowCount; i++) {
        const firstName = await rows.nth(i).locator("td").nth(0).textContent();
        const lastName = await rows.nth(i).locator("td").nth(1).textContent();
        const fullName = `${lastName?.trim() || ""} ${firstName?.trim() || ""}`;
        const dueText = await rows.nth(i).locator("td").nth(3).textContent();
        const due = parseFloat(dueText?.replace("$", "") || "0");

        persons.push({ fullName: fullName?.trim() || "", due });
        dueData.push(due);
      }
    });
  });
  test("Verify maximum due data from table", async () => {
    const maxDue = Math.max(...dueData);
    const personWithMaxDue = persons
      .map((person) => (person.due === maxDue ? person : null))
      .filter(Boolean)[0];

    expect(personWithMaxDue?.fullName).toBe("Jason Doe");
  });
  test("Verify minimum due data from table", async () => {
    const minDue = Math.min(...dueData);
    const personWithMinDue = persons
      .map((person) => (person.due === minDue ? person : null))
      .filter(Boolean);

    expect(personWithMinDue.map((p) => p?.fullName)).toStrictEqual([
      "John Smith",
      "Tim Conway",
    ]);
  });
});
