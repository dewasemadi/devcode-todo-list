export const sort = (data?: Array<any>, type: string = '') => {
  switch (type) {
    case 'sort-latest':
      return [...data!].sort(({ id: a }: any, { id: b }: any) => (a === b ? 0 : a > b ? -1 : 1))
    case 'sort-oldest':
      return [...data!]?.sort(({ id: a }: any, { id: b }: any) => (a === b ? 0 : a < b ? -1 : 1))
    case 'sort-az':
      const sortAz = [...data!]?.sort(({ title: a }: any, { title: b }: any) => {
        const x = a.toLowerCase()
        const y = b.toLowerCase()
        return x === y ? 0 : x < y ? -1 : 1
      })
      return sortAz
    case 'sort-za':
      const sortZa = [...data!]?.sort(({ title: a }: any, { title: b }: any) => {
        const x = a.toLowerCase()
        const y = b.toLowerCase()
        return x === y ? 0 : x > y ? -1 : 1
      })
      return sortZa
    case 'sort-unfinished':
      return [...data!]?.sort(({ is_active: a }: any, { is_active: b }: any) =>
        a === b ? 0 : a > b ? -1 : 1
      )
    default:
      return true
  }
}
