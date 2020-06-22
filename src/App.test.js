const puppeteer = require('puppeteer');



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
    await page.goto('http://localhost:3000/login');
    // await page.waitForSelector('#title');
    // const html = await page.$eval('#title', e => e.innerHTML);
    // expect(html).toBe('Register');
    await page.click('input#email');
    await page.type('input#email','yanis.bekhtaoui@gmail.com')
    await page.click('input#password')
    await page.type('input#password','123456')
    await page.click('.btnLogin')
    await page.waitForSelector('.titleSucess')
    const html = await page.$eval('.titleSucess', e => e.innerHTML);
    expect(html).toBe('Sucess');




    browser.close();
  }, 16000);
});