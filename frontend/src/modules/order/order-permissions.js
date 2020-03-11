import Permissions from '@/security/permissions';
import PermissionChecker from '@/modules/iam/permission-checker';

export class OrderPermissions {
  constructor(currentUser) {
    const permissionChecker = new PermissionChecker(
      currentUser,
    );

    this.read = permissionChecker.match(
      Permissions.values.orderRead,
    );
    this.import = permissionChecker.match(
      Permissions.values.orderImport,
    );
    this.orderAutocomplete = permissionChecker.match(
      Permissions.values.orderAutocomplete,
    );
    this.create = permissionChecker.match(
      Permissions.values.orderCreate,
    );
    this.edit = permissionChecker.match(
      Permissions.values.orderEdit,
    );
    this.destroy = permissionChecker.match(
      Permissions.values.orderDestroy,
    );
  }
}
