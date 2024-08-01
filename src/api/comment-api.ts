import {APIRequestContext, APIResponse} from '@playwright/test'
import { AuthHelper } from '../helpers/auth-helper'

const config = require('../../config/config.json')

export class CommentApi{
    private request:APIRequestContext
    private readonly url:string
    constructor(request:APIRequestContext){
        this.request = request
        this.url = config.url
    }

    async addComment(issueId:string,payload:any):Promise<APIResponse>{
        return await this.request.post(`${this.url}/${issueId}/comment`,{
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
        return await this.request.get(`${this.url}/${issueId}/comment/${commentId}`,{
            headers:{
                "Authorization":`Basic ${AuthHelper.getAuthToken()}`
            }
        })
    }

    async updateComment(commentId:string,payload:any):Promise<APIResponse>{
        return await this.request.put(`${this.url}/${commentId}/comment`,{
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