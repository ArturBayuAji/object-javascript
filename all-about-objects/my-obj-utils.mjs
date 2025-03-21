// function to show the prototype objects, name and the chain of an object / function
function visualizeProtos(obj, ...yourCustomeProto) {
    let proto = obj;
    let protoChain = [];
    const protoList = [
        // javascript's global constructor
        {"Function.prototype": Function.prototype},
        {"Array.prototype": Array.prototype},
        {"Date.prototype": Date.prototype},
        {"Object.prototype": Object.prototype},
    ];

    yourCustomeProto.forEach((el) => protoList.push(el));

    // console.log(`=========================================`);
    // console.log(`diggin the prototype of :`);
    // console.log(obj);
    // console.log(`-----------------------------------`)
    do {
        proto = Object.getPrototypeOf(proto);
        if (!(proto == null)) {
            const correspondingProto = protoList.find((obj) => {
                let key = Object.keys(obj)[0];
                let val = obj[key];
                if (proto === val) {
                    return true;
                }
            });
            console.log(proto);
            console.log(`is ${Object.keys(correspondingProto)[0]}\n`);
            protoChain.push(Object.keys(correspondingProto)[0]);
        }
    } while (proto);
    protoChain.push("null");
    console.log(`Prototype chain : ${protoChain.join(" --> ")}\n`);
    // console.log(`=========================================\n`);
}


export { visualizeProtos };