import {get_cookie, set_cookie} from "./cookie";
import {JsAuthToken, JsPlace, JsReview, JsUserFull, JsUserPublic} from "client_side";
import {real_promise} from "./real_promise";

const cookie_name = "auth_token";

const loaded: Promise<typeof import("client_side")> = real_promise(async () => {
    const module = await import("client_side");
    await module.init();
    const cookie_val = get_cookie(cookie_name);
    if(cookie_val != null){
        module.set_token(JsAuthToken.from_string(cookie_val));
    }
    return module;
}).catch(r => {
    console.log("Could not connect to back-end server: " + r);
    alert("Could not connect to back-end server!");
    throw "Could not connect to back-end server: " + r;
});

export async function save_token(){
    const token = await get_token();
    if(token != undefined){
        set_cookie(cookie_name, token.to_string());
    }
}

export async function get_token(): Promise<JsAuthToken>{
    const module = await loaded;
    return module.get_token();
}
export async function set_token(token: JsAuthToken): Promise<void>{
    const module = await loaded;
    return module.set_token(token);
}

export async function login(username: string, password: string): Promise<void>{
    const module = await loaded;
    await module.login(username, password);
    await save_token();
}
export async function register_user(username: string, email: string, password: string): Promise<void>{
    const module = await loaded;
    await module.register_user(username, email, password);
    await save_token();
}
export async function change_password(username: string, old_password: string, new_password: string): Promise<void>{
    const module = await loaded;
    await module.change_password(username, old_password, new_password);
    await save_token();
}

export async function get_user_public_username(username: string): Promise<JsUserPublic>{
    const module = await loaded;
    return await module.get_user_public_username(username);
}
export async function get_user_public_id(id: number): Promise<JsUserPublic>{
    const module = await loaded;
    return await module.get_user_public_id(id);
}
export async function get_user_full(): Promise<JsUserFull>{
    const module = await loaded;
    return await module.get_user_full();
}
export async function search_user(search_string: string, limit: number, offset: number): Promise<Array<JsUserPublic>>{
    const module = await loaded;
    return await module.search_user(search_string, limit, offset);
}

export async function get_place(place_id: string): Promise<JsPlace>{
    const module = await loaded;
    return await module.get_place(place_id);
}

export async function add_review(place_id: string, review: number, review_text: string): Promise<number>{
    const module = await loaded;
    return await module.add_review(place_id, review, review_text);
}
export async function delete_review(review_id: number): Promise<void>{
    const module = await loaded;
    return await module.delete_review(review_id);
}
export async function get_review(review_id: number): Promise<JsReview>{
    const module = await loaded;
    return await module.get_review(review_id);
}
export async function get_reviews_for_user_username(username: string, limit: number, offset: number): Promise<Array<JsReview>>{
    const module = await loaded;
    return await module.get_reviews_for_user_username(username, limit, offset);
}
export async function get_reviews_for_user_id(id: number, limit: number, offset: number): Promise<Array<JsReview>>{
    const module = await loaded;
    return await module.get_reviews_for_user_id(id, limit, offset);
}
export async function get_reviews_for_place(place_id: string, limit: number, offset: number): Promise<Array<JsReview>>{
    const module = await loaded;
    return await module.get_reviews_for_place(place_id, limit, offset);
}
