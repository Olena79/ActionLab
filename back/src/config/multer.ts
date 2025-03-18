import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from './cloudinary'

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'photos',
    format: async () => 'jpeg',
    public_id: (
      req: Express.Request,
      file: Express.Multer.File,
    ) => file.originalname.split('.')[0],
  } as any,
})

const upload = multer({ storage })

export default upload
