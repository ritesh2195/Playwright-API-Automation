import test, { expect } from "@playwright/test";
import { IssueApi } from "../src/api/issueApi";
import { CreateIssuePayload } from "../src/test-data/createIssuePayload";

test('verify created issue',async function({request}){

    const issueApi = new IssueApi(request)

    const response = await issueApi.createIssue(JSON.stringify(CreateIssuePayload.createBugPayload()))

    const jsonResponse = await response.json()

    expect(response.status()).toEqual(201)

    expect(jsonResponse.key).toContain('RP')
})