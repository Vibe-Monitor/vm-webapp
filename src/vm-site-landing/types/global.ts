// Global type declarations

declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
    touchStartY?: number;
  }
}

export {};