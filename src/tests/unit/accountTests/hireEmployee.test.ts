import {accountServiceMongo} from "../../../services/AccountServiceMongoImpl.js";
import {EmployeeModel} from "../../../model/EmployeeMongoModels.js";
import {Employee} from "../../../model/Employee.js";
import {checkFiredEmployees} from "../../../utils/tools.js";

jest.mock("../../../model/EmployeeMongoModels.ts");
jest.mock("../../../utils/tools.js")

describe("AccountServiceMongoImpl.hireEmployee", () => {
    const service = accountServiceMongo;
    const mockEmployee = {
        _id: "123",
        firstName: "MockEmp",
        hash: "12345",
        lastName: "MOCK",
        roles: "crew",
        table_num: "tub_num"

    };
    //====1. Employee already exists===
    test("Failed test: Employee already exists", () => {
        (EmployeeModel.findById as jest.Mock).mockReturnValue({
            exec: jest.fn().mockReturnValue(mockEmployee),
        });
        expect(service.hireEmployee(mockEmployee as Employee))
            .rejects.toThrow(`Employee with id ${mockEmployee._id} already exists`);
        expect(EmployeeModel.findById).toHaveBeenCalledWith(mockEmployee._id);
    });

    test("Failed test: Employee was fired early", async () => {
        (EmployeeModel.findById as jest.Mock).mockReturnValue({
            exec: jest.fn().mockReturnValue(null),
        });
        (checkFiredEmployees as jest.Mock).mockRejectedValue(new Error('mock Error'));
        await expect(service.hireEmployee(mockEmployee as Employee)).rejects.toThrow('mock Error');
        expect(EmployeeModel.findById).toHaveBeenCalledWith(mockEmployee._id);
        expect(checkFiredEmployees).toHaveBeenCalledWith(mockEmployee._id);
    })
    test("Passed test", async () => {
        (EmployeeModel.findById as jest.Mock).mockReturnValue({
            exec: jest.fn().mockResolvedValue(null),
        });
        (checkFiredEmployees as jest.Mock).mockResolvedValue(undefined);
        (EmployeeModel as unknown as jest.Mock).mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(mockEmployee)
        }));

        const result = await service.hireEmployee(mockEmployee as Employee);
        expect(EmployeeModel.findById).toHaveBeenCalledWith(mockEmployee._id);
        expect(checkFiredEmployees).toHaveBeenCalledWith(mockEmployee._id);
        expect(result).toEqual(mockEmployee);
    })
})