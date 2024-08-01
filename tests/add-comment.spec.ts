import test,{expect} from "../src/utils/fixture-util"
import {CreateIssuePayload} from '../src/test-data/create-issue-payload'
import { CommentPayload } from "../src/test-data/comment-payload"

let bugId:string;
let commentId:string;
test.beforeEach(async function({issueApi}){
    const response = await issueApi.createIssue(CreateIssuePayload.createBugPayload());

    const jsonResponse = await response.json();

    bugId = jsonResponse.id;
})

test('Add comment verification',async function({commentApi}){

    const response = await commentApi.addComment(bugId,CommentPayload.createCommentPayload());

    expect(201).toEqual(response.status());

    const jsonResponse = await response.json();

    commentId = jsonResponse.id;

    const getCommentResponse = await commentApi.getComment(bugId,commentId);

    expect(200).toEqual(getCommentResponse.status());

    const getCommentJsonResponse = await getCommentResponse.json();

    expect(commentId).toEqual(getCommentJsonResponse.id);

    expect('Add comment').toEqual(getCommentJsonResponse.body)
})

test.afterEach(async function({issueApi}){
    
    const deleteResponse = await issueApi.deleteIssue(bugId);

    expect(204).toEqual(deleteResponse.status());
})