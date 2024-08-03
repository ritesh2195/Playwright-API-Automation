import test,{expect} from "../src/utils/fixture-util"

const user = JSON.parse(JSON.stringify(require('../src/test-data/user-info.json')))
test.describe('Get User Validation',()=>{

    test('Get user validation with valid account id',async function({userApi}){
        const userResponse = await userApi.getUser(user.accountId)

        expect(200).toEqual(userResponse.status())

        const userJsonResponse = await userResponse.json()

        expect(user.accountId).toEqual(userJsonResponse.accountId)

        expect(user.emailId).toEqual(userJsonResponse.emailAddress)

        expect(user.name.toUpperCase()).toEqual(userJsonResponse.displayName)
    })

    test('Get user validation with invalid account id', async function({userApi}){

        const userResponse = await userApi.getUser('abchsuss')

        expect(404).toEqual(userResponse.status())

        const userJsonResponse = await userResponse.json()

        expect('Specified user does not exist or you do not have required permissions')
        .toEqual(userJsonResponse.errorMessages[0])
    })
})