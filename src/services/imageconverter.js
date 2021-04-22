import { Convert } from 'mongo-image-converter'
export const imageConverter = async (image, name) => {
    try {
        const convertedImage = await Convert(image)
        if (convertedImage) {
            const image = {
                image: convertedImage,
                image_name: name
            };
            return image;
        } else {
            return 'The file is not in format of image/jpeg or image/png';
        }
    }
    catch (error) {
        console.error(error.message)
    }
}