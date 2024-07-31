import { test as baseTest } from "@playwright/test";
import { IssueApi } from "../api/issueApi";

const test = baseTest.extend<{
    issueApi:IssueApi
}>({
    
    issueApi: async ({ request }, use) => {
        await use(new IssueApi(request));
    }
})

export default test;
export const expect = test.expect;