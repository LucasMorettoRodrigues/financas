export const formatDate = (date: Date): string => {
    const brMonths = [
        'Dezembro', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Seletembro', 'Outubro', 'Novembro']

    return `${brMonths[date.getMonth()]} de ${date.getFullYear()}`
}

