# Jira API Automation

This project automates interactions with the Jira API, including operations on issues, users, and comments. It uses Playwright for API requests and TypeScript for implementation.

## Table of Contents
- [Project Overview](#project-overview)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Issue API](#issue-api)
  - [User API](#user-api)
  - [Comment API](#comment-api)
- [Test Reporting](#test-reporting)
## Project Overview
Jira API Automation provides a streamlined and efficient way to interact with Jira's REST API. The main features include:

- **Issue Management**: Autonate Create, fetch, and delete Jira issues.
- **User Management**: Automate user-related operations.
- **Comment Management**: Automate add and fetch comments on Jira issues.
## Installation
1. **Clone the repository:**
```bash
https://github.com/ritesh2195/Jira-API-Playwright-Automation.git
```
2. **Install dependencies:**

   ```bash
   npm install
## Configuration
  Create a config.json file in the config directory and add your Jira API URL and credentials:
  ```json
{
  "url": "https://your-jira-instance.atlassian.net",
  "username": "your-username",
  "apiToken": "your-api-token"
}
```
## Usage
**Authentication**

The project uses Basic Authentication to interact with the Jira API. Authentication details are passed through HTTP headers. Below is an example of setting up the authentication headers:

**1. Generate Token using Buffer class and convert in base64**
```javascript
const config = require('../../config/config.json')
export class AuthHelper{
    static getAuthToken(){
        const email = config.email
        const apiKey = config.apiKey
        return Buffer.from(`${email}:${apiKey}`).toString('base64');
    }
}
```
**2. Passing token in header**
```javascript
import { AuthHelper } from "./auth-helper"

export class HeaderHelper{
    static issueRequestHeader(){
        return {
            "Authorization":`Basic ${AuthHelper.getAuthToken()}`,
            "Content-Type":"application/json",
            "User-Agent":"abc",
            'X-Atlassian-Token': 'no-check',
        }
    }
}
```
**IssueApi Class**

The IssueApi class provides methods to interact with Jira issues. Below is the implementation of the IssueApi class:
```javascript
import { APIRequestContext, APIResponse } from '@playwright/test';
import { JiraApiEndpoint } from '../enums/jira-endpoints';
import { HeaderHelper } from '../helpers/header-helper';

const config = require('../../config/config.json');

export class IssueApi {
    private request: APIRequestContext;
    private readonly url: string;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.url = config.url;
    }

    async getIssue(issueId: string): Promise<APIResponse> {
        return await this.request.get(`${this.url + JiraApiEndpoint.ISSUE}/${issueId}`, {
            headers: HeaderHelper.issueRequestHeader()
        });
    }

    async createIssue(payload: any): Promise<APIResponse> {
        return await this.request.post(this.url + JiraApiEndpoint.ISSUE, {
            data: payload,
            headers: HeaderHelper.issueRequestHeader()
        });
    }

    async deleteIssue(id: string): Promise<APIResponse> {
        return await this.request.delete(`${this.url + JiraApiEndpoint.ISSUE}/${id}`, {
            headers: HeaderHelper.issueRequestHeader()
        });
    }
}

```
**Create Issue**

Fetch details of a specific Jira issue by calling createIssue method from IssueApi class and validate the created issue using getIssue:
```javascript
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
```
## Other APIs
Other APIs, such as UserApi and CommentApi, can be used similarly to the IssueApi. Create instances of these classes and call their methods as shown in the IssueApi examples.
## Test Reporting
This project uses Allure Report to generate detailed test reports. Follow these steps to generate and view reports:

**1. Install Allure command-line tool:**
```bash
npm install -g allure-commandline
``` 
**2. Configure allure report in playwright.config.ts:**
```javascript
 reporter: [
    ['allure-playwright']
  ],
```
**3. Generate and open the report:**
```bash
allure serve
```
## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.

2. Create a new branch (git checkout -b feature-branch).

3. Make your changes.

4. Commit your changes (git commit -m 'Add some feature').

5. Push to the branch (git push origin feature-branch).

6. Open a pull request.
