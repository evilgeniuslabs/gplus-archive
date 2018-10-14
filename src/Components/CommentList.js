import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import UserImage from './UserImage';
import UserName from './UserName';


class CommentList extends Component {
  render() {
    const { comments } = this.props;

    if (!comments || comments.length < 1)
      return (
        <Fragment/>
      );

    const hash = this.props.location.hash;

    return (
      <Fragment>
        <hr/>
        <h6 className="mt-3">Comments</h6>
        <hr/>
        <ul className="list-unstyled">
          {comments.map((comment, index) => {
            const { author, creationTime, content, media, link } = comment;
            const created = new Date(creationTime);

            let mediaItem = null;
            if (media && media.url && media.contentType === 'image/*') {
              mediaItem = (
                <a href={media.url}>
                  <img src={media.url} alt='' height='205'/>
                </a>
              );
            }

            let linkItem = null;
            if (link && link.url) {
              if (link.imageUrl) {
                linkItem = (
                  <a href={link.url}>
                    <img src={link.imageUrl} alt={link.title} height='72' className="mr-1"/>
                    {link.title}
                  </a>
                );
              }
              else if (link.title) {
                linkItem = (
                  <a href={link.url}>{link.title}</a>
                );
              }
            }

            const id = `comment-${index}`;

            let className = 'media mb-2 p-1';
            let border = null;

            const isSelected = hash === '#' + id;

            if (isSelected) {
              className += ' bg-light';
              border = '1px solid';
            }

            return (
              <li key={index} id={id} className={className} style={{ border: border, borderRadius: '18px' }}>
                <UserImage user={author}/>
                <div className="media-body">
                  <h6 className="mt-0 mb-1">
                    <UserName user={author}/>
                    <small className="text-muted ml-5 text-secondary">
                      <a href={`#${id}`} className="text-secondary">{created.toLocaleString()}</a>
                    </small>
                    {isSelected && (
                      <i className="fas fa-star ml-3"/>
                    )}
                  </h6>
                  {comment.content && (
                    <div dangerouslySetInnerHTML={{ __html: content }}/>
                  )}
                  {mediaItem}
                  {linkItem}
                </div>
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  }
}

export default withRouter(CommentList);
