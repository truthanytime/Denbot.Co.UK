import { UPLOAD_PUBLIC_KEY } from "library/constant";

export const uploadImageFile = async file => {
    try {
        const response = await fetch(
            'https://api.upload.io/v2/accounts/W142hqB/uploads/binary',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${UPLOAD_PUBLIC_KEY}`,
                    'Content-Type': file.type,
                },
                body: file,
            },
        );
        const result = await response.json();
        console.log('Image Uploading result: ' + JSON.stringify(result));
        return result.fileUrl;
    } catch (error) {
        console.log('Upload error: ' + error.message);
    }
};