export const handleGetImageAspectRatio = (defaultAspectRatio: number, imageUrl: string | undefined): number => {
  let aspectRatio = defaultAspectRatio;
  if (imageUrl) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.onload = () => {
      aspectRatio = img.width / img.height;
    };
  }

  return aspectRatio;
};
