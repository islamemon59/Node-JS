import { ServerResponse } from "http";

function sendJson(res: ServerResponse, status: number, data: any) {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(data));
}

export default sendJson