namespace Utils {
    export function toQueryString(query?: {[key: string]: any}): string {
        if (!query) {
            return '';
        }
        return Object.keys(query).reduce((acc, key, index) => {
            const sep = index ? '&' : '?';
            return `${acc}${sep}${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        }, '')
    }
}

export default Utils;
