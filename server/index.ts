import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import path from "path";
import fs from "fs";
import { adminAuth } from "./utils/adminAuth";

const app = express();
const isDev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT || (isDev ? "3001" : "5000"), 10);

if (process.env.ADMIN_PASSWORD) {
  console.log("Admin password configured");
} else {
  console.warn("WARNING: Admin password missing - admin routes will be inaccessible");
}

// Stripe requires the raw request body for webhook signature verification.
// This MUST be registered before express.json() so the webhook route receives
// the raw Buffer; all other routes use the normal JSON parser.
app.use('/api/webhook/stripe', express.raw({ type: 'application/json' }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/health", (_req, res) => {
  res.status(200).send("OK");
});

app.use("/sponsors", (_req, res, next) => {
  res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet, noimageindex");
  next();
});

const uploadsPath = path.join(process.cwd(), "uploads");
app.use('/admin-files', adminAuth, express.static(uploadsPath));
console.log(`Admin file access configured at /admin-files -> ${uploadsPath}`);

app.use((req, res, next) => {
  const start = Date.now();
  const reqPath = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (reqPath.startsWith("/api")) {
      let logLine = `${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(logLine);
    }
  });

  next();
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

const distPath = path.resolve(process.cwd(), "dist");
const distIndexPath = path.join(distPath, "index.html");

// Register all routes FIRST, then bind the port so no request arrives before
// any route handler is in place.
registerRoutes(app)
  .then(() => {
    app.use((req, res, next) => {
      if (req.path.startsWith("/api/")) {
        res.status(404).json({ error: "API endpoint not found" });
      } else {
        next();
      }
    });

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ error: message });
      console.error("Error:", err);
    });

    const knownSPARoutes = new Set([
      '/', '/apply', '/application', '/home', '/auth', '/admin',
      '/terms', '/privacy', '/tuition', '/summer-programme',
      '/email-extract', '/payment-success', '/payment-cancelled', '/sponsors',
    ]);

    if (fs.existsSync(distIndexPath)) {
      app.use(express.static(distPath, {
        maxAge: '1d',
        setHeaders: (res, filePath) => {
          if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
          }
        }
      }));
      app.use((req, res) => {
        const noCache = () => {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
        };
        if (knownSPARoutes.has(req.path)) {
          noCache();
          res.sendFile(distIndexPath);
        } else {
          noCache();
          res.status(404).sendFile(distIndexPath);
        }
      });
    } else {
      console.warn("WARNING: dist/index.html not found. Run 'npm run build'.");
      app.use((_req, res) => {
        res.status(503).send(`<!DOCTYPE html><html><head><title>Building...</title><meta http-equiv="refresh" content="10"></head><body><p>Building frontend — please wait.</p></body></html>`);
      });
    }

    const server = app.listen(port, "0.0.0.0", () => {
      console.log(`Server ready on port ${port}${fs.existsSync(distIndexPath) ? ' (serving from dist/)' : ' (no dist/)'}`);
    });

    process.on("SIGTERM", () => {
      console.log("SIGTERM received, shutting down gracefully...");
      server.close(() => { console.log("Server closed"); process.exit(0); });
    });
    process.on("SIGINT", () => {
      console.log("SIGINT received, shutting down gracefully...");
      server.close(() => { console.log("Server closed"); process.exit(0); });
    });
  })
  .catch((err) => {
    console.error("Failed to register routes:", err);
    process.exit(1);
  });
