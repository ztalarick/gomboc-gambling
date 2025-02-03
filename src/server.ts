import Fastify from "fastify";
import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import Ajv from "ajv";

import {
  GambleException,
  UserNotFoundException,
  WithdrawGambleException,
} from "./domain/utils/gamble_exception";
import { Bet, DiceRoll } from "./domain/core/bet";
import { SQLiteGambleRepository } from "./adapters/persistence/sqlite_gamble_reposiotry";
import { RestGambleService } from "./adapters/rest/rest_gamble_service";

export class Server {
  private server = Fastify({ logger: true });
  private ajv = new Ajv({ allErrors: true });

  private gambleService: RestGambleService = new RestGambleService(
    new SQLiteGambleRepository(),
  );

  constructor() {
    this.server.setValidatorCompiler(({ schema }: { schema: object }) =>
      this.ajv.compile(schema),
    );
    this.server.register(cors);
    this.setupStaticFiles();
    this.setupRoutes();
  }

  private setupStaticFiles() {
    this.server.register(fastifyStatic, {
      root: path.join(__dirname, "../static"),
      prefix: "/",
    });
  }

  private setupRoutes() {
    this.server.get(
      "/",
      async (request: FastifyRequest, reply: FastifyReply) => {
        return reply.sendFile("index.html");
      },
    );

    this.server.get(
      "/v1/gamble/user/:id",
      async (
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply,
      ) => {
        try {
          const user = await this.gambleService.getUser(request.params.id);
          return reply.send(user);
        } catch (e: unknown) {
          console.error(e);
          if (e instanceof UserNotFoundException) {
            return reply.code(404).send({ error: e.message });
          } else if (e instanceof GambleException) {
            return reply.code(400).send({ error: e.message });
          } else {
            return reply.code(500).send({ error: "Internal Server Error" });
          }
        }
      },
    );

    this.server.post(
      "/v1/gamble/user",
      async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          const user = await this.gambleService.getUser(null);
          return reply.send(user);
        } catch (e: unknown) {
          console.error(e);
          if (e instanceof GambleException) {
            return reply.code(400).send({ error: e.message });
          } else {
            return reply.code(500).send({ error: "Internal Server Error" });
          }
        }
      },
    );

    this.server.post(
      "/v1/gamble/bet",
      async (
        request: FastifyRequest<{
          Body: { userId: string; amount: number; guess: number };
        }>,
        reply: FastifyReply,
      ) => {
        try {
          const bet = new Bet(
            await this.gambleService.getUser(request.body.userId),
            request.body.amount,
            request.body.guess as DiceRoll,
          );

          return reply.send(await this.gambleService.bet(bet));
        } catch (e: unknown) {
          console.error(e);
          if (e instanceof GambleException) {
            return reply.code(400).send({ error: e.message });
          } else {
            return reply.code(500).send({ error: "Internal Server Error" });
          }
        }
      },
    );

    this.server.get(
      "/v1/gamble/user/:id/history",
      async (
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply,
      ) => {
        try {
          const user = await this.gambleService.getUser(request.params.id);
          return reply.send(await this.gambleService.getBetHistory(user));
        } catch (e: unknown) {
          console.error(e);
          if (e instanceof UserNotFoundException) {
            return reply.code(404).send({ error: e.message });
          } else if (
            e instanceof WithdrawGambleException ||
            e instanceof GambleException
          ) {
            return reply.code(400).send({ error: e.message });
          } else {
            return reply.code(500).send({ error: "Internal Server Error" });
          }
        }
      },
    );

    this.server.post(
      "/v1/gamble/user/:id/withdraw",
      async (
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply,
      ) => {
        try {
          const user = await this.gambleService.getUser(request.params.id);
          const result = await this.gambleService.withdraw(user);
          return reply.send(result);
        } catch (e: unknown) {
          console.error(e);
          if (e instanceof UserNotFoundException) {
            return reply.code(404).send({ error: e.message });
          } else if (e instanceof GambleException) {
            return reply.code(400).send({ error: e.message });
          } else {
            return reply.code(500).send({ error: "Internal Server Error" });
          }
        }
      },
    );
  }

  public start(port: number): void {
    this.server.listen({ port }, (err: Error, address: string) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });
  }

  public async close(): Promise<void> {
    await this.server.close();
  }
}
