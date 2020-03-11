import Permissions from '@/security/permissions';
import PermissionChecker from '@/modules/iam/permission-checker';

export class ProductPermissions {
  constructor(currentUser) {
    const permissionChecker = new PermissionChecker(
      currentUser,
    );

    this.read = permissionChecker.match(
      Permissions.values.productRead,
    );
    this.import = permissionChecker.match(
      Permissions.values.productImport,
    );
    this.productAutocomplete = permissionChecker.match(
      Permissions.values.productAutocomplete,
    );
    this.create = permissionChecker.match(
      Permissions.values.productCreate,
    );
    this.edit = permissionChecker.match(
      Permissions.values.productEdit,
    );
    this.destroy = permissionChecker.match(
      Permissions.values.productDestroy,
    );
  }
}
