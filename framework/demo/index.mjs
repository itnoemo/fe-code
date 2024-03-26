// demo1: 导出变量不能修改
import {name_const, name_let, name_var, person} from './a.mjs';
console.log('name_const', name_const);
console.log('name_let', name_let);
console.log('name_var', name_var);
console.log('person_name', person.name);
// 修改
// name_const += 'new_'; // ❌
// name_let += 'new_'; // ❌
// name_var += 'new_'; // ❌
person.name += 'new_'; // ✅
console.log('new_name_const', name_const);
console.log('new_name_let', name_let);
console.log('new_name_var', name_var);
console.log('new_person_name', person.name);


// demo2: default变量
import aDefault from './a.mjs';
console.log(`aDefault output->`,aDefault);

// demo3: import.meta.url 返回当前模块的本地路劲地址
console.log('import.meta.url', import.meta.url);