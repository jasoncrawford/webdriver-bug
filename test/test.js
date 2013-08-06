var assert = require('assert');
var webdriver = require('selenium-webdriver');
var remote = require('selenium-webdriver/remote');
var test = require('selenium-webdriver/testing');

var jarpath = './selenium-server-standalone-2.34.0.jar';
var url = 'http://medialize.github.io/jQuery-contextMenu/demo.html';

var server = new remote.SeleniumServer({jar: jarpath});
server.start();

var builder = new webdriver.Builder().usingServer(server.address());

function testContextMenu(driver) {
  driver.get(url);
  var element = driver.findElement(webdriver.By.css('.context-menu-one'));
  driver.actions().click(element, webdriver.Button.RIGHT).perform();
  driver.findElement(webdriver.By.css('#context-menu-layer'));
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
