import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tempFolder = path.resolve(__dirname, '..', '..', 'temp');

const uploadConfig = {
  directory: uploadFolder,
  tempFolder,
  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');

      const filename = `${fileHash}-${file.originalname}`;

      callback(null, filename);
    },
  }),
};

export default uploadConfig;
