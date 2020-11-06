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
    // noinspection JSUnresolvedFunction
    return module.get_token();
}
export async function set_token(token){
    const module = await loaded;
    // noinspection JSUnresolvedFunction
    return module.set_token(token);
}

export async function login(username, password){
    const module = await loaded;
    // noinspection JSUnresolvedFunction
    return await module.login(username, password);
}

export async function change_password(username, old_password, new_password){
    const module = await loaded;
    // noinspection JSUnresolvedFunction
    return await module.change_password(username, old_password, new_password);
}

export async function get_user_public_username(username){
    const module = await loaded;
    // noinspection JSUnresolvedFunction
    return await module.get_user_public_username(username);
}
export async function get_user_public_id(id){
    const module = await loaded;
    // noinspection JSUnresolvedFunction
    return await module.get_user_public_id(id);
}
export async function get_user_full(){
    const module = await loaded;
    // noinspection JSUnresolvedFunction
    return await module.get_user_full();
}
export async function search_user(search_string, limit, offset){
    const module = await loaded;
    // noinspection JSUnresolvedFunction
    return await module.search_user(search_string, limit, offset);
}

export async function get_place(place_id){
    const module = await loaded;
    // noinspection JSUnresolvedFunction
    return await module.get_place(place_id);
}

export async function add_review(place_id, review, review_text){
    const module = await loaded;
    // noinspection JSUnresolvedFunction
    return await module.add_review(place_id, review, review_text);
}
export async function delete_review(review_id){
    const module = await loaded;
    // noinspection JSUnresolvedFunction
    return await module.delete_review(review_id);
}
export async function get_review(review_id){
    const module = await loaded;
    // noinspection JSUnresolvedFunction
    return await module.get_review(review_id);
}
export async function get_reviews_for_user_username(username, limit, offset){
    const module = await loaded;
    // noinspection JSUnresolvedFunction
    return await module.get_reviews_for_user_username(username, limit, offset);
}
export async function get_reviews_for_user_id(id, limit, offset){
    const module = await loaded;
    // noinspection JSUnresolvedFunction
    return await module.get_reviews_for_user_id(id, limit, offset);
}
export async function get_reviews_for_place(place_id, limit, offset){
    const module = await loaded;
    // noinspection JSUnresolvedFunction
    return await module.get_reviews_for_place(place_id, limit, offset);
}
