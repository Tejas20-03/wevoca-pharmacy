export function timeElapsed(lastMessageTime: string): string {
    const lastMessageDateTime: Date = new Date(lastMessageTime);
    const currentDateTime: Date = new Date();
    const elapsedMilliseconds: number = currentDateTime.getTime() - lastMessageDateTime.getTime();
    const elapsedSeconds: number = elapsedMilliseconds / 1000;
    const elapsedMinutes: number = elapsedSeconds / 60;
    const elapsedHours: number = elapsedMinutes / 60;
    const elapsedDays: number = elapsedHours / 24;
    const elapsedMonths: number = elapsedDays / 30;
    const elapsedYears: number = elapsedDays / 365;

    if (elapsedYears >= 1) {
        return `${Math.floor(elapsedYears)} year${Math.floor(elapsedYears) > 1 ? 's' : ''} ago`;
    } else if (elapsedMonths >= 1) {
        return `${Math.floor(elapsedMonths)} month${Math.floor(elapsedMonths) > 1 ? 's' : ''} ago`;
    } else if (elapsedDays >= 1) {
        return `${Math.floor(elapsedDays)} day${Math.floor(elapsedDays) > 1 ? 's' : ''} ago`;
    } else if (elapsedHours >= 1) {
        return `${Math.floor(elapsedHours)} hour${Math.floor(elapsedHours) > 1 ? 's' : ''} ago`;
    } else if (elapsedMinutes >= 1) {
        return `${Math.floor(elapsedMinutes)} minute${Math.floor(elapsedMinutes) > 1 ? 's' : ''} ago`;
    } else {
        return 'Just now';
    }
}
