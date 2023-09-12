class Api {
    constructor(url){
        if(!url) throw new Error("No se providenció ninguna url");
        this.url = url;
        this.headers = {};
        this.headers["Content-Type"] = "application/json";
    }
    setHeader(key, value){
        this.headers[key] = value;
    }
    async #gd(route, method){
        let url = this.url;
        if(route) {
            url += route;
        }
        try {
            const response = await fetch(url, {
                method: method,
                headers: this.headers
            });
            let res = await response.json();
            if(response.status < 200 || response.status >= 300){
                return {
                    status: response.status,
                    error: res.error
                }
            }
            res.status = response.status;
            return res;
        } catch(err){
            console.log(err);
            return {
                status: 500,
                error: err
            }
        }
    }
    async #pp(route, data, method){
        let url = this.url;
        if(route) {
            url += route;
        }
        try {
            const response = await fetch(url, {
                method: method,
                headers: this.headers,
                body: JSON.stringify(data)
            });
            let res = await response.json();
            if(response.status < 200 || response.status >= 300){
                return {
                    status: response.status,
                    error: res.error
                }
            }
            res.status = response.status;
            return res;
        } catch(err){
            console.log(err);
        }
    }
    async get(route){
        return await this.#gd(route, "GET");
    }
    async delete(route){
        return await this.#gd(route, "DELETE");
    }
    async post(route, data){
        return await this.#pp(route, data, "POST");
    }
    async put(route, data){
        return await this.#pp(route, data, "PUT");
    }
}

export default Api;