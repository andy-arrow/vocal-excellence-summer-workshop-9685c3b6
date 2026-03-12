import { ApplicationFormValues } from "@/components/ApplicationForm/schema";

export const submitApplicationWithFiles = async (
  formData: ApplicationFormValues,
  files: { [key: string]: File }
): Promise<{ success: boolean; error?: any; data?: any }> => {
  const formDataObj = new FormData();
  formDataObj.append('applicationData', JSON.stringify(formData));

  Object.entries(files).forEach(([key, file]) => {
    if (file && file instanceof File && file.size > 0) {
      formDataObj.append(key, file, file.name);
    }
  });

  try {
    const response = await fetch('/api/applications', {
      method: 'POST',
      body: formDataObj,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        error: { message: result.error || 'Failed to submit application' },
      };
    }

    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error };
  }
};
