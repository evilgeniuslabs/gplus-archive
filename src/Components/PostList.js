import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { firstBy } from 'thenby';

import UserImage from './UserImage';
import UserName from './UserName';
import CommunityName from './CommunityName';
import ProgressIndeterminate from './ProgressIndeterminate';
import ErrorAlert from './ErrorAlert';
import settingsJson from '../settings.json';
import Pagination from './Pagination';

class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: null,
      search: '',
      isFetching: false,
      error: null,
      per_page: 10,
      page: 1,
    };

    this.isUpdating = false;
  }

  async componentDidMount() {
    this.setState({ error: null, isFetching: true });

    let url = `/posts/index.json`;

    const basename = settingsJson.basename;

    if (basename !== '')
      url = `/${basename}/${url}`;

    let response = null;

    try {
      response = await fetch(url);

      if (!response.ok) {
        this.setState({
          error: await ErrorAlert.getResponseError(response),
          isFetching: false,
        });
        return;
      }

    }
    catch (e) {
      this.setState({
        error: e,
        isFetching: false,
      });
      return;
    }

    const index = await response.json();

    const { location } = this.props;

    const query = new URLSearchParams(location.search);
    const search = query.get('search');
    const page = parseInt(query.get('page'), 10);

    this.setState({ index: index, search: search || '', page: page, isFetching: false, error: null });

    this.performSearch(search, page);
  }

  async componentDidUpdate(prevProps) {
    if (this.isUpdating)
      return;

    // console.log('componentDidUpdate');

    this.isUpdating = true;

    try {
      const { location: prevLocation, isFetching: prevIsFetching } = prevProps;
      const prevQuery = new URLSearchParams(prevLocation.search);
      const prevSearch = prevQuery.get('search');
      let prevPage = prevQuery.get('page');
      prevPage = prevPage ? parseInt(prevPage, 10) : null;

      const { location, isFetching } = this.props;
      const query = new URLSearchParams(location.search);
      const search = query.get('search');
      let page = query.get('page');
      page = page ? parseInt(page, 10) : null;

      // copy any changed props to state
      if (isFetching !== prevIsFetching) {
        this.setState({ isFetching: isFetching });
      }

      if (search !== prevSearch || page !== prevPage || prevQuery.toString() !== query.toString()) {
        this.performSearch(search, page);
      }
    }
    finally {
      this.isUpdating = false;
    }
  }

  performSearch(search, page) {
    const { index = {} } = this.state;
    const { posts = [] } = index || {};

    // console.log(`performSearch, search: ${search}, page: ${page}`);

    let searchLower = search && search.toLowerCase();

    // console.log('starting search');

    let matchingPostCount = 0;

    posts.forEach((post) => {
      post.hidden = search && (!post.content || !post.content.toLowerCase().includes(searchLower));
      // console.log(`title: ${post.title}, hidden: ${post.hidden}`);
      if (!post.hidden)
        matchingPostCount++;
    });

    // console.log('finished search');

    this.setState({
      index: index,
      search: search || '',
      page: page,
      matchingPostCount: matchingPostCount,
      isFetching: false,
      error: null
    });
  }

  static getQueryString(params) {
    let strings = Object.keys(params)
      .filter(key => {
        return key && params[key] && params[key] !== '';
      })
      .map(key => {
        let value = params[key];
        if (!value || value === '')
          return null;
        return [key, params[key]].map(encodeURIComponent).join('=');
      });

    let string = '';

    if (strings && strings.length > 0)
      string = '?' + strings.join('&');

    return string;
  }

  static getPagedSearchQueryString(search, page) {
    if (page < 2) page = null;

    return PostList.getQueryString(
      {
        search: search,
        page: page
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { search } = this.state;

    const { location } = this.props;

    const url = '/' + PostList.getPagedSearchQueryString(search);

    if (url !== location.pathname + location.search) {
      // push the search onto the stack, so we can navigate back to it
      this.props.history.push(url);
    } else {
      this.performSearch(search);
    }
  };

  handlePageChange = async (pageData) => {
    const { search, page } = this.state;

    const newPage = pageData.selected + 1;

    if (page === newPage)
      return;

    const url = '/' + PostList.getPagedSearchQueryString(search, newPage);

    // push the search onto the stack, so we can navigate back to it
    this.props.history.push(url);

    window.scrollTo(0, 0);
  };

  static renderMediaPreview(media, postUrl) {
    const { url = '' } = media;

    if (!url)
      return null;

    if (url.startsWith("http://www.youtube.com/watch?v\u003d")) {
      const mediaId = url.substring(31, 43);
      return (
        <Fragment>
          <a href={postUrl}>
            <img src={`https://img.youtube.com/vi/${mediaId}/0.jpg`} alt={media.description} height='360'/>
          </a>
          <br/>
          <a href={postUrl} className="mb-3">
            <i className="far fa-play-circle"/> YouTube
          </a>
        </Fragment>
      );
    } else if (url.startsWith("https://www.youtube.com/watch?v\u003d")) {
      const mediaId = url.substring(32, 43);
      return (
        <Fragment>
          <a href={postUrl}>
            <img src={`https://img.youtube.com/vi/${mediaId}/0.jpg`} alt={media.description} height='360'/>
          </a>
          <br/>
          <a href={postUrl} className="mb-3">
            <i className="far fa-play-circle"/> YouTube
          </a>
        </Fragment>
      );
    } else if (url.startsWith("https://plus.google.com")) {
      return (
        <Fragment>
          <a href={postUrl} className="mb-3">
            <i className="far fa-play-circle"/> View Media
          </a>
        </Fragment>
      );
    } else if (media.contentType === "video/*" && url != null) {
      return (
        <Fragment>
          <a href={postUrl} className="mb-3">
            <i className="far fa-play-circle"/> View Media
          </a>
        </Fragment>
      );
    } else if (media.contentType === "image/*" && url != null) {
      return (
        <Fragment>
          <a href={postUrl}>
            <img src={url} alt={media.description} height='360'/>
          </a>
        </Fragment>
      );
    }

    return null;
  }

  static renderAlbumPreview(album, postUrl) {
    if (!album)
      return null;

    const { media } = album;

    if (!media)
      return null;

    const mediaItems = media.map((item) => {
      if (item.contentType === "image/*" && item.url) {
        return (
          <Fragment>
            <a href={postUrl}><img src={item.url} height='120' alt='media'/></a>
          </Fragment>
        );
      }
      else if (item.contentType === "video/*" && item.url) {
        return (
          <Fragment>
            <a href={postUrl}>
              <i className="far fa-play-circle"/> Media
            </a>
          </Fragment>
        );
      }

      return null;
    });

    return (
      <Fragment>
        {mediaItems[0]}
        {mediaItems.length > 1 && (
          <Fragment>
            <br/>
            <a href={postUrl}>View {mediaItems.length - 1} more item{mediaItems.length > 2 ? 's' : ''}</a>
          </Fragment>
        )}
      </Fragment>
    );
  }

  static renderLinkPreview(link, postUrl) {
    let linkItem = null;
    if (link.title) {
      linkItem = (
        <Fragment>
          <a href={link.url}>{link.title}</a>
          {link.imageUrl && (
            <Fragment>
              <br/>
              <a href={postUrl}>
                <img src={link.imageUrl} alt={link.title} height='120'/>
              </a>
            </Fragment>
          )}
        </Fragment>
      );
    }
    return linkItem;
  }

  buildPageHref = (page) => {
    const { search } = this.state;

    return '/' + PostList.getPagedSearchQueryString(search, page);
  };

  renderPagination() {
    const { index = {}, page, matchingPostCount } = this.state;
    const { posts = [] } = index || {};
    const { length = 0 } = posts || [];

    if (length < 1) return null;

    return (
      <Pagination page={page} total={matchingPostCount} per_page={10}
                  hrefBuilder={this.buildPageHref}
                  onPageChange={(page) => this.handlePageChange(page)}/>
    );
  }

  render() {
    const { index = {}, search = '', isFetching, error, page = 1, per_page = 10 } = this.state;
    const { posts = [] } = index || {};

    posts.sort(firstBy('creationTime', -1));

    let renderedPostCount = 0;
    let skippedPostCount = 0;
    let postsToSkip = (page - 1) * per_page;

    // console.log(`postsToSkip: ${postsToSkip}`);

    let postItems = posts.map((post) => {
      if (post.hidden)
        return null;

      if (renderedPostCount >= per_page)
        return null;

      if (skippedPostCount < postsToSkip) {
        skippedPostCount++;
        return null;
      }

      renderedPostCount++;

      const createdAt = new Date(post.creationTime);
      const url = `/posts/${post.id}`;

      const { author, postAcl, media, album, link, poll, resharedPost } = post;

      const { communityAcl = {} } = postAcl || {};
      const { community } = communityAcl || {};

      let title = post.title;

      if (resharedPost) {
        if (!post.media) {
          post.media = resharedPost.media;
        }
      }

      if (post.content) {
        title = post.content;
        // if (title.length > 100)
        //   title = title.substring(0, 100) + '...';
      }

      return (
        <div key={url} className="card mb-2">
          <div className="card-body">
            <h6 className="card-title">
              <UserImage user={author}/>
              <UserName user={author}/>
              {community && community.displayName && (
                <Fragment>
                  <i className="fas fa-caret-right mr-1"/>
                  <CommunityName community={community}/>
                </Fragment>
              )}
              <small className="text-muted ml-5 text-secondary">
                <Link to={url} className="text-secondary">{createdAt.toLocaleString()}</Link>
              </small>
            </h6>
            {resharedPost && (
              <p className="card-text">
                <Link to={url}>
                  Originally shared by {resharedPost.author.displayName}
                </Link>
              </p>
            )}
            <p className="card-text">
              <Link to={url} className="text-body" dangerouslySetInnerHTML={{ __html: title }}
                    style={{ textDecoration: 'none' }}/>
            </p>
            {media && PostList.renderMediaPreview(media, url)}
            {album && PostList.renderAlbumPreview(album, url)}
            {link && PostList.renderLinkPreview(link, url)}
            {poll && (
              <p className="card-text">
                <Link to={url}>View Poll</Link>
              </p>
            )}
          </div>
        </div>
      );
    });

    return (
      <Fragment>
        <form className="form-inline mb-1" onSubmit={this.handleSubmit}>
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                 value={search}
                 onChange={(e) => this.setState({ search: e.target.value })}/>
          <button className="btn btn-primary my-2 my-sm-0" type="submit">Search</button>
        </form>

        {isFetching && (
          <ProgressIndeterminate/>
        )}

        <ErrorAlert error={error} canClose={false}/>

        {postItems}

        {this.renderPagination()}

      </Fragment>
    )
  }
}

export default withRouter(PostList);
