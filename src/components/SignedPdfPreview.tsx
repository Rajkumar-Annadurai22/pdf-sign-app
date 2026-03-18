type SignedPdfPreviewProps = {
  pdfUrl: string | null;
};

export default function SignedPdfPreview({ pdfUrl }: SignedPdfPreviewProps) {
  return (
    <section className="pdfSection viewerCard">
      <h2 className="viewerTitle">Signed Document</h2>

      {pdfUrl ? (
        <div className="viewerWrapper">
          <iframe src={pdfUrl} title="Signed PDF Viewer" className="pdfFrame" />
        </div>
      ) : (
        <div className="emptyPdf">
          Signed PDF will be shown here after upload.
        </div>
      )}
    </section>
  );
}
