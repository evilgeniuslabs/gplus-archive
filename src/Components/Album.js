import React, { Component, Fragment } from 'react';


class Album extends Component {
  render() {
    const { album = {} } = this.props;
    const { media } = album;

    if (!media)
      return (
        <Fragment/>
      );

    return media.map((item) => {
      if (item.contentType === "image/*" && item.url) {
        return (
          <div key={item.url} className="my-2">
            <a href={item.url}><img src={item.url} height='360' alt='media'/></a>
          </div>
        );
      }
      else if (item.contentType === "video/*" && item.url) {
        return (
          <div key={item.url} className="my-3">
            <a href={item.url}>
              <i className="far fa-play-circle"/> Media
            </a>
          </div>
        );
      }

      return null;
    });
  }
}

export default Album;
