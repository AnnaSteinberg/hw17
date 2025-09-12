import {accountServiceMongo} from "../../../services/AccountServiceMongoImpl.js";

describe("AccountServiceMongoImpl.fireEmployee", async () => {
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
})