import { Router } from "express";

const router = Router();
// Redirect to api version
router.get('/', (req, res) => res.redirect(process.env.API_VERSION));

export { router as apiRedirect };