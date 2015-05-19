# Meteor Boilerplate for Typescript Projects

* Thanks to [https://github.com/dataflows/meteor-typescript-utils](https://github.com/dataflows/meteor-typescript-utils)
* Ready to go typescript solution!
* Full support for Typescript 1.5!
* Unit testing with karma directly in Webstorm!
* Typescript modules!

# Quickstart

1. Clone this repository 
1. Run `npm install` in the main directory
1. Add your files (see section *Files*).
1. If you want to use modules use `build-debug-modules` or `build-release-modules` gulp task (see section *Modules*).
1. If you do not want modules use `build` gulp taks.
1. Done! 

# Modules

To get modules running, you need to register top level modules in modules:export package.
For example, if our modules are like `MyModule.SubModule1`, `MyModule.SubModule2`, `MyOtherModule.SubModule1` then the top level module is MyModule.
We register this module as following:
 
```javascript
//file: /src/packages/exports/exports.js
MyModule = {}
MyOtherModule = {}
```

and
```javascript
//file: /src/packages/exports/package.js

...
api.export('MyModule');
api.export('MyOtherModule');
...
```

Registering module in package assures that the top level module definition is loaded before any 
other module extension. In the next section, we explain what options we have in building the project. 

# Building With Gulp

All the magic needed to run the project is hidden inside the [gulp]() files.
Just choose your favourite editor (i.e. Sublime, Webstorm, Visual Studio Code) and run the gulp files 
to compile your project. These are the tasks that are currently supported:

* `build` - Builds the project into `/src/js` directory, ignoring modules
* `build-debug-modules` - Builds the project into `/src/js` with multiple files, where 
files are split into three directories (client, server and lib). Files are prefixed by number assuring 
the correct load order. The load order is detected from references within "*.ts" files.
* `build-release-modules` - Builds the project into three files: client/client.js, lib/lib.js and server/server.js.
* `tslint` - Runs a tslint

# Editors

This boilerplate has been pre-configured for:

1. Visual Studio Code
1. WebStorm

# Files

Please check out the [Typescript-Utils](https://github.com/dataflows/meteor-typescript-utils) page to see how to write
awesome statically typed template helpers, events and routes.

# Packages

We have chosen Semantic UI as the main front end framework. 
You can control which components are used in '/src/client/lib/semanticui/custom.semantic.json'

* `semantic:ui` - Beautifully crafted web pages with Semantic UI
* `useraccounts:semantic-ui` - User accounts manipulation in semantic ui
* `accounts-password` - Authentification package
* `flemay:autoprefixer` - Vital helper for Semantic UI package (can be removed if Semantic UI is removed)
* `iron:router` - Popular routing solution
* `multiply:iron-router-progress` - Visual progress display (progress colors are defined in /client/stylesheets/progress.css)
* `meteorhacks:subs-manager` - Subscription manager to save traffic
* `meteorhacks:fast-render` - Blazing fast page load, no more waiting
* `alanning:roles` - Roles management
* `dataflows:typescript-utils` - Typescript goodies

We leave the rest of the packages up to you, not to annoy you too much.

# Karma

This project has been configured to run with Karma (e.g. in Webstorm) for super fast unit testing.
Just click on *Run Configurations* -> *add* -> *Karma*.

You can install karma cli if you plan to run karma tests in terminal`sudo npm install -g karma-cli`. 
You can now simply run `karma start`.

## License
This project is provided on the MIT license.
