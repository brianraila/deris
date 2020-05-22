## notice:
Due to my preferences and extended use of Postgres, I am forking this lib to use Postgres. 
I will continue making changes, but only when I can.

# deris
A ReJSON (Redis JSON) CRUD wrapper in for Deno (in Deno)


## How to use

`


import {Deris} from "https://raw.githubusercontent.com/brianraila/deris/master/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

const db = new Deris("localhost", 8890 );

await db.init();

let shortenURL = async function(longURL: string){
    
    let shortURL = v4.generate();
    shortURL = shortURL.substring(0,6);

    let data = {shortURL, longURL}
    let res = await db.save(JSON.stringify(data), shortURL);

    console.log(res);
    return shortURL;

}

let getLongURL = async function(shortURL: string){

    let res = await db.get(shortURL, '.longURL');
    console.log(res);

}


let short = await shortenURL("https://deno.land/std/uuid/mod.ts")

db.update(short, ".updatedAt" , JSON.stringify(Date.now()))

//Get the JSON stored
let data = await getLongURL(short); 
console.log(data);

//Parse it to a Javascript object or just log it
long = JSON.parse(long);


console.log(long);
// "https://deno.land/std/uuid/mod.ts" 





`


<!-- const deris = new Deris(REDIS_HOST, REDIS_PORT);

await deris.init();


// await deris.save(JSON.stringify({name:"Brian", subject:"Tutorials"}));


let data = await deris.get("5f9c6cbb-4a1a-4662-a85d-639d4e3a4360")


console.log(data) -->
