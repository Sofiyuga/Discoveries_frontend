export const pluralVerify = (value) => {
    if (value == -1) {
        return "Нет"
    } else if (value == 0) {
        return "Отсутствует"
    }

    return "Присутствует"
}