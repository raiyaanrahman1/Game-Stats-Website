import React from 'react'
import ProfileIcon from './ProfileIcon'
import ProfileGames from './ProfileGames'
import ProfileReviews from './ProfileReviews'
// TODO: display different vision depending on whether user is loggedIn

function Profile() {
    return (
        <div className="profile-page">
            <ProfileIcon />
            <ProfileGames />
            <ProfileReviews />
        </div>
    )
}

export default Profile
