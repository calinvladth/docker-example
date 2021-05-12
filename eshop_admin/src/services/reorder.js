export const ReorderArray = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return AddIndex(result);
}

const AddIndex = (list) => {
    const arr = []
    list.forEach((o, index) => arr.push({
        ...o,
        index: index
    }))
    return arr
}

export const OrderByIndex = (list) => {
    const arr = list.sort((a, b) => {
        return a.index - b.index
    })
    return arr
}