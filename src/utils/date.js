export function removeYearFromISO(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', { 
        timeZone: 'UTC', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
}

export function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', { 
        timeZone: 'UTC', 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' // Added year
    });
}