export const formatDate = (ISO_date: string) => {
  const date = new Date(ISO_date)
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ]
  const day = date.getDate()
  const month_idx = date.getMonth()
  const year = date.getFullYear()
  return `${day} ${months[month_idx]} ${year}`
}
