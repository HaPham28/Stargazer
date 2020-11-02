import {real_promise} from "./real_promise";

const loaded = real_promise(async () => {
    const module = await import("client_side");
    await module.init();
    return module;
}).catch(r => {
    console.log("Could not connect to back-end server: " + r);
    alert("Could not connect to back-end server!");
});

export async function get_token(){
    const module = await loaded;
    return module.get_token();
}
export async function set_token(token){
    const module = await loaded;
    return module.set_token(token);
}

export async function login(username, password){
    const module = await loaded;
    return await module.login(username, password);
}

export async function change_password_username(username, old_password, new_password){
    const module = await loaded;
    return await module.change_password_username(username, old_password, new_password);
}
export async function change_password_id(id, old_password, new_password){
    const module = await loaded;
    return await module.change_password_id(id, old_password, new_password);
}

export async function get_user_public_username(username){
    const module = await loaded;
    return await module.get_user_public_username(username);
}
export async function get_user_public_id(id){
    const module = await loaded;
    return await module.get_user_public_id(id);
}

export async function get_user_full(){
    const module = await loaded;
    return await module.get_user_full();
}

export async function search_user(search_string, limit, offset){
    const module = await loaded;
    return await module.search_user(search_string, limit, offset);
}
