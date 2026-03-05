import React from 'react'
import { ProfileImg } from "@/components";
import HeaderSkeleton from "@/components/loader/headerSkeleton";
import { useAccessControl } from "@/hooks/useAccessControl";
import Link from "next/link";
// import { Notification } from '../assets'
// import { ProfileImg } from '../components/controls';

const Navbar = ({ module = "default" }) => {
  // const { user } = useSelector((state) => state.auth);
  // const { user } = useSelector(state => state.auth);
  const { checkRoleAccess } = useAccessControl();
  const user = {
    id: 1,
    // name: "Khan"
  };
  return (
    <header className='header'>
      <div className="admin-logo-header">
        <Link href="/adminpanel"><img src="/images/new-theme/lokmanya-new-png-logo.webp" alt="app-logo" /></Link>
      </div>
      <div className="header-profile-sec">
        {checkRoleAccess(['super_admin', 'admin'], []) && <Link href='/adminpanel/user-access-listing' className='access-panel d-none'><button type='button' aria-label='access-panel'> Access Panel</button></Link>}
        {(user &&
          <div className="header-profile-sec">
            <ProfileImg />
            <div className="user-info">
              <p className="header-user-name ellipsis text-nowrap m-0">
                {user?.name}
              </p>
            </div>
          </div>
        ) || <HeaderSkeleton />}
      </div>
    </header>
  );
};

export default Navbar;
