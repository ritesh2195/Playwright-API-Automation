import {APIRequestContext, APIResponse} from '@playwright/test'
import { AuthHelper } from '../helpers/auth-helper'
import { JiraApiEndpoint } from '../enums/jira-endpoints'

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
            headers:{
                "Authorization":`Basic ${AuthHelper.getAuthToken()}`
            }
        })
    }

    async createIssue(payload:any):Promise<APIResponse>{
        return await this.request.post(this.url+JiraApiEndpoint.ISSUE,{
            data:payload,
            headers:{
                "Authorization":`Basic ${AuthHelper.getAuthToken()}`,
                "Content-Type":"application/json",
                "User-Agent":"abc",
                'X-Atlassian-Token': 'no-check',
            }
        })
    }

    async deleteIssue(id:string):Promise<APIResponse>{
        return await this.request.delete(`${this.url+JiraApiEndpoint.ISSUE}/${id}`,{
            headers:{
                "Authorization":`Basic ${AuthHelper.getAuthToken()}`
            }
        })
    }
}