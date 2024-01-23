import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';


//the goal here is to contain a couple of functions that we reuse over and over in the project


const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};



 //function getJSON
 //will do the fetching and also converting to JSON all in one step
 export const getJSON = async function(url) {
    try {
        // 1) loading recipe
        //HERE WE JUST NEED TO GET THIS id FROM ANYWHERE THATS WHY WE PPASS THE ID IN THE export const loadRecipe = async function (id) 
        

        const fetchPro = fetch(url);

        //ten seconds that i i have in config.js
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

        const data = await res.json();
    
        if(!res.ok) throw new Error(`${data.message} (${res.status})`);
        //this data will become the resolved value of this promise
        return data;  

    } catch(err) {
       //instead of console.log(err) with that way i handle the error in the model with the re-throw the error below with
       throw err;
    }
 

 };
