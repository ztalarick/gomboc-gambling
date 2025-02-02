import { Server } from "../src/server";
import axios from "axios";
import { expect } from "chai";
import { before, after, describe, it } from "mocha";

describe("Integration Tests", () => {
  let server: any;
  let address: string;

  before(async () => {
    server = new Server();
    await server.start(3000);
    address = "http://localhost:3000";
  });

  after(async () => {
    await server.close();
  });

  it("should get the index.html file", async () => {
    const response = await axios.get(`${address}/`);
    expect(response.status).to.equal(200);
    expect(response.headers["content-type"]).to.include("text/html");
  });

  it("should create a new user", async () => {
    const response = await axios.post(`${address}/v1/gamble/user`, {});
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("id");
  });

  it("should get user by id", async () => {
    const response = await axios.get(`${address}/v1/gamble/user/1`);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("id", 1);
  });

  it("should place a bet", async () => {
    const response = await axios.post(`${address}/v1/gamble/bet`, {
      userId: 1,
      amount: 100,
      guess: 1,
    });
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("outcome");
  });

  it("should get user bet history", async () => {
    const response = await axios.get(`${address}/v1/gamble/user/1/history`);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("bets");
    expect(response.data.bets).to.be.an("array");
  });

  it("should withdraw user balance", async () => {
    try {
      const response = await axios.post(
        `${address}/v1/gamble/user/1/withdraw`,
        {},
      );
      expect(response.status).to.equal(200);
    } catch (error) {
      expect(error.response.status).to.equal(400);
      expect(error.response.data).to.have.property(
        "error",
        "User has no winning bets",
      );
    }
  });
});
