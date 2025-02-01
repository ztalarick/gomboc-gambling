const Fastify = require("fastify");
const path = require("path");
const cors = require("@fastify/cors");
const fastifyStatic = require("@fastify/static");

export class Server {
  private server: any;

  constructor() {
    this.server = Fastify({ logger: true });
    this.server.register(cors);
    this.setupStaticFiles();
    this.setupRoutes();
  }

  private setupStaticFiles() {
    this.server.register(fastifyStatic, {
      root: path.join(__dirname, "static"),
      prefix: "/",
    });
  }

  private setupRoutes() {
    this.server.get("/", async (request: any, reply: any) => {
      return reply.sendFile("index.html");
    });
  }

  public start(port: number): void {
    this.server.listen({ port }, (err: any, address: string) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });
  }
}