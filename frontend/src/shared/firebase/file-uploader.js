import * as firebase from 'firebase/app';
import 'firebase/storage';
import * as uuid from 'uuid/v4';
import { i18n } from '@/i18n';
import filesize from 'filesize';

function extractExtensionFrom(filename) {
  if (!filename) {
    return null;
  }

  const regex = /(?:\.([^.]+))?$/;
  return regex.exec(filename)[1];
}

export class FileUploader {
  static validate(file, schema) {
    if (!schema) {
      return;
    }

    if (schema.image) {
      if (!file.type.startsWith('image')) {
        throw new Error(i18n('fileUploader.image'));
      }
    }

    if (schema.size && file.size > schema.size) {
      throw new Error(
        i18n('fileUploader.size', filesize(schema.size)),
      );
    }

    const extension = extractExtensionFrom(file.name);

    if (
      schema.formats &&
      !schema.formats.includes(extension)
    ) {
      throw new Error(
        i18n(
          'fileUploader.formats',
          schema.formats.join('/'),
        ),
      );
    }
  }

  static uploadFromRequest(path, request, schema) {
    try {
      FileUploader.validate(request.file, schema);
    } catch (error) {
      request.onError(error);
      return;
    }

    const ref = firebase.storage().ref();
    const extension = extractExtensionFrom(
      request.file.name,
    );
    const id = uuid();
    const fullPath = `${path}/${id}.${extension}`;
    const task = ref.child(fullPath).put(request.file);

    task.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const percent =
          (snapshot.bytesTransferred /
            snapshot.totalBytes) *
          100;

        setTimeout(() => {
          request.onProgress({ percent });
        }, 0);
      },
      (error) => {
        request.onError(error);
      },
      () => {
        task.snapshot.ref
          .getDownloadURL()
          .then((url) => {
            request.onSuccess({
              id: id,
              name: request.file.name,
              sizeInBytes: task.snapshot.totalBytes,
              privateUrl: fullPath,
              publicUrl: url,
              new: true,
            });
          })
          .catch((error) => {
            request.onError(error);
          });
      },
    );
  }
}
