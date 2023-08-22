export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString("en-US",
    {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    })
}