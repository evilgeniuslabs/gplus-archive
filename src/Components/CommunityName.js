import React from 'react';

class CommunityName extends React.Component {
  render() {
    const { community = {} } = this.props;
    const { resourceName, displayName } = community;

    return (
      <a href={`https://plus.google.com/${resourceName}`} className="text-secondary">{displayName}</a>
    );
  }
}

export default CommunityName;
