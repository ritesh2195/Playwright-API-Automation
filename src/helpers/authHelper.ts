const config = require('../../config/config.json')
export class AuthHelper{
    static getAuthToken(){
        const email = config.email
        const apiKey = config.apiKey
        return Buffer.from(`${email}:${apiKey}`).toString('base64');
    }
}