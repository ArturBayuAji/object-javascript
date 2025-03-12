/* 
ES Modules (ECMAScript Modules)
Modules that get their own separate scope and support the import and export keywords, 
which aren’t available in regula scripts, to declare their dependencies and interface. 
This module system is usually called ES modules (where ES stands for ECMAScript).
*/

// not part of the module's interface
const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/* 
The export keyword can be put in front of a function, class, 
or binding definition to indicate that that binding is part of the module’s
interface.
*/

// functions that parts of the module's interface
export function dayName(number) {
    return names[number];
}

export function dayNumber(name) {
    return names.indexOf(name);
}