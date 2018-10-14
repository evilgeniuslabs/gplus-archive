import React, { Component, Fragment } from 'react';


class LinkItem extends Component {
  render() {
    const { link } = this.props;

    if (!link || !link.url)
      return (
        <Fragment/>
      );

    return (
      <Fragment>
        <hr/>
        <h4>
          <a href={link.url}>{link.title}</a>
        </h4>
        {link.imageUrl && (
          <a href={link.url}>
            <img src={link.imageUrl} alt={link.title} height='360'/>
          </a>
        )}
      </Fragment>
    );
  }
}

export default LinkItem;
