import { APIRequestContext, APIResponse } from "@playwright/test";
import { JiraApiEndpoint } from "../enums/jira-endpoints";
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

    async createUser(payload:any):Promise<APIResponse>{
        return await this.request.get(`${this.url+JiraApiEndpoint.USER}`,{
            headers:HeaderHelper.issueRequestHeader(),
            data:payload
        })
    }

    async deleteUser(accountId:string){
        return await this.request.delete(`${this.url+JiraApiEndpoint.USER}?accountId=${accountId}`,{
            headers:HeaderHelper.issueRequestHeader()
        })
    }
}