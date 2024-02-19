let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
}, 60000);

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Let’s build from here · GitHub", { timeout: 90000 });
  }, 100000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 100000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-muted-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Sign up for free");
  }, 60000);
});

describe("Github page title tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/");
  }, 60000);

  test("features/actions", async () => {
    await page.goto("https://github.com/features/actions");
    const titleFeatures = await page.title();
    expect(titleFeatures).toEqual("Features • GitHub Actions · GitHub");
  }, 30000);

  test("features/packages", async () => {
    await page.goto("https://github.com/features/packages");
    const titleCodespace = await page.title();
    expect(titleCodespace).toEqual('GitHub Packages: Your packages, at home with their code · GitHub')
  }, 30000);

  test("features/codespaces", async () => {
    await page.goto("https://github.com/features/codespaces");
    const titlePricing = await page.title();
    expect(titlePricing).toEqual('GitHub Codespaces · GitHub')
  }, 30000);  
});
