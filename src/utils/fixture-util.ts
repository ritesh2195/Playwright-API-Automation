import { test as baseTest } from "@playwright/test";
import {IssueApi} from '../api/issue-api'
import { CommentApi } from "../api/comment-api";

const test = baseTest.extend<{
    issueApi:IssueApi,
    commentApi:CommentApi
}>({
    
    issueApi: async ({ request }, use) => {
        await use(new IssueApi(request));
    },
    commentApi: async ({ request }, use) => {
        await use(new CommentApi(request));
    }
})

export default test;
export const expect = test.expect;