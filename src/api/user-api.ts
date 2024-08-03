import { APIRequestContext, APIResponse } from "@playwright/test";
import { JiraApiEndpoint } from "../enums/jira-endpoints";
import { AuthHelper } from "../helpers/auth-helper";
import { HeaderHelper } from "../helpers/header-helper";

const config = require('../../config/config.json')
export class UserApi{
    private readonly request:APIRequestContext
    private url:string
    constructor(request:APIRequestContext){
        this.request = request
        this.url = config.url
    }

    async getUser(accountId:string):Promise<APIResponse>{
        return await this.request.get(`${this.url+JiraApiEndpoint.USER}?accountId=${accountId}`,{
            headers:HeaderHelper.issueRequestHeader()
        })
    }
}