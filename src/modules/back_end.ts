import {delete_cookie, get_cookie, set_cookie} from "./cookie";
import {real_promise} from "./real_promise";
import {import_client_side} from "./back_end_bootstrap";

const cookie_name = "auth_token";

const loaded: Promise<typeof import("client_side")> = real_promise(async () => {
    const module = await import_client_side();
    await module.init();
    const cookie_val = get_cookie(cookie_name);
    if(cookie_val != null){
        module.set_token(module.JsAuthToken.from_string(cookie_val));
        try{
            await module.get_favorite_places(1, 0);
        }
        catch (e){
            module.set_token(null);
        }
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
    else{
        delete_cookie(cookie_name);
    }
}

export async function get_token(): Promise<import("client_side").JsAuthToken>{
    const module = await loaded;
    return module.get_token();
}
export async function set_token(token: import("client_side").JsAuthToken): Promise<void>{
    const module = await loaded;
    const out = module.set_token(token);
    await save_token();
    return out;
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
export async function delete_user(username: string, password: string): Promise<void>{
    const module = await loaded;
    await module.delete_user(username, password);
}

export async function get_user_public_username(username: string): Promise<import("client_side").JsUserPublic>{
    const module = await loaded;
    return await module.get_user_public_username(username);
}
export async function get_user_public_id(id: number): Promise<import("client_side").JsUserPublic>{
    const module = await loaded;
    return await module.get_user_public_id(id);
}
export async function get_user_full(): Promise<import("client_side").JsUserFull>{
    const module = await loaded;
    const out = await module.get_user_full();
    await save_token();
    return out;
}
export async function search_user(search_string: string, limit: number, offset: number): Promise<Array<import("client_side").JsUserPublic>>{
    const module = await loaded;
    return await module.search_user(search_string, limit, offset);
}

export async function get_place(place_id: string): Promise<import("client_side").JsPlace>{
    const module = await loaded;
    return await module.get_place(place_id);
}

export async function add_review(place_id: string, review: number, review_text: string): Promise<number>{
    const module = await loaded;
    const out = await module.add_review(place_id, review, review_text);
    await save_token();
    return out;
}
export async function delete_review(review_id: number): Promise<void>{
    const module = await loaded;
    const out = await module.delete_review(review_id);
    await save_token();
    return out;
}
export async function get_review(review_id: number): Promise<import("client_side").JsReview>{
    const module = await loaded;
    const out = await module.get_review(review_id);
    await save_token();
    return out;
}
export async function get_reviews_for_user_username(username: string, limit: number, offset: number): Promise<Array<import("client_side").JsReview>>{
    const module = await loaded;
    const out = await module.get_reviews_for_user_username(username, limit, offset);
    await save_token();
    return out;
}
export async function get_reviews_for_user_id(id: number, limit: number, offset: number): Promise<Array<import("client_side").JsReview>>{
    const module = await loaded;
    const out = await module.get_reviews_for_user_id(id, limit, offset);
    await save_token();
    return out;
}
export async function get_reviews_for_place(place_id: string, limit: number, offset: number): Promise<Array<import("client_side").JsReview>>{
    const module = await loaded;
    const out = await module.get_reviews_for_place(place_id, limit, offset);
    await save_token();
    return out;
}

export async function add_favorite_place(place_id: string): Promise<void>{
    const module = await loaded;
    const out = await module.add_favorite_place(place_id);
    await save_token();
    return out;
}
export async function remove_favorite_place(place_id: string): Promise<void>{
    const module = await loaded;
    const out = await module.remove_favorite_place(place_id);
    await save_token();
    return out;
}
export async function get_favorite_places(limit: number, offset: number): Promise<void>{
    const module = await loaded;
    const out = await module.get_favorite_places(limit, offset);
    await save_token();
    return out;
}
