import test,{expect} from "../src/utils/fixture-util"
import {CreateIssuePayload} from '../src/test-data/create-issue-payload'

let id:string
test('verify created issue',async function({issueApi}){

    const response = await issueApi.createIssue(JSON.stringify(CreateIssuePayload.createBugPayload()))

    const jsonResponse = await response.json()

    expect(response.status()).toEqual(201)

    expect(jsonResponse.key).toContain('RP')

    const key = jsonResponse.key

    id = jsonResponse.id

    const getIssueResponse = await issueApi.getIssue(key)

    const getIssueJsonResponse = await getIssueResponse.json()

    expect(key).toEqual(getIssueJsonResponse.key)

    expect(id).toEqual(getIssueJsonResponse.id)

    expect('To Do').toEqual(getIssueJsonResponse.fields.status.name)

    expect('Button is not clickable').toEqual(getIssueJsonResponse.fields.summary)
})

test.afterEach(async function({issueApi}){
    const deleteResponse = await issueApi.deleteIssue(id)

    expect(204).toEqual(deleteResponse.status())
})