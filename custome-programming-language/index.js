/* 
e.g.
parsing : >(x, 5)

result in this structured format (syntax tree):
{
    "type": "apply",
    "operator": { "type": "word", "name": ">" },
    "args": [
        { "type": "word", "name": "x" },
        { "type": "value", "value": 5}
    ]
}

where `type` can be :
- "value" -> a number or string
- "word" -> a variable or function name
- "apply" -> a function call
*/


/* 
write recursive functions that will:

1. Read a piece of code
2. Identify its type (word, value, or function call)
3. Convert it into a syntax tree
*/

/* 
Skipping Whitespace
We don’t care about spaces or newlines, so let’s remove them first.
*/
function skipSpace(string) {
    // `\S` Matches the first non-space character.
    let first = string.search(/\S/);
    if (first == -1) return "";
    /* 
    `slice` extracts a section of this string and returns it as a new string, 
    without modifying the original string. 
    */
    // return everything after the whitespace
    return string.slice(first);
}

// console.log(skipSpace(" foo bar"));


/* 
Recognizing Basic Expressions

this funciton identifies :
- Strings (like "hello")
- Numbers (like `42`)
- Words (like `x` or `print`)
*/
function parseExpression(program) {
    program = skipSpace(program);
    let match, expr;

    if (match = /^"([^"]*)"/.exec(program)) {
        expr = { type: "value", value: match[1] };
    } else if (match = /^\d+\b/.exec(program)) {
        expr = { type: "value", value: Number(match[0]) };
    } else if (match = /^[^\s(),#"]+/.exec(program)) {
        expr = { type: "word", name: match[0] };
    } else {
        throw new SyntaxError("Unexpected syntax: " + program);
    }

    return parseApply(expr, program.slice(match[0].length));
}