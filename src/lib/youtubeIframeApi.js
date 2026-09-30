let apiPromise;

export function loadYouTubeIframeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);

  if (!apiPromise) {
    apiPromise = new Promise((resolve, reject) => {
      const previousCallback = window.onYouTubeIframeAPIReady;
      let timeoutId;

      window.onYouTubeIframeAPIReady = () => {
        window.clearTimeout(timeoutId);
        try {
          previousCallback?.();
        } finally {
          resolve(window.YT);
        }
      };

      let script = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]',
      );

      if (!script) {
        script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        script.onerror = () => reject(new Error("No se pudo cargar YouTube."));
        document.head.appendChild(script);
      }

      timeoutId = window.setTimeout(
        () =>
          reject(new Error("YouTube está tardando demasiado en responder.")),
        15000,
      );
    });
  }

  return apiPromise;
}
