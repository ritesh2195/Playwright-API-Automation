import { faker } from '@faker-js/faker';

export class CreateIssuePayload{

    static createBugPayload(){
        const randomSummary = faker.lorem.sentence()
        const randomDescription = faker.lorem.paragraph()

        return {
            fields:{
                project:{
                    key:'RP'
                },
                summary:randomSummary,
                description:randomDescription,
                issuetype:{
                    name:'Bug'
                }
            }
        }
    }
}