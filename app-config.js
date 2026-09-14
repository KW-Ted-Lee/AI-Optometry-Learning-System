// V0.7.1 Multi-user Classroom：此檔可公開放在 GitHub。
// 禁止在這裡放 Gemini API Key 或 CLASS_TOKEN。
window.APP_CONFIG = {
  backendEndpoint: "https://optometry-ai-backend.mkcopt-ted.workers.dev",
  primaryModel: "gemini-3.5-flash",
  fallbackModel: "gemini-3.5-flash-lite",
  reviewer: "李冠緯老師",
  classOptions: ["視一甲", "視二甲", "115技藝班"],
  courseOptions: ["視光學實驗（一）", "視光學實驗（二）", "視光學實驗（三）", "115技藝班（校內）", "115技藝班（校外）"],
  defaultClass: "視一甲",
  defaultCourse: "視光學實驗（一）",
  cameraQuality: "medium",
  syncEnabled: true
};
