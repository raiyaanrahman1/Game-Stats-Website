import { useState } from "react";
import { getUserProfile, updateDescription } from "../../actions/user";

const ProfileIcon = ({ userProfile, myProfile }) => {
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
    <div className="profile-left">
      <div className="profile-name-desc">
        <h4> {userProfile.username} </h4>
        <h5> {userProfile.description} </h5>
        {showEditDesc ? (
          <div className="game-addReview">
            <form onSubmit={(e) => onSubmitDesc(e)}>
              <label>
                Description: <br />
                <textarea
                  type="text"
                  name="description_editor"
                  className="game-addReview-input"
                  onChange={(e) => setDescription(e.target.value)}
                >
                  {userProfile.description}
                </textarea>
              </label>
              <br />
              <input type="submit" value="Submit" />
              <button onClick={() => setShowEditDesc(!showEditDesc)}>
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <p></p>
        )}
      </div>
      <div>
        {myProfile ? (
          <button
            onClick={() => setShowEditDesc(!showEditDesc)}
            className="profile-btn"
          >
            Edit Description
          </button>
        ) : (
          <p></p>
        )}
      </div>
      <div className="profile-hardware"></div>
    </div>
  );
};

export default ProfileIcon;
