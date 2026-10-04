import { Router } from "express";
import {
  currentAdmin,
  login,
  logout,
  refresh,
} from "../controllers/authController.js";
import {
  createAdminArticle,
  deleteAdminArticle,
  listAdminArticles,
  updateAdminArticle,
} from "../controllers/adminArticleController.js";
import {
  getArticle,
  getPartner,
  listArticles,
  listPartners,
  verifyCertificate,
} from "../controllers/contentController.js";
import {
  createContact,
  createServiceRequest,
} from "../controllers/submissionController.js";
import { requireAdmin } from "../middleware/auth.js";
import { authLimit, publicSubmissionLimit } from "../middleware/rateLimits.js";

const router = Router();
const authRouter = Router();

authRouter.post("/login", authLimit, login);
authRouter.post("/refresh", authLimit, refresh);
authRouter.post("/logout", logout);
authRouter.get("/me", requireAdmin, currentAdmin);
router.use("/auth", authRouter);

router.get("/articles", listArticles);
router.get("/articles/:slug", getArticle);
router.get("/partners", listPartners);
router.get("/partners/:id", getPartner);
router.get("/certificates/:certificateNumber", verifyCertificate);
router.post("/service-requests", publicSubmissionLimit, createServiceRequest);
router.post("/contact", publicSubmissionLimit, createContact);

const adminArticles = Router();
adminArticles.use(requireAdmin);
adminArticles.get("/", listAdminArticles);
adminArticles.post("/", createAdminArticle);
adminArticles.put("/:id", updateAdminArticle);
adminArticles.delete("/:id", deleteAdminArticle);
router.use("/admin/articles", adminArticles);

export default router;
