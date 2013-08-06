# Selenium standalone server bug repro

This test demonstrates what appears to be a bug in the latest version (2.34) of the Selenium standalone server, with some browsers.

## To run

    $ npm install
    $ mocha

## Tested on

My Mac, running OS 10.8.4

    $ uname -a
    Darwin Jasons-MacBook-Pro.local 12.4.0 Darwin Kernel Version 12.4.0: Wed May  1 17:57:12 PDT 2013; root:xnu-2050.24.15~1/RELEASE_X86_64 x86_64
    
Using Java 1.6.0

    $ java -version
    java version "1.6.0_51"
    Java(TM) SE Runtime Environment (build 1.6.0_51-b11-457-11M4509)
    Java HotSpot(TM) 64-Bit Server VM (build 20.51-b01-457, mixed mode)

## What's going on

The key line is the right-click:

        driver.actions().click(element, webdriver.Button.RIGHT).perform();

### Results

* Firefox 23.0: brings up the context menu as expected
* Chrome 28.0.1500.95: no effect, doesn't bring up the context menu
* Safari 6.0.5 (8536.30.1): errors out with "Unknown command: mouseMoveTo" (looks like a repro of [issue 5793](https://code.google.com/p/selenium/issues/detail?id=5793))
