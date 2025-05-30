export const CompressImageTo2MB = (file, maxWidth = 1024, maxHeight = 1024, quality = 0.9) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
  
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
  
          // Resize if needed (maintaining aspect ratio)
          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height *= maxWidth / width;
              width = maxWidth;
            } else {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
  
          // Keep compressing until size ≤ 2MB
          let compressedBase64 = "";
          let compressedBlob;
          let compressedQuality = quality;
  
          const compressUntil2MB = () => {
            return new Promise((res) => {
              canvas.toBlob((blob) => {
                if (blob.size <= 2 * 1024 * 1024 || compressedQuality <= 0.1) {
                  // If ≤ 2MB or too low quality, stop compressing
                  const reader = new FileReader();
                  reader.readAsDataURL(blob);
                  reader.onload = () => res(reader.result);
                } else {
                  // Reduce quality and try again
                  compressedQuality -= 0.1;
                  canvas.toBlob((newBlob) => {
                    compressedBlob = newBlob;
                    res(compressUntil2MB());
                  }, "image/jpeg", compressedQuality);
                }
              }, "image/jpeg", compressedQuality);
            });
          };
  
          compressUntil2MB().then((finalBase64) => {
            resolve(finalBase64);
          });
        };
      };
  
      reader.onerror = (error) => reject(error);
    });
  };
  