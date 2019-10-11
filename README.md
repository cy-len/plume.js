# plume.js
A minimalistic toolkit for making Single Page Applications (SPA) in pure HTML/JS, based on WebComponents

# How to use it

First, you will need to import the plume.js file in your application's HTML file with a basic <script> tag.
This will allow you to use the WebComponents provided by Plume.js in your application.

## main-view and page-route

The ```<main-view>``` element represents, as its name suggests, the main viewport of your application.
It acts as a router, meaning that it allows you to switch easily between the different pages or screens of your app.
You can define these pages or screens with the ```<page-route>``` element inside your ```<main-view>```.
Each ```<page-route>``` has an ```path``` attribute which specifies the URL it corresponds to. This tells the ```<main-view>``` in reaction to which URL one route or another it should display. The showing/hiding logic is simply done by adding the ```display: block``` styling to the current ```<page-route>``` and by adding the ```display: none``` to all the others.

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
   <page-route path="/">
    <div id="home-page">
     <!-- This div and its content will only be visble if the URL is www.site.com or www.site.com/ -->
     <h1>Home page</h1>
     <p>You are on the home page, because of the URL you entered</p>
    </div>
   </page-route>
   <page-route path="/products">
    <div id="products-page">
     <!-- This div and its content will only be visible if the URL is www.site.com/products -->
     <h1>Products page</h1>
     <p>You are on the products page, because of the URL you entered</p>
    </div>
   </page-route>
   <page-route path="/contact">
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

### navigation-link

To work with the routing provided by the ```<main-view>``` and ```<page-route>``` elements, you don't want to use the ```<a>``` element like you would do traditionnaly, because it would send a new request to the server and reload the page, which defeats the whole purpose of a Single Page Application. Instead, you can use the ```<navigation-link>``` provided by Plume.js, and you do so exactly the same way you would use a ```<a>``` element :

```
<navigation-link href="/contact">Contact</navigation-link>
```

When the user will click on it, it will automatically change the URL and fire the routing logic of the ```<main-view>```.


### flip-flop

The ```<flip-flop>``` element allows you to show one element (flip) or another (flop) based on the return value of a JavaScript function. It is useful in a lot of cases, for instance if you want to display a different page if the user is logged in or not.
The function, whose name you provide in the ```function``` attribute has to return a boolean. Each time the ```<flip-flop>``` is updated, which it does automatically when it is (re-)displayed by the routing, it will call the specified function, and if it returns true it will display only its first child element, and if it returns false, it will display only its second child element.

Again, an example :

```
<script>
 function isAuthenticated() {
  return true; // Placeholder of course
 }
</script>

<flip-flop function="isAuthenticated">
 <div id="authenticated-home">
  <!-- This div is displayed only when isAuthenticated() returns true -->
  <h1>Authenticated user</h1>
 </div>
 <div id="unauthenticated-home">
  <!-- This div is displayed only when isAuthenticated() returns false -->
  <h1>Unauthenticated user</h1>
 </div>
</flip-flop>
```

### globalStorage object

The globalStorage object is a global variable which is designed as a wrapper object for all the data you may need to want to access everywhere, for instance your authentication token.

### onloadActions

Plume.js needs to overwrite ```window.onload``` and won't work if you overwite it yourself. To allow you to still be able to perform some actions you would normally do on onload, the onloadActions array can be used :

```
onloadActions.push(() => {
 // Do some stuff in onload
});
```
