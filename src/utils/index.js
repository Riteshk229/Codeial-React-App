export * from './constants'


// on login store the token
export const setItemInLocalStorage = (key,value) => {
    if (!key || !value) {
        return console.error("Cannot Store in Local Storage");
    }
    
    const valueToStore =
        typeof value != 'string' ? JSON.stringify(value) : value;
    
    localStorage.setItem(key, valueToStore);
}


// on refresh get the token
export const getItemInLocalStorage = (key) => {
    if (!key) {
        return console.error("Cannot get the value from Local Storage");
    }

    localStorage.getItem(key);
}

// on log out remove the token
export const removeItemFromLocalStorage = (value, key) => {
    if (!key) {
        return console.error("Cannot get the value from Local Storage");
    }
    
    localStorage.removeItem(key);
}


{ username: "Ritesh"; password: '123123'}
export const getFormBody = (params) => {
    let formBody = [];
    for (let property in params) {
        let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
        let encodedValue = encodeURIComponent(params[property]);// Ritesh 123=> Ritesh%2020123

        formBody.push(encodedKey + '=' + encodedValue); 
    }

    return formBody.join('&');// username=Ritesh&password=12123
}