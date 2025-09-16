import {accountServiceMongo} from "../../../services/AccountServiceMongoImpl.js";
import {EmployeeModel} from "../../../model/EmployeeMongoModels.js";
import {SavedFiredEmployee} from "../../../model/Employee.js";

jest.mock("../../../model/EmployeeMongoModels.js")

describe('AccountServiceMongoImpl.getAllEmployees', () => {
    const service = accountServiceMongo;



    const mockEmployees:SavedFiredEmployee[] = [
        {
            _id: "222222222",
            firstName: "B",
            lastName: "B",
            table_num: "22360ddb-8b65-412e-9778-413b379a4717",
        },
        {
            _id: "333333333",
            firstName: "C",
            lastName: "C",
            table_num: "20cee615-a0d6-41cf-879d-457399330b1b",
        }
    ]

    test("Test failed: employees not found", async () => {
        (EmployeeModel.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValue(undefined)
            })
        });
        await expect(service.getAllEmployees()).rejects.toThrow("No employees found!");
    });
    test("Test passed: employees found", async () => {
        (EmployeeModel.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValue(mockEmployees)
            })
        });

       await expect(service.getAllEmployees()).resolves.toEqual(mockEmployees);
    });

})