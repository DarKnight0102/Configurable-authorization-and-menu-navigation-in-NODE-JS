import Error from '../../utils/error';
import AppRoleResourceService from '../../services/AppRoleResource';
import AppResourceService from '../../services/AppResource';

export default class Auth {
  constructor() {
    this.appRoleResourceService = new AppRoleResourceService();
    this.appResourceService = new AppResourceService();
  }

  async getResources(AppRoleIds) {
    const res = [];
    for (const AppRoleId of AppRoleIds) {
      const appRoleResource = await this.appRoleResourceService.findAppRoleResource({
        AppRoleId,
      });
      for (const _id of appRoleResource[0].resourceId) {
        const resource = await this.appResourceService.findAppResource({
          _id,
        });
        res.push(resource[0].resourcePath);
      }
    }
    return res;
  }
}

export const authorized = async (req, res, next) => {
  if (!req.user) {
    return next(new Error('Bad Request', 401));
  }

  const isAdmin = Boolean(req.session.isAdmin);
  if (isAdmin) {
    return next();
  }

  if (req.session.resources) {
    const urls = req.session.resources.map(e => e.resourcePath.toLowerCase());
    console.log('test-url:', urls, req.originalUrl);
    if (!urls.includes(req.originalUrl.toLowerCase())) {
      return next(new Error('You do not have permission to perform this action.', 403));
    }
  }

  next();
};
