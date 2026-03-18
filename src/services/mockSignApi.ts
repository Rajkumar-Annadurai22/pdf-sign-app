export const uploadAndSignPdf = async (file: File): Promise<Blob> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const arrayBuffer = await file.arrayBuffer();

  return new Blob([arrayBuffer], { type: "application/pdf" });
};
