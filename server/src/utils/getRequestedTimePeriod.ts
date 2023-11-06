export function getRequestedTimePeriod(appointmentTime: string, isTimeSet: boolean) {
    const requestedStartTime = new Date(appointmentTime);
    const requestedEndTime = new Date(appointmentTime);

    if (isTimeSet) {
        includeEntireMinuteRange(requestedStartTime, requestedEndTime);
    }
    else {
        includeEntireDayRange(requestedStartTime, requestedEndTime);
    }
    return { requestedStartTime, requestedEndTime };
}
function includeEntireDayRange(requestedStartTime: Date, requestedEndTime: Date) {
    requestedStartTime.setHours(23, 59, 59, 999);
    requestedEndTime.setHours(0, 0, 0, 0);
}
function includeEntireMinuteRange(requestedStartTime: Date, requestedEndTime: Date) {
    requestedStartTime.setSeconds(59, 999);
    requestedEndTime.setSeconds(0, 0);
}
