export default function NumToTime(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    if (minutes + ''.length < 2) {
        minutes = '0' + minutes;
    }
    if (hours === 0) {
        return `${Math.ceil(minutes)}mins`
    }
    return `${hours}:${Math.ceil(minutes)}mins`;
}