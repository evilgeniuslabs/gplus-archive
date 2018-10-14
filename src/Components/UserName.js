import React from 'react';

class UserName extends React.Component {
  render() {
    const { user = {} } = this.props;
    const { profilePageUrl, displayName } = user;

    return (
      <a href={profilePageUrl} className="text-body mr-2">{displayName}</a>
    );
  }
}

export default UserName;
