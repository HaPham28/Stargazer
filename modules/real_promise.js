export function real_promise(func){
    return new Promise(async (resolve, reject) => {
        try{
            resolve(await func());
        }
        catch(e){
            reject(e);
        }
    })
}
