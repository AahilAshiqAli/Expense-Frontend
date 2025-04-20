Commitlintrc.json:
This file is to set up a config file for commitlint. It is used to enforce commit message conventions.

Prettierrc.json:
This file is to set up a config file for prettier. It is used to format the code.

Eslintrc.cjs:
This file is to set up a config file for eslint.
.cjs is used to indicate that this file is a CommonJS module.
Commonly EsLint config works better with CommonJS modules.

.eslint.config.js:
Tis file is also used to set up a config file for eslint.
The difference between previous configuartion file is that it works if project is CommonJS module.
But this will work if project works with ES MOdules

.editorconfig:
This file is to set up a config file for editors /IDEs. like you want lf or crlf line endings.

.env.sample:
PORT number etc

tsconfig.app.json:
This defines typescript should be compiled with ES2020 target.(language level)
configuring typescript compilation

tsconfig.node.json:
This file is to configure typescript for server side code present in the directory

tsconfig.json:
This file is to set up root ts config file which binds all other files

env.ts:
it is also a file which stores environment variables like title of application => uses Zod
provides type safety at run time. makes it easier to debug at runtime.. issues bcz of envs
Will explore further

vite-env.d.ts:
provides type safety at compile time
provides auto complete for environment variables

These both files use .env.sample for importing environment variables.
Here, env are loaded in vite.config.ts which works in Node environment. There parseAsync is used to get all files starting with
.env like .env.sample, .env.dev etc and all are laoded using loadEnv during run tiime.

If we are doing parsing in env.ts, we would have to use import.meta.env.VITE_APP_TITLE in our code. since env.ts file works on browser.

The whole src works on browser environment and everything outside of src works on Node environment.

global.d.ts:
this file is to define global types which are then available in all files without importing them.

difference between process.env and import.meta.env is process.env only provides access to env during run time but other one provides at run time as well as built time. Normally import.meta.env is used for front end and other is used in backend

styles.css:
This file is to define global styles for the application.
like any tailwind configuration can be defined here.
This file has styles for tailwind, and shadcn

components.json:
This file is for shadcn configurations. Here you can set your base color to Neutrla or Stale
