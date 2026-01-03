import type { Express, Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { storage } from "./storage";
import { EmailService } from "./emailService";

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const applicationDir = path.join(uploadDir, `application-${Date.now()}`);
    if (!fs.existsSync(applicationDir)) {
      fs.mkdirSync(applicationDir, { recursive: true });
    }
    cb(null, applicationDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: fileStorage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedAudioTypes = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg", "audio/m4a", "audio/x-m4a"];
    const allowedDocTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

    if (file.fieldname.includes("audio") && !allowedAudioTypes.includes(file.mimetype)) {
      cb(new Error("Invalid audio file type"));
      return;
    }
    if ((file.fieldname === "cvFile" || file.fieldname === "recommendationFile") && !allowedDocTypes.includes(file.mimetype)) {
      cb(new Error("Invalid document file type"));
      return;
    }
    cb(null, true);
  },
});

export async function registerRoutes(app: Express): Promise<void> {
  app.post(
    "/api/applications",
    upload.fields([
      { name: "audioFile1", maxCount: 1 },
      { name: "audioFile2", maxCount: 1 },
      { name: "cvFile", maxCount: 1 },
      { name: "recommendationFile", maxCount: 1 },
    ]),
    async (req: Request, res: Response) => {
      try {
        console.log("Received application submission");

        const applicationDataJson = req.body.applicationData;
        if (!applicationDataJson) {
          return res.status(400).json({ success: false, error: "Missing application data" });
        }

        let applicationData;
        try {
          applicationData = JSON.parse(applicationDataJson);
        } catch (e) {
          return res.status(400).json({ success: false, error: "Invalid application data format" });
        }

        const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

        const insertData = {
          firstName: applicationData.firstName,
          lastName: applicationData.lastName,
          email: applicationData.email,
          phone: applicationData.phone,
          whereFrom: applicationData.whereFrom,
          age: applicationData.age?.toString(),
          socialMedia: applicationData.socialMedia,
          dateOfBirth: applicationData.dateOfBirth,
          nationality: applicationData.nationality,
          vocalRange: applicationData.vocalRange,
          yearsOfSinging: applicationData.yearsOfSinging,
          musicalBackground: applicationData.musicalBackground,
          teacherName: applicationData.teacherName,
          teacherEmail: applicationData.teacherEmail,
          reasonForApplying: applicationData.reasonForApplying,
          heardAboutUs: applicationData.heardAboutUs,
          scholarshipInterest: applicationData.scholarshipInterest || false,
          dietaryRestrictions: applicationData.dietaryRestrictions,
          areasOfInterest: applicationData.areasOfInterest,
          specialNeeds: applicationData.specialNeeds,
          termsAgreed: applicationData.termsAgreed || true,
          audioFile1Path: files?.audioFile1?.[0]?.path,
          audioFile2Path: files?.audioFile2?.[0]?.path,
          cvFilePath: files?.cvFile?.[0]?.path,
          recommendationFilePath: files?.recommendationFile?.[0]?.path,
        };

        const application = await storage.createApplication(insertData);
        console.log("Application saved:", application.id);

        let emailStatus = { success: false, error: null as string | null };
        const RESEND_API_KEY = process.env.RESEND_API_KEY;

        if (RESEND_API_KEY) {
          try {
            const emailService = new EmailService(RESEND_API_KEY);
            const result = await emailService.sendNotifications({
              firstName: applicationData.firstName,
              lastName: applicationData.lastName,
              email: applicationData.email,
              phone: applicationData.phone,
              vocalRange: applicationData.vocalRange,
            });
            emailStatus = { success: result.success, error: result.error?.toString() || null };
          } catch (emailError: any) {
            console.error("Email sending error:", emailError);
            emailStatus = { success: false, error: emailError.message };
          }
        } else {
          console.warn("RESEND_API_KEY not configured - emails will not be sent");
          emailStatus = { success: false, error: "Email service not configured" };
        }

        return res.json({
          success: true,
          applicationId: application.id,
          emailStatus,
          message: "Application received successfully",
        });
      } catch (error: any) {
        console.error("Error processing application:", error);
        return res.status(500).json({
          success: false,
          error: error.message || "Failed to process application",
        });
      }
    }
  );

  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const { name, email, message: messageContent } = req.body;
      
      if (!name || !email || !messageContent) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }

      const contactMessage = await storage.createContactMessage({
        name,
        email,
        message: messageContent,
      });

      const RESEND_API_KEY = process.env.RESEND_API_KEY;
      if (RESEND_API_KEY) {
        const emailService = new EmailService(RESEND_API_KEY);
        await emailService.sendNotificationToAdmin({
          firstName: name,
          email,
        });
      }

      return res.json({ success: true, messageId: contactMessage.id });
    } catch (error: any) {
      console.error("Error processing contact form:", error);
      return res.status(400).json({ success: false, error: error.message });
    }
  });

  app.get("/api/applications", async (req: Request, res: Response) => {
    try {
      const applications = await storage.getAllApplications();
      return res.json(applications);
    } catch (error: any) {
      console.error("Error fetching applications:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  });

  app.get("/api/applications/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const application = await storage.getApplication(id);
      if (!application) {
        return res.status(404).json({ success: false, error: "Application not found" });
      }
      return res.json(application);
    } catch (error: any) {
      console.error("Error fetching application:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  });

  app.post("/api/send-email", async (req: Request, res: Response) => {
    try {
      const { type, name, email, applicantData, applicationId } = req.body;
      const RESEND_API_KEY = process.env.RESEND_API_KEY;

      if (!RESEND_API_KEY) {
        return res.status(500).json({ success: false, error: "Email service not configured" });
      }

      const emailService = new EmailService(RESEND_API_KEY);

      if (type === "application_confirmation" && email) {
        const result = await emailService.sendConfirmationToApplicant({
          firstName: name,
          email,
        });
        return res.json(result);
      } else if (type === "admin_notification" && applicantData) {
        const result = await emailService.sendNotificationToAdmin(applicantData);
        return res.json(result);
      } else {
        return res.status(400).json({ success: false, error: "Invalid email type or missing data" });
      }
    } catch (error: any) {
      console.error("Error sending email:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  });
}
