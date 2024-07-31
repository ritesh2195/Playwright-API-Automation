import test, { expect } from "../src/utils/fixtureUtil";
import { CreateIssuePayload } from "../src/test-data/createIssuePayload";

let id:string;
test('Create story verification',async function({issueApi}){

    const response = await issueApi.createIssue(CreateIssuePayload.createStoryPayload())

    expect(201).toEqual(response.status())

    const jsonResponse = await response.json()

    const key = jsonResponse.key

    id = jsonResponse.id

    const getIssueResponse = await issueApi.getIssue(key)

    const getIssueJsonResponse = await getIssueResponse.json()

    expect(key).toEqual(getIssueJsonResponse.key)

    expect(id).toEqual(getIssueJsonResponse.id)

    expect('To Do').toEqual(getIssueJsonResponse.fields.status.name)

    expect('Login page functionality').toEqual(getIssueJsonResponse.fields.summary)
})

test.afterEach(async function({issueApi}){
    const deleteResponse = await issueApi.deleteIssue(id)

    expect(204).toEqual(deleteResponse.status())
})