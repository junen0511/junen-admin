import Authorized from './Authorized';
import AuthorizedRoute from './AuthorizedRoute';
import check from './CheckPermissions';
import renderAuthorize from './renderAuthorize';

Authorized.AuthorizedRoute = AuthorizedRoute;
Authorized.check = check;

export default renderAuthorize(Authorized);
