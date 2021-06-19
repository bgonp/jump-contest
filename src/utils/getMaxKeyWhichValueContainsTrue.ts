const getMaxKeyWhichValueContainsTrue = (
  records: Record<number, boolean[] | null>
): number =>
  Object.entries(records).reduce((max, [key, value]) => {
    const height = parseInt(key)
    if (height > max && value !== null && value.includes(true)) return height
    return max
  }, 0)

export default getMaxKeyWhichValueContainsTrue
