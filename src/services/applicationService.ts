import { ApplicationFormValues } from "@/components/ApplicationForm/schema";

export interface ApplicationFiles {
  audioFile1: File | null;
  audioFile2: File | null;
  cvFile: File | null;
  recommendationFile: File | null;
  [key: string]: File | null;
}

export interface ApplicationSubmissionResult {
  success: boolean;
  applicationId?: string | number;
  error?: {
    message: string;
    code?: string;
  };
  filesUploaded?: string[];
  emailSent?: boolean;
}

export async function submitApplication(
  formData: ApplicationFormValues,
  files: ApplicationFiles
): Promise<ApplicationSubmissionResult> {
  console.log("Starting application submission process");

  try {
    const startTime = Date.now();

    const formDataObj = new FormData();
    formDataObj.append("applicationData", JSON.stringify(formData));
    formDataObj.append("submissionId", `submission-${Date.now()}`);

    Object.entries(files).forEach(([key, file]) => {
      if (file && file instanceof File && file.size > 0) {
        console.log(`Adding file to formData: ${key}, ${file.name}, ${file.size} bytes`);
        formDataObj.append(key, file, file.name);
      }
    });

    const response = await fetch("/api/applications", {
      method: "POST",
      body: formDataObj,
    });

    console.log("Application submission completed in", (Date.now() - startTime) / 1000, "seconds");

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const result = await response.json();
    console.log("Application submission result:", result);

    return {
      success: result.success,
      applicationId: result.applicationId,
      emailSent: result.emailStatus?.success,
    };
  } catch (error: any) {
    console.error("Error in application submission:", error);

    return {
      success: false,
      error: {
        message: error.message || "Failed to submit application",
        code: "SUBMISSION_ERROR",
      },
    };
  }
}

export async function sendContactMessage(data: {
  name: string;
  email: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error sending contact message:", error);
    return {
      success: false,
      error: error.message || "Failed to send message",
    };
  }
}
