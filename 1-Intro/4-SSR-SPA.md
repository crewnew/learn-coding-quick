  

Rendering a site - server-side & client-side (SPA)
==================================================

**MPA - multi page apps**

Quite recently server-side rendering (back-end web development) was the way to create websites and web apps. Today more and more web apps are single-page applications (SPA) but even today many web apps are developed as MPA (multi-page apps). In MPA when you visit a page, send a request for content, the server processes this request and creates a response that is sent back to your browser.

![](https://i.imgur.com/XIxqR8t.png)

When the site renders server-side, all the processes involved in creating an HTML page that your web browser can understand are handled on a server hosting the web app. This includes querying databases for information and processing any logic that your web app requires.

While the remote server is busy at work, your web browser is idle, waiting for the server to finish processing the request and sending a response. When the response is received, web browsers interpret it and display the content on the screen.

**SPA - single-page apps**

In more modern days, a new form of site rendering emerged called client-side rendering or front-end development. Web apps are called SPA (single-page apps).

With client-side rendering, the rendering of the content happens a lot also on your computer. It can be that the website or web app is loaded to your device once and the rest is done in front-end but in most cases, there's also, of course, some data exchange between web server going on but it happens with AJAX (**A**synchronous **J**avaScript **A**nd **X**ML). So you can read data from a web server - after a web page has loaded and then update the webpage without reloading it (that takes time). Send and receive data from the server basically in the background.

![](https://i.imgur.com/yxhkknY.png)

Client-side rendering became popular with the advent of JavaScript libraries such as in the beginning the Google-developed Angular, then came Facebook's React, and now open-source Vue is also getting more and more popular. It is still way less popular though compared to React in terms of clients using it and developers out there. Also, in terms of all kinds of plugins out there. There are also some less popular ones but still very good ones like Svelte and Elm.

[Marketing aimed text about SPA>>](https://medium.com/crewnew-com/single-page-application-spa-website-development-vs-multi-page-websites-86194e7d8418 "https://medium.com/crewnew-com/single-page-application-spa-website-development-vs-multi-page-websites-86194e7d8418")