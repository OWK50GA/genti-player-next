export function isLoadedFromAyoba() {
    var userAgent = navigator.userAgent;
    return userAgent.includes("Ayoba") || userAgent.includes("ayoba");
}