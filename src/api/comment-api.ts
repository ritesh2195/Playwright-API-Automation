import {APIRequestContext, APIResponse} from '@playwright/test'
import { JiraApiEndpoint } from '../enums/jira-endpoints'
import { HeaderHelper } from '../helpers/header-helper'

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
            headers:HeaderHelper.issueRequestHeader()
        })
    }

    async getComment(issueId:string,commentId:string):Promise<APIResponse>{
        return await this.request.get(`${this.url+JiraApiEndpoint.ISSUE}/${issueId}/comment/${commentId}`,{
            headers:HeaderHelper.issueRequestHeader()
        })
    }

    async updateComment(commentId:string,payload:any):Promise<APIResponse>{
        return await this.request.put(`${this.url+JiraApiEndpoint.ISSUE}/${commentId}/comment`,{
            data:payload,
            headers:HeaderHelper.issueRequestHeader()
        })
    }
}