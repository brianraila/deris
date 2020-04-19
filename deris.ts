//BEWARE. THIS IS AN EXPERIMENT. BUT IT WORKS

import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { connect } from "https://denopkg.com/keroxp/deno-redis/mod.ts";

let hostname = "127.0.0.1";
let port:number = 6379;

// Initialize Connection to Redis 
const redis = await connect({hostname: hostname, port: port});

class Deris {


    constructor() {

    }
 
    async save(payload: string, id: null | string = null ) {
        //If an object id is not provided automatically generate a UUID4 string for the object id.
        
        if(!id){
            id = v4.generate();
        }
        let method:string = "data.save"
        payload = JSON.parse(payload);
        
        let replies = await redis.executor.exec("JSON.SET", id, ".", JSON.stringify(payload));
        console.log(`db ${method} response: `, replies);
        console.log(`Document ${id} saved`);

        return id;
    }

    // retrieve data in the database
    async get(id: string, path: string | null = null ){

        let method = "data.get"; 
        if(!path){
            path = '.'
        }
        let replies = await redis.executor.exec("JSON.GET", id, path );

        let dt = replies[1];
        console.log(`db ${method} @ ${id} Response: `);
        let data = dt?.toString();
        // console.log(data);

        return data;
    }

    async update(id: string, path: string | null = null, payload: string){

        let p:any = path;
        let method:string = "data.update"

        let pl = JSON.parse(payload);
        payload = JSON.stringify(pl);

        if(!path){
            p = ".";
        }

        let replies = await redis.executor.exec("JSON.SET", id, p, payload );
        
        console.log(`db ${method} response: `, replies);
        return id;

    }

    async delete(id: string, path: string | null  = null){

        let p: any = path;
        if (!path){
            p = ".";
        }
        let method:string = "data.update";
        
        let replies = await redis.executor.exec("JSON.DEL", id, p);
        console.log(replies);
        if (replies[1] == 0){
            console.log(`Document ${id} not found`)
        }else{
            console.log(`Document ${id} deleted`)
        }



    }

}

export {Deris}
