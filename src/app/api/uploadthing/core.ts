import type { FileRouter } from 'uploadthing/next';

import { requireUser } from '@/app/utils/requireUser';

import { createUploadthing } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const session = await requireUser();

      // If you throw, the user will not be able to upload
      if (!session.id) {
        throw new UploadThingError('Unauthorized');
      }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, ufsUrl: file.ufsUrl };
    }),

  resumeUploader: f({
    'application/pdf': {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: '8MB',
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const session = await requireUser();

      // If you throw, the user will not be able to upload
      if (!session.id) {
        throw new UploadThingError('Unauthorized');
      }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.id };
    })
    .onUploadComplete(async ({ metadata }) => {
      // This code RUNS ON YOUR SERVER after upload

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
