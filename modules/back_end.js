import {real_promise} from "./real_promise";

// @ts-ignore
const loaded = real_promise(async () => {
    const module = await import("client_side");
    await module.init();
    return module;
}).catch(r => {
    console.log(r);
});

export async function login(username, password){
    const module = await loaded;
    return await module.login(username, password);
}

export async function get_token(){
    const module = await loaded;
    return module.get_token();
}
export async function set_token(token){
    const module = await loaded;
    return module.set_token(token);
}

export async function change_password_username(username, old_password, new_password){
    const module = await loaded;
    return module.change_password_username(username, old_password, new_password);
}
export async function change_password_id(id, old_password, new_password){
    const module = await loaded;
    return module.change_password_id(id, old_password, new_password);
}
