
import multer from "multer";

// configuring multer for memory storage not for disk storage;

const storage = multer.memoryStorage();
const upload = multer({storage});

export default upload;