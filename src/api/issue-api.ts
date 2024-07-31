import {APIRequestContext} from '@playwright/test'
import { AuthHelper } from '../helpers/auth-helper'

const config = require('../../config/config.json')
export class IssueApi{
    private request:APIRequestContext
    private readonly url:string
    constructor(request:APIRequestContext){
        this.request = request
        this.url = config.url
    }

    async getIssue(issueId:string){

        return await this.request.get(`${this.url}/${issueId}`,{
            headers:{
                "Authorization":`Basic ${AuthHelper.getAuthToken()}`
            }
        })
    }

    async createIssue(payload:any){
        return await this.request.post(this.url,{
            data:payload,
            headers:{
                "Authorization":`Basic ${AuthHelper.getAuthToken()}`,
                "Content-Type":"application/json",
                "User-Agent":"abc",
                'X-Atlassian-Token': 'no-check',
            }
        })
    }

    async deleteIssue(id:string){
        return await this.request.delete(`${this.url}/${id}`,{
            headers:{
                "Authorization":`Basic ${AuthHelper.getAuthToken()}`
            }
        })
    }
}