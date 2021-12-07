import ProfileIcon from "./ProfileIcon";
import ProfileGames from "./ProfileGames";
import ProfileReviews from "./ProfileReviews";
import { useLocation } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import { getUserProfile } from "../../actions/user";

function Profile({ loggedIn, user }) {
  const [userProfile, setUserProfile] = useState(null);
  const location = useLocation();
  const username = location.pathname.split("/").at(-1);
  useEffect(() => {
    getUserProfile(username, setUserProfile);
  }, []);

  if (userProfile && user === username) {
    return (
      <div className="profile-page">
        <ProfileIcon userProfile={userProfile} myProfile={true} />
        <ProfileGames userProfile={userProfile} myProfile={true} />
        <ProfileReviews userProfile={userProfile} myProfile={true} />
      </div>
    );
  } else if (userProfile) {
    return (
      <div className="profile-page">
        <ProfileIcon userProfile={userProfile} myProfile={false} />
        <ProfileGames userProfile={userProfile} myProfile={false} />
        <ProfileReviews userProfile={userProfile} myProfile={false} />
      </div>
    );
  } else {
    return <div>User does not exists.</div>;
  }
}

export default Profile;
