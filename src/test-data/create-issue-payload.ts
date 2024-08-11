import { IssueModel } from "../models/issue-model"


export class CreateIssuePayload{

    static createBugPayload():IssueModel{
        const issuePayload:IssueModel = {
            fields:{
                project:{
                    key:'RP'
                },
                summary:'Button is not clickable',
                description:'Button is not clickable',
                issuetype:{
                    name:'Bug'
                }
            }
        }

        return issuePayload
    }

    static createStoryPayload():IssueModel{
        const storyPayload:IssueModel =  {
            fields:{
                project:{
                    key:'RP'
                },
                summary:'Login page functionality',
                description:'Implement login page functionality',
                issuetype:{
                    name:'Story'
                }
            }
        }

        return storyPayload
    }

    static createSubTaskPayload(key:string,subTaskId:string):IssueModel{
        const subtaskPayload:IssueModel =  {
            fields: {
              project: {
                key: "RP"
              },
              parent: {
                key: key
              },
              summary: "New Defect",
              description: "Defect description",
              issuetype: {
                name:subTaskId
              }
            }
          }

          return subtaskPayload
    }
}