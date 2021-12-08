import { useState } from "react";
import { getUserProfile, updateDescription } from "../../actions/user";

const SubProfile = ({ userProfile, myProfile }) => {
  const [userProfileState, setUserProfileState] = useState(userProfile);
  const [showEditDesc, setShowEditDesc] = useState(false);
  const [description, setDescription] = useState(userProfile.description);
  console.log(userProfile);
  console.log(description);

  const onSubmitDesc = (e) => {
    e.preventDefault();

    console.log(description);
    updateDescription(userProfile.username, description);
    getUserProfile(userProfile.username, setUserProfileState);
    setShowEditDesc(!showEditDesc);
  };

  return (
    <div>
      <h3>{userProfile.username}</h3>
      <h4>{userProfile.description}</h4>

      <div className></div>
    </div>
  );
};

export default SubProfile;
