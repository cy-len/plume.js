# plume.js
A super lightweight toolkit for making Single Page Applications (SPA) in pure HTML/JS, based on WebComponents

# How to use it

First, you will need to import the plume.js file in your application's HTML file with a basic <script> tag.
This will allow you to use the WebComponents provided by Plume.js in your application.

## main-view and page-route

The ```<main-view>``` element represents, as its name suggests, the main viewport of your application.
It acts as a router, meaning that it allows you to switch easily between the different pages or screens of your app.
You can define these pages or screens with the ```<page-route>``` element inside your ```<main-view>```.
Each ```<page-route>``` has an ```href``` attribute which specifies the URL it corresponds to. This tells the ```<main-view>``` in reaction to which URL one route or another it should display. The showing/hiding logic is simply done by adding the ```display: block``` styling to the current ```<page-route>``` and by adding the ```display: none``` to all the others.

Since an example is better than a long text, here is how to works with a basic routing example :

```
<html>
 <head>
 </head>
 <body>
  <script src="plume.js"></script>
  
  <nav>
   <!-- Normal HTML code for all the elements that are perpetually visible on the site, such as navigation bar or footer -->
  </nav>
  
  <!-- Here the interesting stuff begins -->
  <main-view>
   <page-route href="/">
    <div id="home-page">
     <!-- This div and its content will only be visble if the URL is www.site.com or www.site.com/ -->
     <h1>Home page</h1>
     <p>You are on the home page, because of the URL you entered</p>
    </div>
   </page-route>
   <page-route href="/products">
    <div id="products-page">
     <!-- This div and its content will only be visible if the URL is www.site.com/products -->
     <h1>Products page</h1>
     <p>You are on the products page, because of the URL you entered</p>
    </div>
   </page-route>
   <page-route href="/contact">
    <div id="contact-page">
     <!-- This div and its content will only be visible if the URL is, you guessed it, www.site.com/contact -->
     <h1>Contact page</h1>
     <p>You are on the contact page, because of the URL you entered</p>
    </div>
   </page-route>
  </main-view>
 </body>
</html>
```
 
