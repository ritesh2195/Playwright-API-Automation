export class CreateIssuePayload{

    static createBugPayload(){
        return {
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
    }

    static createStoryPayload(){
        return {
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
    }

    static createSubTaskPayload(key:string,subTaskId:string){
        return {
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
                id:subTaskId
              }
            }
          }
    }
}