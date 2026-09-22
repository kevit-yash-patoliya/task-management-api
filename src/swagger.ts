import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Express TypeScript API",
      version: "1.0.0",
      description:
        "A simple Express API documented with Swagger and TypeScript",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./src/modules/**/*.ts", "./src/index.ts", "./src/modules/**/*.ts"],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
