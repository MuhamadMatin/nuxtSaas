import { v2 as cloudinary } from 'cloudinary';
import { connectCloudinary } from "~~/server/utils/cloudinary";
import type { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { incrementLimit } from '~~/server/services/user-limit';

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event);
  const file = formData.get("image") as File
  const object = formData.get('object')

  if (!file) {
    throw createError({
      statusCode: 400,
      statusMessage: "No image provided"
    });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await connectCloudinary();

  const uploadFromBuffer = (): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error || !result) {
          return reject(error || new Error("Upload Failed"))
        }
        resolve(result);
      });
      uploadStream.end(buffer);
    })
  };
  const result = await uploadFromBuffer();
  const imageUrl = cloudinary.url(result.public_id, {
    transformation: [{
      effect: `gen_remove:prompt_${object}`
    }],
    resource_type: 'image',
    secure: true
  });

  await incrementLimit(event.context.user.id)

  return imageUrl;
})