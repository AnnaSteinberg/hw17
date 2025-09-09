import { convertEmployeeDtoToEmployee } from "../utils/tools.js";
import { accountServiceMongo } from "../services/AccountServiceMongoImpl.js";
const service = accountServiceMongo;
export const setRole = (req, res, next) => {
};
export const getEmployeeById = async (req, res, next) => {
    const query_id = req.query.id;
    const result = await service.getEmployeeById(query_id);
};
export const getAllEmployees = async (req, res, next) => {
    const result = await service.getAllEmployees();
    res.json(result);
};
export const updatePassword = (req, res, next) => {
};
export const updateEmployee = async (req, res, next) => {
    const body = req.body;
    const query_id = req.query.id;
    const result = await service.updateEmployee(query_id, body);
    res.json(result);
};
export const fireEmployee = async (req, res, next) => {
    const query_id = req.query.id;
    const result = await service.fireEmployee(query_id);
    res.json(result);
};
export const hireEmployee = async (req, res, next) => {
    const body = req.body;
    const emp = convertEmployeeDtoToEmployee(body);
    const result = await service.hireEmployee(emp);
    res.status(201).json(result);
};
