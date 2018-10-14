import React, { Component, Fragment } from 'react';
import UserImage from './UserImage';
import UserName from './UserName';


class PlusOneList extends Component {
  render() {
    const { plusOnes } = this.props;

    if (!plusOnes || plusOnes.length < 1)
      return (
        <Fragment/>
      );

    return (
      <Fragment>
        <br/><br/>
        <h5>Likes</h5>
        <ul className="list-unstyled">
          {plusOnes.map((plusOne, index) => {
            const { plusOner } = plusOne;

            return (
              <li key={index}>
                <div className="mt-0 mb-2">
                  <UserImage user={plusOner}/>
                  <UserName user={plusOner} />
                </div>
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  }
}

export default PlusOneList;
