
import { AuthData } from "./AuthWrapper"

const PermissionButton = ({ allowedPermissions, children }) => {
  const { user } = AuthData()
  // console.log("Permission User", allowedPermissions, user)
  const isVisible = () => {
    let visible = false
    allowedPermissions.forEach((permission) => {
      if (user.permissions?.includes(permission)) {
        visible = true;
      }
    });
    return visible
  }

  return isVisible() ? children : null;
}
export default PermissionButton;


