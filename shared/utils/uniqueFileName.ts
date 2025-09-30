function uniqueFileName(extension = 'txt') {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `file_${timestamp}_${random}.${extension}`;
}

export { uniqueFileName };
