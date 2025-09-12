import {accountServiceMongo} from "../../../services/AccountServiceMongoImpl.js";
import {EmployeeModel, FiredEmployeeModel} from "../../../model/EmployeeMongoModels.js";
import {convertEmployeeToFiredEmployee} from "../../../utils/tools.js";
import {Employee} from "../../../model/Employee.js";
jest.mock("../../../model/EmployeeMongoModels.js")
jest.mock("../../../utils/tools.js")

describe("AccountServiceMongoImpl.fireEmployee", () => {
    const service = accountServiceMongo;
    const mockEmployee = {
        _id: "123",
        firstName: "MockEmp",
        hash: "12345",
        lastName: "MOCK",
        roles: "crew",
        table_num: "tub_num"

    };
    const mockFiredEmployee = {
        firstName: "MockEmp",
        lastName: "MOCK",
        _id: "123",
        table_num:"tub_num",
        fireDate: "now"
    }
    test("Test failed: employee not exists", () => {
        (EmployeeModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null)
        expect(service.fireEmployee('321')).rejects.toThrow(`Employee with id 321 not found`)
        expect(EmployeeModel.findByIdAndDelete).not.toHaveBeenCalledWith("123");
    });
    test("Test passed", async () => {
        (EmployeeModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockEmployee);
        (convertEmployeeToFiredEmployee as jest.Mock).mockReturnValue(mockFiredEmployee);
        (FiredEmployeeModel as unknown as jest.Mock).mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(mockFiredEmployee),
        }));
        await expect(service.fireEmployee('123')).resolves.toEqual(mockFiredEmployee);
        expect(EmployeeModel.findByIdAndDelete).toHaveBeenCalledWith("123");
        expect(convertEmployeeToFiredEmployee).toHaveBeenCalledWith(mockEmployee as Employee);
       expect(FiredEmployeeModel).toHaveBeenCalledWith(mockFiredEmployee);
    });

})