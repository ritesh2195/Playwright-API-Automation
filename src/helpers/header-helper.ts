import { AuthHelper } from "./auth-helper"

export class HeaderHelper{
    static issueRequestHeader(){
        return {
            "Authorization":`Basic ${AuthHelper.getAuthToken()}`,
            "Content-Type":"application/json",
            "User-Agent":"abc",
            'X-Atlassian-Token': 'no-check',
        }
    }
}