import {APIRequestContext, APIResponse} from '@playwright/test'
import { AuthHelper } from '../helpers/auth-helper'
import { JiraApiEndpoint } from '../enums/jira-endpoints'

const config = require('../../config/config.json')

export class CommentApi{
    private request:APIRequestContext
    private readonly url:string
    constructor(request:APIRequestContext){
        this.request = request
        this.url = config.url
    }

    async addComment(issueId:string,payload:any):Promise<APIResponse>{
        return await this.request.post(`${this.url+JiraApiEndpoint.ISSUE}/${issueId}/comment`,{
            data:payload,
            headers:{
                "Authorization":`Basic ${AuthHelper.getAuthToken()}`,
                "Content-Type":"application/json",
                "User-Agent":"abc",
                'X-Atlassian-Token': 'no-check',
            }
        })
    }

    async getComment(issueId:string,commentId:string):Promise<APIResponse>{
        return await this.request.get(`${this.url+JiraApiEndpoint.ISSUE}/${issueId}/comment/${commentId}`,{
            headers:{
                "Authorization":`Basic ${AuthHelper.getAuthToken()}`
            }
        })
    }

    async updateComment(commentId:string,payload:any):Promise<APIResponse>{
        return await this.request.put(`${this.url+JiraApiEndpoint.ISSUE}/${commentId}/comment`,{
            data:payload,
            headers:{
                "Authorization":`Basic ${AuthHelper.getAuthToken()}`,
                "Content-Type":"application/json",
                "User-Agent":"abc",
                'X-Atlassian-Token': 'no-check',
            }
        })
    }
}