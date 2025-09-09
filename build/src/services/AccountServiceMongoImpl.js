import { EmployeeModel, FiredEmployeeModel } from "../model/EmployeeMongoModels.js";
import { HttpError } from "../errorHandler/HttpError.js";
import { checkFiredEmployees, checkRole, convertEmployeeToFiredEmployee } from "../utils/tools.js";
class AccountServiceMongoImpl {
    changePassword(empId, newPassword) {
        throw "Not Implemented yet";
    }
    async fireEmployee(empId) {
        const temp = await EmployeeModel.findByIdAndDelete(empId);
        if (!temp)
            throw new HttpError(404, `Employee with id ${empId} not found`);
        const fired = convertEmployeeToFiredEmployee(temp);
        const firedDoc = new FiredEmployeeModel(fired);
        await firedDoc.save();
        return fired;
    }
    async getAllEmployees() {
        const result = await EmployeeModel.find({}).exec();
        return result;
    }
    async getEmployeeById(id) {
        const employee = await EmployeeModel.findById(id).exec();
        if (!employee)
            throw new HttpError(404, `Employee with id ${id} not found`);
        return employee;
    }
    async hireEmployee(employee) {
        const temp = await EmployeeModel.findById(employee._id).exec();
        if (temp)
            throw new HttpError(409, `Employee with id ${employee._id} already exists`);
        await checkFiredEmployees(employee._id);
        const empDoc = new EmployeeModel(employee);
        await empDoc.save();
        return employee;
    }
    async setRole(id, newRole) {
        const emp = await this.getEmployeeById(id);
        const role = checkRole(newRole);
        const updated = await EmployeeModel.findOneAndUpdate({ id }, {
            $set: { roles: newRole }
        }, { new: true }).exec();
        if (!updated)
            throw new HttpError(500, "Employee updating failed!");
        return updated;
    }
    updateEmployee(empId, employee) {
        throw "Not Implemented yet";
    }
}
export const accountServiceMongo = new AccountServiceMongoImpl();
