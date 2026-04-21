/*
## Modules - Global Scope "Gotcha"

If your TypeScript files aren't modules (i.e., they don't have any import or export statements), 
they're treated as scripts in the global scope. In this case, declaring the same variable in 
two different files would cause a conflict.
*/
let name = "shakeAdnBake";

const susan = "susan";

export let something = "something";
