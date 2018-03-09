// function msgAfterTimeout (msg, who, timeout) {
//     return new Promise((resolve, reject) => {
//     setTimeout(() => resolve(`${msg} Hello ${who}!`), timeout)
//     })
//    }
//    msgAfterTimeout("", "Foo", 3000).then((msg) => {
//     var d = new Date();
//     var n = d.getTime();
//     console.log(`done after 1000ms:${msg}, ${n}`);
//     return msgAfterTimeout(msg, "Bar", 6000);
//    }).then((msg) => {
//     var d = new Date();
//     var n = d.getTime();
//     console.log(`done after 3000ms:${msg}, ${n}`)
//    })