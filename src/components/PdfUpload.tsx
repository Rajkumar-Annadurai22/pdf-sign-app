import type { ChangeEvent } from "react";

type PdfUploadProps = {
  fileName: string;
  loading: boolean;
  onFileSelect: (file: File | null) => void;
  onSign: () => void;
  disabledSign: boolean;
};

export default function PdfUpload({
  fileName,
  loading,
  onFileSelect,
  onSign,
  disabledSign,
}: PdfUploadProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    if (file && file.type !== "application/pdf") {
      alert("Please upload a PDF file only.");
      event.target.value = "";
      onFileSelect(null);
      return;
    }

    onFileSelect(file);
  };

  return (
    <section className="pdfSection">
      <h1 className="title">PDF Signing App</h1>
      <p className="subtitle">
        Upload a PDF, send it for mock server signing, and view the signed PDF
        document
      </p>

      <label className="uploadBox">
        <span className="uploadLabel">Upload PDF</span>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleChange}
          className="fileInput"
        />
      </label>

      <div className="fileInfo">
        {fileName ? (
          <span>{fileName}</span>
        ) : (
          <span>Please upload a PDF file</span>
        )}
      </div>

      <button
        className="signButton"
        onClick={onSign}
        disabled={disabledSign || loading}
      >
        {loading ? "Signing..." : "Send for Signing"}
      </button>
    </section>
  );
}
