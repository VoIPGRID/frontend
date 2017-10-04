import Loadable from 'react-loadable';
import LoadingComponent from './LoadingComponent';

export const AsyncNotification = Loadable({
  loader: () => import('../base/Notification'),
  loading: LoadingComponent
});

export const AsyncNavigation = Loadable({
  loader: () => import('../base/Navigation'),
  loading: LoadingComponent
});

export const AsyncPartnerList = Loadable({
  loader: () => import('../partners/PartnerList'),
  loading: LoadingComponent
});

export const AsyncPartnerForm = Loadable({
  loader: () => import('../partners/PartnerForm'),
  loading: LoadingComponent
});

export const AsyncClientAdmin = Loadable({
  loader: () => import('../clients/ClientAdmin'),
  loading: LoadingComponent
});

export const AsyncVoipAccounts = Loadable({
  loader: () => import('../clients/admin_modules/voip_accounts/VoipAccounts'),
  loading: LoadingComponent
});

export const AsyncClientUserList = Loadable({
  loader: () => import('../clients/admin_modules/users/ClientUserList'),
  loading: LoadingComponent
});

export const AsyncClientForm = Loadable({
  loader: () => import('../clients/ClientForm'),
  loading: LoadingComponent
});

export const AsyncClientList = Loadable({
  loader: () => import('../clients/ClientList'),
  loading: LoadingComponent
});

export const AsyncUserProfileForm = Loadable({
  loader: () => import('../users/UserProfileForm'),
  loading: LoadingComponent
});
