import test,{expect} from "../src/utils/fixture-util"
import {CreateIssuePayload} from '../src/test-data/create-issue-payload'

let id:string;
let storyId:string

test.beforeEach(async function({issueApi}){
    const response = await issueApi.createIssue(CreateIssuePayload.createStoryPayload())

    const jsonResponse = await response.json()

    storyId = jsonResponse.key
})

test('Create story verification',async function({issueApi}){

    const response = await issueApi.createIssue(CreateIssuePayload.createSubTaskPayload(storyId,'10016'))

    expect(201).toEqual(response.status())

    const jsonResponse = await response.json()

    const key = jsonResponse.key

    id = jsonResponse.id

    const getIssueResponse = await issueApi.getIssue(key)

    const getIssueJsonResponse = await getIssueResponse.json()

    expect(key).toEqual(getIssueJsonResponse.key)

    expect(id).toEqual(getIssueJsonResponse.id)

    expect('To Do').toEqual(getIssueJsonResponse.fields.status.name)

    expect(storyId).toEqual(getIssueJsonResponse.fields.parent.key)

    expect('New Defect').toEqual(getIssueJsonResponse.fields.summary)
})

test.afterEach(async function({issueApi}){
    
    const deleteResponse = await issueApi.deleteIssue(id)

    expect(204).toEqual(deleteResponse.status())
})