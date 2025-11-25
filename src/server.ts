import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";
import addRoutes, { RouteHandler, routes } from "./helpers/RouteHandler";

addRoutes("GET", "/", (req, res) => {
  res.writeHead(200, { "content-type": "application/json" });
  res.end(
    JSON.stringify({
      message: "Hello from node js with typescript",
      path: req.url,
    })
  );
});

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("Server is running...");

    const method = req.method?.toUpperCase() || "";
    const path = req.url || "";
    const methodMap = routes.get(method);
    const handler: RouteHandler | undefined = methodMap?.get(path);

    if (handler) {
      handler(req, res);
    } else {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          message: "Router not found!!",
          path,
        })
      );
    }

    //root request
    // if (req.url == "/" && req.method == "GET") {
    //   res.writeHead(200, { "content-type": "application/json" });
    //   res.end(
    //     JSON.stringify({
    //       message: "Hello from node js with typescript",
    //       path: req.url,
    //     })
    //   );
    // }

    //check health request
    if (req.url == "/api" && req.method == "GET") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Health is good...",
          path: req.url,
        })
      );
    }

    //post request
    if (req.url == "/api/users" && req.method == "POST") {
      // const user = {
      //   id: 1,
      //   name: "Bob",
      // };
      // res.writeHead(200, { "content-type": "application/json" });
      // res.end(JSON.stringify(user));

      let body = "";

      req.on("data", (chunk) => {
        body = body + chunk.toString();
      });

      req.on("end", () => {
        try {
          const parseBody = JSON.parse(body);
          console.log(parseBody);
          console.log("Check the to get current changing data");
          res.end(JSON.stringify(parseBody));
        } catch (error: any) {
          console.log(error?.message);
        }
      });
    }
  }
);

server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
