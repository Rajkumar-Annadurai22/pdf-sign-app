import { useEffect, useState } from "react";
import PdfUpload from "./components/PdfUpload";
import SignedPdfPreview from "./components/SignedPdfPreview";
import { uploadAndSignPdf } from "./services/mockSignApi";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [signedPdfUrl, setSignedPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onFileChange = (file: File | null) => {
    setSelectedFile(file);

    if (signedPdfUrl) {
      URL.revokeObjectURL(signedPdfUrl);
      setSignedPdfUrl(null);
    }
  };

  const handleSignPdf = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);

      const signedBlob = await uploadAndSignPdf(selectedFile);
      const blobUrl = URL.createObjectURL(signedBlob);

      if (signedPdfUrl) {
        URL.revokeObjectURL(signedPdfUrl);
      }

      setSignedPdfUrl(blobUrl);
    } catch (error) {
      console.error("Failed to sign PDF:", error);
      alert("Something went wrong while signing the PDF.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (signedPdfUrl) {
        URL.revokeObjectURL(signedPdfUrl);
      }
    };
  }, [signedPdfUrl]);

  return (
    <main className="pdfSignApp">
      <div className="pdfSignAppContainer">
        <PdfUpload
          fileName={selectedFile?.name ?? ""}
          loading={loading}
          onFileSelect={onFileChange}
          onSign={handleSignPdf}
          disabledSign={!selectedFile}
        />

        <SignedPdfPreview pdfUrl={signedPdfUrl} />
      </div>
    </main>
  );
}

export default App;
