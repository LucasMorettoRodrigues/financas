export const formatDate = (date: Date): string => {
    console.log(date.getMonth());

    const brMonths = [
        'Dezembro', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro']

    return `${brMonths[date.getMonth()]} de ${date.getFullYear()}`
}

export const stringToDate = (date: string): Date => {
    const [year, month, day] = date.split('-')
    return new Date(parseInt(year), parseInt(month), parseInt(day))
}

