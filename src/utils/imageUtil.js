const images = import.meta.glob('/src/assets/events/*.{png,jpg,jpeg,svg}', { eager: true })

export const getEventImage = (imageName) => {
    if (!imageName) return null

    for (const path in images) {

        if (path.includes(imageName)) {

            return images[path].default
        }
    }

    return null
}