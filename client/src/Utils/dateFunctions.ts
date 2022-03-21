export const formatDate = (date: Date): string => {
    const brMonths = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    return `${brMonths[date.getMonth()]} de ${date.getFullYear()}`
}

export const stringToDate = (date: string): Date => {
    const [year, month, day] = date.split('-')
    return new Date(parseInt(year), parseInt(month), parseInt(day))
}

export const dateNow = (): string => {
    const now = new Date()
    return `${now.getFullYear()}-${addZeroToDate(now.getMonth() + 1)}-${addZeroToDate(now.getDate())}`
}

const addZeroToDate = (n: number): string => n < 10 ? `0${n}` : `${n}`

