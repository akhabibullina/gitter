# Gitter

Gitter is a simple new issues viewer for Github build on BackboneJs.

### Version
0.0.1

### How to run Gitter
1. Unzip the folder
2. Start the webserver such as Apache to serve the app
3. Open the file ``` path/to/project/gitter/index.html``` in the browser
4. You are there, enjoy!

### How to run Unit Tests
Open file ```tests/index.html``` in the browser. You will see similar output:
![alt text](http://addyosmani.com/gyazo/7d4de12.png "Logo Title Text 1")

### Tech

Gitter uses a number of open source projects to work properly:

* [BackboneJs] - Backbone.js gives structure to web applications
* [jQuery] - Backbone's dependency and helper for DOM manipulation tasks
* [Underscore] - great UI boilerplate for modern web apps
* [RequireJs] - a JavaScript file and module loader
* [Text!] - Require.js plugin that allows to load raw text as a dependency file
* [Issues API]
* [log4javascript] - a JavaScript logging framework based on the Java logging framework log4j
* [qUnit] - A JavaScript Unit Testing framework
* [node.js] - evented I/O for the backend

### Structure and organization of the code

Gitter currently has the following structure

* Routes handling the following paths:
```
#contents      // Show the list of issues on Default Page
#view/:issue   // Show detailed issue information on Issue Details Page
#feedback      // Show Feedback form
*              // Fallback to default behavior
```
* Events
```
'issue:selected'
'menu:changed'
```
* Models
```
issue-details.js:
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
issues-pageable.js
```
* Views
```
base.js
contents.js
issue-details.js
issue-list-item.js
navigation-menu.js
```
* Templates
```
issue-details.html
issue-teaser.html
```

### Known Issues
- HTML 5 Hash History

### Todo's

- Add more unit tests
- Automate JSHint(GruntJs)
- Concatenate and minify the files into one "build" file(GruntJs)
- Logging mechanism
- Handle exceptions
- Use [Backbone.LocalStorage] - Backbone plugin that uses browser's LocalStorage for persistence or add NodeJs server for simplicity

License
----
MIT


**Free Software, Hell Yeah!**

[BackboneJs]: http://backbonejs.org/
[Underscore]: http://underscorejs.org/
[Backbone.LocalStorage]: https://github.com/jeromegn/Backbone.localStorage
[RequireJs]: http://requirejs.org/
[Text!]: https://github.com/requirejs/text
[Issues API]: https://developer.github.com/v3/issues/
[log4javascript]: http://log4javascript.org/docs/index.html
[qUnit]: http://qunitjs.com/
[node.js]:http://nodejs.org
[jQuery]:http://jquery.com

