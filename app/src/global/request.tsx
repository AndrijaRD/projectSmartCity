export default async function request(url: string, methode: "GET" | "POST" | "PUT" | "DELETE" = "GET", data = {}): Promise<any> {
    const config: any = {
        method: methode,
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    }
    if(methode !== "GET") config['body'] = JSON.stringify(data)
    const res = await fetch(url, config)
    return res.json();
}