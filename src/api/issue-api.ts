import {APIRequestContext, APIResponse} from '@playwright/test'
import { JiraApiEndpoint } from '../enums/jira-endpoints'
import { HeaderHelper } from '../helpers/header-helper'

const config = require('../../config/config.json')
export class IssueApi{
    private request:APIRequestContext
    private readonly url:string
    constructor(request:APIRequestContext){
        this.request = request
        this.url = config.url
    }

    async getIssue(issueId:string):Promise<APIResponse>{

        return await this.request.get(`${this.url+JiraApiEndpoint.ISSUE}/${issueId}`,{
            headers:HeaderHelper.issueRequestHeader()
        })
    }

    async createIssue(payload:any):Promise<APIResponse>{
        return await this.request.post(this.url+JiraApiEndpoint.ISSUE,{
            data:payload,
            headers:HeaderHelper.issueRequestHeader()
        })
    }

    async deleteIssue(id:string):Promise<APIResponse>{
        return await this.request.delete(`${this.url+JiraApiEndpoint.ISSUE}/${id}`,{
            headers:HeaderHelper.issueRequestHeader()
        })
    }
}