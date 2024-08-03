# Jira API Automation

This project automates interactions with the Jira API, including operations on issues, users, and comments. It uses Playwright for API requests and TypeScript for implementation.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Issue API](#issue-api)
  - [User API](#user-api)
  - [Comment API](#comment-api)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```bash
   https://github.com/ritesh2195/Jira-API-Playwright-Automation.git
   cd jira-api-automation
2. **Install dependencies:**

   ```bash
   npm install
3. **Install dependencies:**
  Create a config.json file in the config directory and add your Jira API URL and credentials:
  ```json
{
  "url": "https://your-jira-instance.atlassian.net",
  "username": "your-username",
  "apiToken": "your-api-token"
}
