/**
 * Simulates a loading process with progress updates
 * @param onProgress Callback function that receives the current progress (0-100)
 * @param onComplete Callback function to run when loading completes
 * @param duration Duration in milliseconds for the whole loading process
 */
export function simulateLoading(
  onProgress: (progress: number) => void,
  onComplete: () => void,
  duration: number = 3000
) {
  let startTime = Date.now();
  let progress = 0;
  
  const updateProgress = () => {
    const elapsed = Date.now() - startTime;
    progress = Math.min(100, (elapsed / duration) * 100);
    
    onProgress(progress);
    
    if (progress < 100) {
      requestAnimationFrame(updateProgress);
    } else {
      onComplete();
    }
  };
  
  requestAnimationFrame(updateProgress);
}

/**
 * Returns a promise that resolves after a specified delay
 * @param ms Milliseconds to wait
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Preloads an array of images
 * @param srcs Array of image sources to preload
 * @returns Promise that resolves when all images are loaded
 */
export function preloadImages(srcs: string[]): Promise<HTMLImageElement[]> {
  const promises = srcs.map(src => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  });
  
  return Promise.all(promises);
}
