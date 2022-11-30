module.exports = {
    format_date: (date) => {
        return date;
      },
    format_time: (date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
};