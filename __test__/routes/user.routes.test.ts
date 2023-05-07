import { request } from "./auth.routes.test";


let token: string;

beforeAll(async () => {
    const user = {
        email: "agunorbert@yahoo.com",
        password: "admin1234",
    }
    const response = await request.post("/api/v1/auth/sign-in").send(user);
    token = response.body.data.token;
}, 10000);

describe("Test the root path", () => {
    test("It should response the GET method", async () => {
        const response = await request.get("/")
        expect(response.status).toBe(200);
    });
});

describe("Test the get all users path", () => {
    test("It should response the GET method", async () => {
        const response = await request.get("/api/v1/users").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
    }, 10000);
});