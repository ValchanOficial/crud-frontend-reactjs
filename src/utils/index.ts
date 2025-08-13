export const formatBirthDate = (date: string | null): string => {
  /// 1994-07-16T00:00:00.000Z to 16 de julho de 1994
  if (!date) return 'Data inválida';

  const [year, month, day] = date.split('T')[0].split('-');

  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  return `${day} de ${months[Number(month) - 1]} de ${year}`;
};
