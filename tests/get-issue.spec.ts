import { test, expect } from '@playwright/test';
import { IssueApi } from '../src/api/issueApi';

test('has title', async ({ request }) => {
  const issueApi = new IssueApi(request)
  const res = await issueApi.getIssue('RP-29')
  console.log(await res.json())
});

