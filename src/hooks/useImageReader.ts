export const useImageReader = (handleReadedImage: (error: string | null, image: string, name: string) => void) => {
  const uploadImageToBlob = (image: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        handleReadedImage(null, reader.result.toString(), image.name);
      }
    };

    reader.readAsDataURL(image);
  };

  const readImage = (filesList: FileList | null) => {
    if (filesList === null) return;
    const pattern = /image*/;
    const file = filesList[0];
    if (!file.type.match(pattern)) {
      handleReadedImage("Please select an image", "", "");
    }

    uploadImageToBlob(file);
  };

  return { readImage };
};
