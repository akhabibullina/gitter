# Gitter

Gitter is a simple "all-client-side-based" new issues viewer for Github build on BackboneJs.

### Version
0.0.2

### How to run Gitter
1. Unzip the folder
2. Start the webserver such as Apache to serve the app locally
3. Run the file ``` path/to/project/gitter/index.html``` in the browser
4. You are there, enjoy!

### How to run Unit Tests
Open file ```tests/index.html``` in the browser. You will see similar output:
![alt text](http://addyosmani.com/gyazo/7d4de12.png "Logo Title Text 1")

### Warning!
Github API has rate limit so if the applications does too many requests the limit can exceed.
Good news: Using oAUth version of Github will help to request more.

### Tech

Gitter uses a number of open source projects to work properly:

* [BackboneJs] - Backbone.js gives structure to web applications.
* [Backbone.LocalStorage] - Backbone plugin that uses browser's LocalStorage for persistence or add NodeJs server for simplicity.
* [jQuery] - Backbone's dependency and helper for DOM manipulation tasks.
* [Underscore] - Great UI boilerplate for modern web apps.
* [RequireJs] - JavaScript file and module loader.
* [Text!] - Require.js plugin that allows to load raw text as a dependency file.
* [Issues API] - Github API for developers.
* [qUnit] - JavaScript Unit Testing framework(TDD)
* [Squire] - Dependency injector for testing Require.js modules.
* [GruntJs] - One word: automation.

### Structure and organization of the code

Gitter currently has the following structure

* Routes handling the following paths:

```
#contents          // Show the list of issues on Default Page
#view              // Show empty Issues Details Page
#view/:issue       // Show detailed issue information on Issue Details Page
#feedback          // Show Feedback form
*                  // Fallback to default behavior: navigate to Default Page
```
* Events
```
'issue:selected'    // triggers on every issue details request
'menu:changed'      // triggers when the navigation menu changes
'navigate:feedback' // this page doesn't have a separate view so we need an event for it
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
issue-list.js
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
Github API has rate limit so if the applications does too many requests the limit can exceed.

### Todo's

- Add "by number page" pagination(now it's only More and Prev buttons)
- UI fixes after refactoring
- Provide more unit tests
- Make sure there are no memory leaks with views
- Add node.js server to persist the state(for 2-way binding and les requests to Github API)
- Run tests under "test" task(GruntJs) without browser
- Backbone.Validations for models
- Other minor issues: see todo in the code

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
[YUI Compressor]: http://yui.github.io/yuicompressor/
[qUnit]: http://qunitjs.com/
[node.js]:http://nodejs.org
[jQuery]:http://jquery.com
[GruntJs]:http://gruntjs.com/
[Squire]:https://github.com/iammerrick/Squire.js/

