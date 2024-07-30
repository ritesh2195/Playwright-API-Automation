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
}