import { IncomingMessage, ServerResponse } from "http";

//de find router type
export type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void;
//                method      url      req, res
export const routes: Map<String, Map<string, RouteHandler>> = new Map();
function addRoutes(method: string, path: string, handler: RouteHandler) {
  if (!routes.has(method)) routes.set(method, new Map());
  routes.get(method)!.set(path, handler);
}

export default addRoutes;
