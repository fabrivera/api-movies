import cloudinary from 'cloudinary'

cloudinary.v2.config({ 
    cloud_name: 'des1wmoy4', 
    api_key: '736815393194356', 
    api_secret: 'XdkZenXHGfoEBc_jiUtsWYWZKbU' 
})

export default async (image:string) => {
    const img = await cloudinary.v2.uploader.upload(image)
    return img.url
}
