import React, { Component, Fragment } from 'react';
import ProgressIndeterminate from './ProgressIndeterminate';
import ErrorAlert from './ErrorAlert';

import settingsJson from '../settings.json';
import PlusOneList from './PlusOneList';
import CommentList from './CommentList';
import UserImage from './UserImage';
import UserName from './UserName';
import CommunityName from './CommunityName';
import MediaList from './MediaList';
import Album from './Album';
import LinkItem from './LinkItem';
import Poll from './Poll';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
      isFetching: false,
      error: null,
    };
  }

  async componentDidMount() {
    try {
      this.setState({ error: null, isFetching: true });

      const id = this.props.match.params.id;
      let url = `/posts/${id}.json`;

      const basename = settingsJson.basename;

      if(basename !== '')
        url = `/${basename}/${url}`;

      const response = await fetch(url);

      if (!response.ok) {
        this.setState({
          error: `Cannot fetch post at ${url}`,
          isFetching: false,
        });
        return;
      }

      const post = await response.json();

      this.setState({ post: post, isFetching: false, error: null });
    }
    catch (e) {
      this.setState({ error: e, isFetching: false });
    }
  }

  render() {
    const { post = {}, isFetching = true, error = null } = this.state;
    const {
      creationTime = '', author = {}, content = '', media = {}, url, link = {}, album = {}, postAcl = {}, poll,
      comments = [], plusOnes = []
    } = post || {};
    const { communityAcl = {} } = postAcl || {};
    const { community } = communityAcl || {};

    const creationDate = new Date(creationTime);

    return (
      <Fragment>
        {isFetching && (
          <ProgressIndeterminate/>
        )}

        <ErrorAlert error={error} canClose={false}/>

        <UserImage user={author}/>
        <UserName user={author}/>

        {community && community.displayName && (
          <Fragment>
            <i className="fas fa-caret-right mr-1"></i>
            <CommunityName community={community}/>
          </Fragment>
        )}

        <small className="text-muted ml-5 text-secondary">
          {creationDate.toLocaleString()}
        </small>

        <div className="mt-3" dangerouslySetInnerHTML={{ __html: content }}/>

        <br />
        <MediaList media={media}/>
        <LinkItem link={link}/>
        <Album album={album}/>
        <Poll poll={poll}/>

        <br/>
        <a href={url}>View Original G+ Post</a>

        <CommentList comments={comments}/>

        <PlusOneList plusOnes={plusOnes}/>

      </Fragment>
    );
  }
}

export default Post;
