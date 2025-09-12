import {accountServiceMongo} from "../../../services/AccountServiceMongoImpl.ts";
import {EmployeeModel} from "../../../model/EmployeeMongoModels.ts";

jest.mock("../../../model/EmployeeMongoModels.ts")
describe('AccountServiceMongoImpl.getEmployeeById', () => {
    test('Failed test: employee not found', async ()=>{

        const service = accountServiceMongo ;
        (EmployeeModel.findById as jest.Mock).mockResolvedValue(null)
        await expect(service.getEmployeeById("UNKNOUN")).rejects.toThrow('Employee with id UNKNOUN not found');

    })
})