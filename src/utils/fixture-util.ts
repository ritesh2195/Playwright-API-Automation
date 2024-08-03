import { test as baseTest, request } from "@playwright/test";
import {IssueApi} from '../api/issue-api'
import { CommentApi } from "../api/comment-api";
import { UserApi } from "../api/user-api";

const test = baseTest.extend<{
    issueApi:IssueApi,
    commentApi:CommentApi,
    userApi:UserApi
}>({
    
    issueApi: async ({ request }, use) => {
        await use(new IssueApi(request));
    },
    commentApi: async ({ request }, use) => {
        await use(new CommentApi(request));
    },
    userApi:async ({request}, use)=>{
        await use(new UserApi(request));
    }
})

export default test;
export const expect = test.expect;