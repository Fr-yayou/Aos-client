const faker = require('faker');
const puppeteer = require('puppeteer');

// const person = {
//   name: faker.name.firstName() + ' ' + faker.name.lastName(),
//   email: faker.internet.email(),
//   phone: faker.phone.phoneNumber(),
//   message: faker.random.words()
// };

describe('H1 Text', () => {
  test('h1 loads correctly', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400
      },
      userAgent: ''
    });
    await page.goto('http://localhost:3000/register');
    // await page.waitForSelector('#title');
    // const html = await page.$eval('#title', e => e.innerHTML);
    // expect(html).toBe('Register');
    await page.click('input#email');
    await page.type('input#email','yanis')
    await page.click('.btnRegister')
    await page.waitForSelector('.emailErr')
    const html = await page.$eval('.emailErr', e => e.innerHTML);
    expect(html).toBe('Email is invalid');




    browser.close();
  }, 16000);
});