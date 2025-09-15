import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
	cleanup();
});

// Ensure localStorage is available on global scope for tests (jsdom provides window.localStorage)
if (typeof (globalThis as any).localStorage === "undefined" && typeof window !== "undefined") {
	(globalThis as any).localStorage = (window as any).localStorage;
}

// Polyfill crypto.randomUUID if missing in jsdom
if (typeof (globalThis as any).crypto === "undefined") {
	(globalThis as any).crypto = {} as Crypto;
}
if (typeof (globalThis as any).crypto.randomUUID !== "function") {
	(globalThis as any).crypto.randomUUID = () =>
		"test-uuid-" + Math.random().toString(16).slice(2);
}
