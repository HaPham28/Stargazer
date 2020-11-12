export function real_promise<T>(func: () => Promise<T>): Promise<T>{
    return new Promise(async (resolve, reject) => {
        try{
            resolve(await func());
        }
        catch(e){
            reject(e);
        }
    })
}
