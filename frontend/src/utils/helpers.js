export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

export function convertTimeStamp(postCard) {
    const date = new Date(postCard.timestamp).toDateString();
    const hours = new Date(postCard.timestamp).getHours();

    var labeledHours

    if (hours < 12) {
        if (hours === 0) { // if midnight
            labeledHours = '12AM'
        } 
        else {
            labeledHours = hours + 'AM'
        }
    } else {
        labeledHours = (hours - 12) + 'PM'
    }

    return (
        date + ', ' + labeledHours
    )
}