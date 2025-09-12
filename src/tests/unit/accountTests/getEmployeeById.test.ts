import {accountServiceMongo} from "../../../services/AccountServiceMongoImpl.ts";
import {EmployeeModel} from "../../../model/EmployeeMongoModels.ts";

jest.mock("../../../model/EmployeeMongoModels.ts")
describe('AccountServiceMongoImpl.getEmployeeById', () => {
    const service = accountServiceMongo ;
    test('Failed test: employee not found', async ()=>{


        (EmployeeModel.findById as jest.Mock).mockReturnValue({
            exec: jest.fn().mockResolvedValue(null)
        });
        await expect(service.getEmployeeById("UNKNOUN")).rejects.toThrow('Employee with id UNKNOUN not found');

    })
    test('Passed test:', async () => {
        const mockEmployee = {
            _id: "123",
            firstName: "MockEmp",
            hash: "12345",
            lastName: "MOCK",
            roles: "crew",
            table_num: "tub_num"

        };
        (EmployeeModel.findById as jest.Mock).mockReturnValue({
            exec: jest.fn().mockResolvedValue(mockEmployee),
        });
        await expect(service.getEmployeeById('123')).resolves.toEqual(mockEmployee);
        expect(EmployeeModel.findById).toHaveBeenCalledWith('123');
    })
})