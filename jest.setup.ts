import "@testing-library/jest-dom";

const ResizeObserverPolyfill = class {
    observe() {}
    unobserve() {}
    disconnect() {}
};

if (!(globalThis as unknown as { ResizeObserver?: unknown }).ResizeObserver) {
    Object.defineProperty(globalThis, "ResizeObserver", { value: ResizeObserverPolyfill, writable: true });
}
