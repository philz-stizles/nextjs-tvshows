export const isEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export const exists = (value) => {
    return value.trim() !== ''
}