import service from '@/modules/auth/auth-service';
import Message from '@/shared/message/message';
import { i18n } from '@/i18n';
import Errors from '@/shared/error/errors';
import { routerAsync } from '@/app-module';
import ProgressBar from '@/shared/progress-bar/progress-bar';

export default {
  namespaced: true,

  state: {
    authenticationUser: null,
    currentUser: null,
    loadingInit: true,
    loadingEmailConfirmation: false,
    loadingPasswordResetEmail: false,
    loadingUpdateProfile: false,
    loading: false,
  },

  getters: {
    authenticationUser: (state) => state.authenticationUser,
    currentUser: (state) => state.currentUser,
    currentUserEmail: (state, getters) =>
      getters.currentUser
        ? getters.currentUser.email
        : null,
    currentUserFullName: (state, getters) =>
      getters.currentUser
        ? getters.currentUser.fullName
        : '',

    signedIn: (state, getters) =>
      !!getters.currentUser && !!getters.currentUser.id,

    roles: (state, getters) =>
      getters.currentUser
        ? getters.currentUser.roles || []
        : [],

    emptyPermissions: (state, getters) =>
      !getters.roles || !getters.roles.length,

    loading: (state) => !!state.loading,

    loadingInit: (state) => !!state.loadingInit,

    loadingEmailConfirmation: (state) =>
      !!state.loadingEmailConfirmation,

    loadingPasswordResetEmail: (state) =>
      !!state.loadingPasswordResetEmail,

    loadingUpdateProfile: (state) =>
      !!state.loadingUpdateProfile,

    currentUserNameOrEmailPrefix: (state, getters) => {
      if (!getters.currentUser) {
        return null;
      }

      if (
        getters.currentUserFullName &&
        getters.currentUserFullName.length < 25
      ) {
        return getters.currentUserFullName;
      }

      if (getters.currentUser.firstName) {
        return getters.currentUser.firstName;
      }

      return getters.currentUser.email.split('@')[0];
    },

    currentUserAvatar: (state, getters) => {
      if (
        !getters.currentUser ||
        !getters.currentUser.avatars ||
        !getters.currentUser.avatars.length ||
        !getters.currentUser.avatars[0].publicUrl
      ) {
        return null;
      }

      return getters.currentUser.avatars[0].publicUrl;
    },
  },

  mutations: {
    CURRENT_USER_REFRESH_SUCCESS(state, payload) {
      state.currentUser = payload.currentUser || null;
    },

    AUTH_START(state) {
      state.loading = true;
    },

    AUTH_SUCCESS(state, payload) {
      state.authenticationUser =
        payload.authenticationUser || null;
      state.currentUser = payload.currentUser || null;
      state.loading = false;
    },

    AUTH_ERROR(state) {
      state.authenticationUser = null;
      state.currentUser = null;
      state.loading = false;
    },

    EMAIL_CONFIRMATION_START(state) {
      state.loadingEmailConfirmation = true;
    },

    EMAIL_CONFIRMATION_SUCCESS(state) {
      state.loadingEmailConfirmation = false;
    },

    EMAIL_CONFIRMATION_ERROR(state) {
      state.loadingEmailConfirmation = false;
    },

    PASSWORD_RESET_START(state) {
      state.loadingPasswordResetEmail = true;
    },

    PASSWORD_RESET_SUCCESS(state) {
      state.loadingPasswordResetEmail = false;
    },

    PASSWORD_RESET_ERROR(state) {
      state.loadingPasswordResetEmail = false;
    },

    UPDATE_PROFILE_START(state) {
      state.loadingUpdateProfile = true;
    },

    UPDATE_PROFILE_SUCCESS(state) {
      state.loadingUpdateProfile = false;
    },

    UPDATE_PROFILE_ERROR(state) {
      state.loadingUpdateProfile = false;
    },

    AUTH_INIT_SUCCESS(state, payload) {
      state.authenticationUser =
        payload.authenticationUser || null;
      state.currentUser = payload.currentUser || null;
      state.loadingInit = false;
    },

    AUTH_INIT_ERROR(state) {
      state.authenticationUser = null;
      state.currentUser = null;
      state.loadingInit = false;
    },
  },

  actions: {
    async doInit({ commit, dispatch }) {
      await service.init();

      const unsubscribe = service.onAuthStateChanged(
        (authenticationUser) => {
          dispatch(
            'doSigninFromAuthChange',
            authenticationUser,
          );
          unsubscribe();
        },
        (error) => {
          console.error(error);
          commit('AUTH_INIT_ERROR');
        },
      );
    },

    async doWaitUntilInit({ getters }) {
      if (!getters.loadingInit) {
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        const waitUntilInitInterval = setInterval(() => {
          if (!getters.loadingInit) {
            clearInterval(waitUntilInitInterval);
            resolve();
          }
        }, 500);
      });
    },

    async doSendEmailConfirmation({ commit, getters }) {
      try {
        commit('EMAIL_CONFIRMATION_START');

        await service.sendEmailVerification(
          getters.authenticationUser,
        );

        Message.success(
          i18n('auth.verificationEmailSuccess'),
        );

        commit('EMAIL_CONFIRMATION_SUCCESS');
      } catch (error) {
        Errors.handle(error);
        commit('EMAIL_CONFIRMATION_ERROR');
      }
    },

    async doSendPasswordResetEmail({ commit }, email) {
      try {
        commit('PASSWORD_RESET_START');
        await service.sendPasswordResetEmail(email);
        Message.success(i18n('auth.passwordResetEmailSuccess'));
        commit('PASSWORD_RESET_SUCCESS');
      } catch (error) {
        Errors.handle(error);
        commit('PASSWORD_RESET_ERROR');
      }
    },

    async doSigninSocial(
      { commit },
      { provider, rememberMe },
    ) {
      try {
        commit('AUTH_START');

        let authenticationUser = null;
        let currentUser = null;

        const credentials = await service.signinWithSocial(
          provider,
          rememberMe,
        );

        if (credentials && credentials.user) {
          authenticationUser = credentials.user;
          currentUser = await service.fetchMe();
          currentUser.emailVerified =
            authenticationUser.emailVerified;
        }

        // in background
        service.reauthenticateWithStorageToken();

        commit('AUTH_SUCCESS', {
          currentUser,
          authenticationUser,
        });

        routerAsync().push('/');
      } catch (error) {
        await service.signout();
        Errors.handle(error);
        commit('AUTH_ERROR');
      }
    },

    async doRegisterEmailAndPassword(
      { commit },
      { email, password },
    ) {
      try {
        commit('AUTH_START');

        const authenticationUser = await service.registerWithEmailAndPassword(
          email,
          password,
        );
        const currentUser = await service.fetchMe();
        currentUser.emailVerified =
          authenticationUser.emailVerified;

        // in background
        service.reauthenticateWithStorageToken();

        commit('AUTH_SUCCESS', {
          currentUser,
          authenticationUser,
        });

        routerAsync().push('/');
      } catch (error) {
        await service.signout();
        Errors.handle(error);
        commit('AUTH_ERROR');
      }
    },

    async doSigninWithEmailAndPassword(
      { commit },
      { email, password, rememberMe },
    ) {
      try {
        commit('AUTH_START');

        let authenticationUser = null;
        let currentUser = null;

        const credentials = await service.signinWithEmailAndPassword(
          email,
          password,
          rememberMe,
        );

        if (credentials && credentials.user) {
          authenticationUser = credentials.user;
          currentUser = await service.fetchMe();
          currentUser.emailVerified =
            authenticationUser.emailVerified;
        }

        // in background
        service.reauthenticateWithStorageToken();

        commit('AUTH_SUCCESS', {
          currentUser,
          authenticationUser,
        });

        routerAsync().push('/');
      } catch (error) {
        await service.signout();
        Errors.handle(error);
        commit('AUTH_ERROR');
      }
    },

    async doSignout({ commit }) {
      try {
        commit('AUTH_START');
        await service.signout();

        commit('AUTH_SUCCESS', {
          authenticationUser: null,
          currentUser: null,
        });

        routerAsync().push('/auth/signin');
      } catch (error) {
        Errors.handle(error);
        commit('AUTH_ERROR');
      }
    },

    async doSigninFromAuthChange(
      { commit },
      authenticationUser,
    ) {
      try {
        let currentUser = null;

        if (authenticationUser) {
          currentUser = await service.fetchMe();

          // in background
          service.reauthenticateWithStorageToken();

          currentUser.emailVerified =
            authenticationUser.emailVerified;
        }

        commit('AUTH_INIT_SUCCESS', {
          currentUser,
          authenticationUser: authenticationUser,
        });

        ProgressBar.done();
      } catch (error) {
        service.signout();
        Errors.handle(error);
        commit('AUTH_INIT_ERROR', error);
        ProgressBar.done();
      }
    },

    async doRefreshCurrentUser({ commit, getters }) {
      try {
        const authenticationUser =
          getters.authenticationUser;
        const currentUser = await service.fetchMe();
        currentUser.emailVerified =
          authenticationUser.emailVerified;

        // in background
        service.reauthenticateWithStorageToken();

        commit('CURRENT_USER_REFRESH_SUCCESS', {
          currentUser,
        });
      } catch (error) {
        service.signout();
        Errors.handle(error);

        commit('CURRENT_USER_REFRESH_ERROR', error);
      }
    },

    async doUpdateProfile(
      { commit, dispatch },
      { firstName, lastName, phoneNumber, avatars },
    ) {
      try {
        commit('UPDATE_PROFILE_START');

        await service.updateProfile(
          firstName,
          lastName,
          phoneNumber,
          avatars,
        );

        commit('UPDATE_PROFILE_SUCCESS');
        await dispatch('doRefreshCurrentUser');
        Message.success(i18n('auth.profile.success'));
        routerAsync().push('/');
      } catch (error) {
        Errors.handle(error);
        commit('UPDATE_PROFILE_ERROR');
      }
    },
  },
};
