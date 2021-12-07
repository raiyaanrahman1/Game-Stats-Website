const ProfileIcon = ({ userProfile, myProfile }) => {
  useEffect(() => {
    // Your code here
  }, []);

  return (
    <div className="profile-left">
      <div className="sample-profile-image"> Sample Image </div>
      <div className="profile-name-desc">
        <h4> {userProfile.username} </h4>
        <h5>{userProfile.description}</h5>
      </div>
      <div>
        <button className="profile-btn">Add Friend</button>
        <button className="profile-btn">Like Profile</button>
      </div>
      <div className="profile-hardware">
        <h6>Hardware goes here, idk how we wanna format this tbh</h6>
      </div>
    </div>
  );
};

export default ProfileIcon;
