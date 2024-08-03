import { APIRequestContext } from "@playwright/test";
import { JiraApiEndpoint } from "../enums/jira-endpoints";
import { AuthHelper } from "../helpers/auth-helper";
import path from "path";
import fs from "fs";

const config = require('../../config/config.json')

export class AttachmentApi{
    private readonly request:APIRequestContext
    private readonly url:string

    constructor(request:APIRequestContext){
        this.request = request
        this.url = config.url
    }

    async addAttachment(issueId:string,fileName:string){

        const filePath = path.resolve(`${__dirname}/../test-data/`,fileName)

        const fileBuffer = fs.readFileSync(filePath)

        return await this.request.post(`${this.url+JiraApiEndpoint.ISSUE}/${issueId}/attachments`,{
            headers:{
                "Authorization":`Basic ${AuthHelper.getAuthToken()}`,
                "Content-Type":"multipart/form-data",
                "User-Agent":"abc",
                'X-Atlassian-Token': 'no-check',
            },
            multipart: {
                file: {
                  name: fileName,
                  mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  buffer: fileBuffer,
                }
              }
        })
    }
}