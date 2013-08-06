var assert = require('assert');
var webdriver = require('selenium-webdriver');
var remote = require('selenium-webdriver/remote');
var test = require('selenium-webdriver/testing');

var jarpath = process.env['SELENIUM'];
if (!jarpath) {
  process.stderr.writeln('Please set the environment variable SELENIUM to the path to your Selenium server standalone jar.')
  process.exit(-1);
}

var server = new remote.SeleniumServer({jar: jarpath});
server.start();

var builder = new webdriver.Builder().usingServer(server.address());

var url = 'http://medialize.github.io/jQuery-contextMenu/demo.html';

function testContextMenu(driver) {
  driver.get(url);
  var element = driver.findElement(webdriver.By.css('.context-menu-one'));
  driver.actions().click(element, webdriver.Button.RIGHT).perform();
  return driver.findElement(webdriver.By.css('#context-menu-layer'));
}

function testBrowser(browser) {
  test.it(browser, function () {
    var driver = builder.withCapabilities({'browserName': browser}).build();
    testContextMenu(driver);
    driver.quit();
  })
}

test.describe('right-click to get a context menu', function () {
  testBrowser('firefox');
  testBrowser('chrome');
  testBrowser('safari');
})
