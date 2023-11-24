Data formats
============

**JSON** (**J**ava**S**cript **O**bject **N**otation) - although originally derived from the JS (JavaScript), JSON data can be generated and parsed with any programming language. It is almost always the best way to transfer data between different APIs, apps, programs, machines. Below example:

![](https://i.imgur.com/uKj4c8B.png)

But it could be also ugly (not nicely formatted) and thus a bit harder to read by humans but it will be still valid and readable by machines:

![](https://i.imgur.com/kofyrwH.png)

As JS is almost the only one in the front-end and in web apps also becoming the most popular one after PHPs decades of ruling then obviously the JSON is the winner because of that, too.

**XML** (e**X**tensible **M**arkup **L**anguage). A lot is seen in Java. Was a very popular while ago (before APIs became popular) to transfer data between services (for example between ERP or accounting software and e-shop).

![](https://i.imgur.com/UZ8hLTf.png)

**CSV** (**C**omma-**S**eparated **V**alues) - save data in table structured format. Sometimes also semicolon ; is used instead of a comma. Also, if the field contains commas then you will need to use " to separate columns. But it field also contains ". Then you need already for example save it " and it makes things a lot more complicated. CSV is not really suggested today as it may cause a lot of problems when importing due to different formats.

![](https://i.imgur.com/R6SGaVm.png)

It is commonly used as it looks fine when you import it to your spreadsheet (eg. Google Sheets, LibreOffice, MS Excel, etc):

![](https://i.imgur.com/tOLNdev.png)

**YAML** (Aint Markup Language). There's an equal number of white spaces in each block). The problem with this one is that if you have one space too little or one space too much in the YAML file then there's an error. Many devs say they would like to kill the man who invited YAML. But it's lot seen in Python.

![](https://i.imgur.com/H3VY0yN.png)

**SQL** (**S**tructured **Q**uery **L**anguage) - it is not a data format but a query language but you can still save your data in a text file in SQL format. Below you see that the first table is created to store our data where is needed also to define for each column if it is required (NOT NULL = required like all our fields are in this example) and what type they are. The "id" field is also a unique PRIMARY KEY. Rest are VARCHAR text fields and their maximum length is also defined as max 30 characters and 200 chars. Below we are inserting our 2 devs into the newly created table. such a way to store data is in most cases used for backing up the DB.

![](https://i.imgur.com/9QI8MK6.png)