export const getLocTime = (locTime: string): number | undefined => {
    const parsedLocTime = parseInt(locTime)
    const diviseResult = Math.floor(parsedLocTime / 3)

    if (parsedLocTime / 3 === diviseResult) {
        return parsedLocTime
    } else {
        for (let i = 2; i > 0; i--) {
            if ((parsedLocTime - i) / 3 === diviseResult) return parsedLocTime - i
        }
    }
}