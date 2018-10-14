import React from 'react';

class UserImage extends React.Component {
  render() {
    const { user = {} } = this.props;
    const { profilePageUrl, avatarImageUrl, displayName } = user;

    return (
      <a className="mr-2" href={profilePageUrl}>
        <img src={avatarImageUrl} alt={displayName} width='36' height='36'
             style={{ borderRadius: '50%' }}/>
      </a>
    );
  }
}

export default UserImage;
