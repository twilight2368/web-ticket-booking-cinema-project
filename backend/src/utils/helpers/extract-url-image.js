// Extract public ID from URL
function extractPublicId(url) {
  const urlParts = url.split("/");
  const versionIndex = urlParts.findIndex((part) => part.startsWith("v")) + 1;
  const publicIdWithExtension = urlParts.slice(versionIndex).join("/");
  const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, ""); // Remove file extension
  return publicId;
}

module.exports = { extractPublicId };
