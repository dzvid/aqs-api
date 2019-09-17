import { Router } from "express";

const routes = new Router();

// ROUTES
routes.get("/test", (req, res) => {
  res.json({ message: "Hello world" });
});

// Export our routes
export default routes;
