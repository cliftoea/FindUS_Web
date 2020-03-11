import Permissions from '@/security/permissions';
import PermissionChecker from '@/modules/iam/permission-checker';

export class CustomerPermissions {
  constructor(currentUser) {
    const permissionChecker = new PermissionChecker(
      currentUser,
    );

    this.read = permissionChecker.match(
      Permissions.values.customerRead,
    );
    this.import = permissionChecker.match(
      Permissions.values.customerImport,
    );
    this.customerAutocomplete = permissionChecker.match(
      Permissions.values.customerAutocomplete,
    );
    this.create = permissionChecker.match(
      Permissions.values.customerCreate,
    );
    this.edit = permissionChecker.match(
      Permissions.values.customerEdit,
    );
    this.destroy = permissionChecker.match(
      Permissions.values.customerDestroy,
    );
  }
}
