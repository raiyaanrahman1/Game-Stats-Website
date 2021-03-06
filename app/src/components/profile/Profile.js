import ProfileIcon from "./ProfileIcon";
import ProfileGames from "./ProfileGames";
import ProfileReviews from "./ProfileReviews";
import { useLocation } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import { getUserProfile } from "../../actions/user";

function Profile({ loggedIn, user, gameIcons }) {
  const [userProfile, setUserProfile] = useState(null);
  const location = useLocation();
  const username = location.pathname.split("/").at(-1);
  useEffect(() => {
    getUserProfile(username, setUserProfile);
  }, []);

  console.log(userProfile);
  if (userProfile && user === username) {
    return (
      <div className="profile-page">
        <ProfileIcon
          userProfile={userProfile}
          myProfile={true}
          gameIcons={gameIcons}
        />
        <ProfileGames
          userProfile={userProfile}
          myProfile={true}
          gameIcons={gameIcons}
        />
        <ProfileReviews
          userProfile={userProfile}
          myProfile={true}
          gameIcons={gameIcons}
        />
      </div>
    );
  } else if (userProfile) {
    return (
      <div className="profile-page">
        <ProfileIcon
          userProfile={userProfile}
          myProfile={true}
          gameIcons={gameIcons}
        />
        <ProfileGames
          userProfile={userProfile}
          myProfile={true}
          gameIcons={gameIcons}
        />
        <ProfileReviews
          userProfile={userProfile}
          myProfile={true}
          gameIcons={gameIcons}
        />
      </div>
    );
  } else {
    return <div>User does not exists.</div>;
  }
}

export default Profile;
