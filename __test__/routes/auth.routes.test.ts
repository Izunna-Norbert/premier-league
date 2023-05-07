import supertest from "supertest";
import app from "../../src";

export const request = supertest(app);

let adminId: string;
let userId: string;
let userToken: string;
let adminToken: string;


describe("Test the root path", () => {
    test("It should response the GET method", async () => {
        const response = await request.get("/")
        expect(response.status).toBe(200);
    }, 10000);
});

describe("Test the sign up path for user", () => {
    test("It should response the POST method", async () => {
        const user = {
            name: "Jest Test",
            email: "test@jest.com",
            password: "test1234",
        };
        const response = await request.post("/api/v1/auth/sign-up").send(user);
        expect(response.status).toBe(201);
        expect(response.body.data.user).toHaveProperty("name");
        expect(response.body.data.user).toHaveProperty("email");
        expect(response.body.data.user).toHaveProperty("_id");
        expect(response.body.data.user).toHaveProperty("isAdmin");

        expect(response.body.data.user.isAdmin).toBe(false);

        userId = response.body.data.user._id;
    }, 10000);
});

describe("Test the sign up path for admin", () => {
    test("It should response the POST method", async () => {
        const admin = {
            name: "Jest Admin",
            email: "admin@jest.com",
            password: "admin1234",
        };
        const response = await request.post("/api/v1/auth/sign-up/admin").send(admin);
        expect(response.status).toBe(201);
        expect(response.body.data.user).toHaveProperty("name");
        expect(response.body.data.user).toHaveProperty("email");
        expect(response.body.data.user).toHaveProperty("_id");
        expect(response.body.data.user).toHaveProperty("isAdmin");
        expect(response.body.data.user.isAdmin).toBe(true);

        adminId = response.body.data.user._id;
    }, 10000);
});

describe("Test the sign in path", () => {
    test("It should response the POST method", async () => {
        const user = {
            email: "test@jest.com",
            password: "test1234",
        };
        const response = await request.post("/api/v1/auth/sign-in").send(user);
        expect(response.status).toBe(200);
        expect(response.body.data.user).toHaveProperty("name");
        expect(response.body.data.user).toHaveProperty("email");
        expect(response.body.data.user).toHaveProperty("_id");
        expect(response.body.data.user).toHaveProperty("isAdmin");

        userToken = response.body.data.token;
        userId = response.body.data.user._id;
    }, 10000);
});

describe("Test the sign in path for admin", () => {
    test("It should response the POST method", async () => {
        const admin = {
            email: "admin@jest.com",
            password: "admin1234",
        };
        const response = await request.post("/api/v1/auth/sign-in").send(admin);
        expect(response.status).toBe(200);
        expect(response.body.data.user).toHaveProperty("name");
        expect(response.body.data.user).toHaveProperty("email");
        expect(response.body.data.user).toHaveProperty("_id");
        expect(response.body.data.user).toHaveProperty("isAdmin");

        expect(response.body.data.user.isAdmin).toBe(true);

        adminToken = response.body.data.token;
        adminId = response.body.data.user._id;
    }, 10000);
});

describe("Test delete user path", () => {
    test("It should response the DELETE method", async () => {
        const response = await request.delete(`/api/v1/users/${userId}`).set("Authorization", `Bearer ${adminToken}`);
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty("name");
        expect(response.body.data).toHaveProperty("email");
        expect(response.body.data).toHaveProperty("_id");
        expect(response.body.data).toHaveProperty("isAdmin");
    }, 10000);
});

describe("Test delete admin path", () => {
    test("It should response the DELETE method", async () => {
        const response = await request.delete(`/api/v1/users/${adminId}`).set("Authorization", `Bearer ${adminToken}`);
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty("name");
        expect(response.body.data).toHaveProperty("email");
        expect(response.body.data).toHaveProperty("_id");
        expect(response.body.data).toHaveProperty("isAdmin");
    }, 10000);
});