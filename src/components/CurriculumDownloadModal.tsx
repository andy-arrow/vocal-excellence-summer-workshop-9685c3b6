
import React, { useState } from "react";
import SimpleModal from "./ui/simple-modal";

// Dummy submission for demo; adapt to handle email lead forms as needed
const CurriculumDownloadModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    // Place to add API/email-logics
    setTimeout(() => {
      window.open("/lovable-uploads/curriculum-travel-tips.pdf", "_blank");
    }, 1000);
  };

  return (
    <SimpleModal open={open} onClose={onClose} title="Get the Detailed Curriculum + Travel Tips PDF">
      {submitted ? (
        <div className="text-green-700 p-4 text-center">
          Thank you! Your download will begin shortly.
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <p className="text-apple-text text-sm">
            Enter your email to receive the full schedule, session details, and travel/packing tips.
          </p>
          <input
            type="email"
            required
            value={email}
            placeholder="your@email.com"
            onChange={(e) => setEmail(e.target.value)}
            className="border border-apple-border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-apple-blue"
          />
          <button
            type="submit"
            className="w-full bg-apple-blue text-white rounded-lg py-2 hover:bg-apple-blue-hover font-medium"
          >
            Download PDF
          </button>
        </form>
      )}
      <p className="text-xs text-center text-apple-grey mt-4">
        No spam. Curriculum PDF is for informational purposes only.
      </p>
    </SimpleModal>
  );
};

export default CurriculumDownloadModal;
