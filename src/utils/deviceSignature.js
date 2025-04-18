import FingerprintJS from '@fingerprintjs/fingerprintjs'

let fpPromise;
// Initialize an agent at application startup.

export const getDeviceSignature = async () => {
    if (typeof window === 'undefined') return null
    // Get the visitor identifier when you need it.
    fpPromise = FingerprintJS.load();
    const fp = await fpPromise
    const result = await fp.get()
    return result.visitorId;
}