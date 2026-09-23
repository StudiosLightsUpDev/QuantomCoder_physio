export function speak(text: string, enabled: boolean) {
  if (!enabled || typeof window === "undefined" || !text) return;
  const synth = window.speechSynthesis;
  if (!synth) return;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 1.05;
  u.pitch = 1;
  synth.speak(u);
}

export function silence() {
  if (typeof window === "undefined") return;
  window.speechSynthesis?.cancel();
}
