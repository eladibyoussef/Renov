import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';

// Swagger setup function
export const setupSwagger = (app: Application) => {
  const options: Options = {
    swaggerDefinition: {
      openapi: '3.0.0', 
      info: {
        title: 'Renovo API Documentation', 
        version: '1.0.0', 
        description: 'Documentation for API endpoints of renovo project', 
      },
      basePath: '/',

      servers: [
        {
          url: 'http://localhost:1337',
          description: 'Development server', 
        },
      ],
    },
    apis: ['./src/routes/*.ts'], 
  };

  const specs = swaggerJsdoc(options);

  // app.use('/api-docs', (req, res) => {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.send(specs);
  // });
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

};
