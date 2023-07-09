export * from './constants'


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