export function set_cookie(cname: string, cvalue: string): void {
    const date = new Date();
    date.setDate(new Date().getDate() + 1)
    const cookie = cname + "=" + cvalue + ";expires=" + date + ";path=/";
    console.log(cookie);
    document.cookie = cookie;
}
export function delete_cookie(cname: string): void{
    document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function get_cookie(cname: string): string {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}
