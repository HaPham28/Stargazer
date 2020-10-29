const loaded = new Promise(async (resolve) => {
    console.log("Hello 6");
    const module = await import("client_side");
    console.log("Hello 7");
    await module.init();
    console.log("Hello 5");
    resolve(module);
    // resolve(2);
}).catch(r => {
    console.log(r);
});

export async function login(username, password){
    console.log("Hello 2");
    const module = await loaded.catch(error => console.log(error));
    console.log("Hello 4");
    const out = await module.login(username, password);
    // const out = 2;
    console.log("Hello 3");
    return out;
}
