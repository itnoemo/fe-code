import {person} from './a.mjs';
setInterval(() => {
    console.log(`output->`,person.name);
}, 500)