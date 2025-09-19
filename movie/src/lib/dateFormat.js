export const dateFormat = (date) =>{
    return new Date(date).toLocaleDateString("vi-VN", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    });
}