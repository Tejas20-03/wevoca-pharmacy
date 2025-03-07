interface imageLoader {
    src: string,
    quality: number,
}

export const imageLoaderFunc = ({ src, quality }: imageLoader) => {
    return `${src}&q=${quality || 75}`
}