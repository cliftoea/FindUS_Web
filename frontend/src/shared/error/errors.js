import { i18n, i18nExists } from '@/i18n';
import { routerAsync } from '@/app-module';
import Message from '@/shared/message/message';

const DEFAULT_ERROR_MESSAGE = i18n(
  'errors.defaultErrorMessage',
);

function isFirebaseAuthError(error) {
  return error.code && error.code.startsWith('auth');
}

function selectErrorMessage(error) {
  if (error && error.response && error.response.data) {
    const data = error.response.data;

    if (data.error && data.error.message) {
      return data.error.message;
    }

    return String(data);
  }

  if (isFirebaseAuthError(error)) {
    if (i18nExists(`firebaseErrors.${error.code}`)) {
      return i18n(`firebaseErrors.${error.code}`);
    }

    return DEFAULT_ERROR_MESSAGE;
  }

  return error.message || DEFAULT_ERROR_MESSAGE;
}

function selectErrorCode(error) {
  if (error && error.response && error.response.status) {
    return error.response.status;
  }

  if (isFirebaseAuthError(error)) {
    return 400;
  }

  return 500;
}

export default class Errors {
  static handle(error) {
    if (process.env.NODE_ENV !== 'test') {
      console.error(selectErrorMessage(error));
      console.error(error);
    }

    if (selectErrorCode(error) === 403) {
      routerAsync().push('/403');
      return;
    }

    if (selectErrorCode(error) === 400) {
      Message.error(selectErrorMessage(error));
      return;
    }

    routerAsync().push('/500');
  }

  static errorCode(error) {
    return selectErrorCode(error);
  }

  static selectMessage(error) {
    return selectErrorMessage(error);
  }

  static showMessage(error) {
    Message.error(selectErrorMessage(error));
  }
}
