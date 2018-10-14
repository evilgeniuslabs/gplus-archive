import React, { Component, Fragment } from 'react';


class MediaList extends Component {
  render() {
    const { media } = this.props;

    if (!media)
      return (
        <Fragment/>
      );

    const { url } = media;

    if (!url)
      return (
        <Fragment/>
      );

    if (url.startsWith("http://www.youtube.com/watch?v\u003d")) {
      const mediaId = url.substring(31, 43);
      return (
        <Fragment>
          <iframe width='480' height='360' title={media.description} src={`http://www.youtube.com/embed/${mediaId}`}
                  frameBorder='0' allow="autoplay; encrypted-media" allowFullScreen={true}/>
          <br />
          <a href={url} className="mb-3">
            <i className="far fa-play-circle"/> Play Media
          </a>
        </Fragment>
      );
    } else if (url.startsWith("https://www.youtube.com/watch?v\u003d")) {
      const mediaId = url.substring(32, 43);
      return (
        <Fragment>
          <iframe width='480' height='360' title={media.description} src={`https://www.youtube.com/embed/${mediaId}`}
                  frameBorder='0' allow="autoplay; encrypted-media" allowfullscreen/>
          <a href={url} className="mb-3">
            <i className="far fa-play-circle"/> Play Media
          </a>
        </Fragment>
      );
    } else if (media.contentType === "video/*" && url != null) {
      return (
        <Fragment>
          <br/>
          <a href={url} className="mb-3">
            <i className="far fa-play-circle"/> Play Media
          </a>
        </Fragment>
      );
    } else if (media.contentType === "image/*" && url != null) {
      return (
        <a href={url}>
          <img src={url} alt={media.description} height='360'/>
        </a>
      );
    }

    return (
      <Fragment/>
    );
  }
}

export default MediaList;
