# Gitter

Gitter is a simple new issues viewer for Github build on BackboneJs.

### Version
0.0.1

### Tech

Gitter uses a number of open source projects to work properly:

* [BackboneJs] - Backbone.js gives structure to web applications
* [jQuery] - Backbone's dependency and helper for DOM manipulation tasks
* [Underscore] - great UI boilerplate for modern web apps
* [log4javascript] - a JavaScript logging framework based on the Java logging framework log4j
* [qUnit] - A JavaScript Unit Testing framework
* [RequireJs] - fast node.js network app framework
* [Text!] - Require.js plugin that allows to load raw text as a dependency file
* [node.js] - evented I/O for the backend

### How to run Gitter
1. Unzip the folder
2. Start the webserver such as Apache
3. Open the file ``` path/to/project/gitter/index.html``` in the browser
4. You are there!

### How to run Unit Tests
Open file ```tests/index.html``` in the browser. You will see similar output:
![alt text](http://addyosmani.com/gyazo/7d4de12.png "Logo Title Text 1")

### Structure and organisation of the code

Gitter currently has the following structure

* Routes handling the following paths:
```
#contents      // Show the list of issues on Default Page
#view/:issue   // Show detailed issue information on Issue Details Page
#feedback      // Show Feedback form
```
* Events
```
'issue:selected'
'menu:changed'
```
* Models
```
issue.js:
    defaults: {
      number: 0,
      title: 'Untitled',
      labels: '',
      state: 'N/A',
      username: 'anonymous',
      photo: '',
      summary: 'To Be Continued',
      teaser: 'Something 140char',
      comments: {}
    }
```
* Collections - set of issue models
```
issues.js
```
* Views
```
base.js
contents.js
issue.js
issue-list-item.js
navigation-menu.js
```
* Templates
```
issue-details.html
issue-teaser.html
```

### Todo's

- Unit Tests
- Automate JSHint
- Add NodeJs server for simplicity
- Logging mechanism
- Handle exceptions
- Code Commenting
- Cleanup

License
----
MIT


**Free Software, Hell Yeah!**

[john gruber]:http://daringfireball.net/
[@thomasfuchs]:http://twitter.com/thomasfuchs
[1]:http://daringfireball.net/projects/markdown/
[marked]:https://github.com/chjj/marked
[Ace Editor]:http://ace.ajax.org
[node.js]:http://nodejs.org
[Twitter Bootstrap]:http://twitter.github.com/bootstrap/
[keymaster.js]:https://github.com/madrobby/keymaster
[jQuery]:http://jquery.com
[@tjholowaychuk]:http://twitter.com/tjholowaychuk
[express]:http://expressjs.com
[AngularJS]:http://angularjs.org
[Gulp]:http://gulpjs.com
