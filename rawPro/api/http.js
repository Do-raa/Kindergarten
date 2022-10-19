




export async function registerUser(inputValues){
    
        try{
        const response =  await fetch('https://www.api.rawdhati.tn/users/register', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json", 
            "Authorization": "token",
        }, 
        body: JSON.stringify({...inputValues}) 
         
        }) 
       //const result =  await response.json();
       const jsonValue = JSON.stringify(response)
       console.log(jsonValue)   
    }     
    catch(error) { 
        console.error(error);
        }
}


export async function loginUser(email, password){
   
    try{
      const res = await fetch('https://www.api.rawdhati.tn//users/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json",
        }, 
        body: JSON.stringify({email: email, password: password}) 
        
    }); 
    const response = await res.json()
    console.log(response) 
    }
    catch(error) { 
         console.error(error);
         console.log( "Unauthorized");
    }
   
}