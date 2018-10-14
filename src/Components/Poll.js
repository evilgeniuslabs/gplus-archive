import React, { Component, Fragment } from 'react';
import UserImage from './UserImage';
import UserName from './UserName';
import { firstBy } from "thenby";


class Poll extends Component {
  render() {
    const { poll = {} } = this.props;
    const { choices, totalVotes = 0 } = poll || {};

    if (!choices)
      return (
        <Fragment/>
      );

    return (
      <Fragment>
        <div className="mb-2">{totalVotes.toLocaleString()} votes <span className="text-secondary"> - votes visible to Public</span>
        </div>
        <ul className="list-unstyled mt-1">
          {choices.map((choice, index) => {
            const { voteCount, imageUrl, description, votes = [] } = choice;

            votes.sort(firstBy(function (v1, v2) {
              return v1.voter.displayName.localeCompare(v2.voter.displayName);
            }));

            let percent = (voteCount / totalVotes) * 100;
            return (
              <li key={index} className="media">
                {imageUrl && (
                  <img src={imageUrl} className="mr-3" alt="" width={94} height={94}/>
                )}
                <div className="media-body">
                  <h5 className="mt-0 mb-1">
                    <a data-toggle="collapse" href={`#choiceDetails${index}`} role="button"
                       aria-expanded="false" aria-controls={`choiceDetails${index}`}>
                      {description}
                    </a>
                  </h5>
                  <div className="progress" style={{ height: '40px' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow="25"
                         aria-valuemin="0" aria-valuemax="100">
                      {percent.toFixed(0)}% <span>{voteCount}</span>
                    </div>
                  </div>
                  <div className="collapse multi-collapse" id={`choiceDetails${index}`}>
                    <div className="card card-body">
                      <ul className="list-unstyled mt-1">
                        {votes.map((vote, index) => {
                          return (
                            <li key={index}>
                              <div className="mt-0 mb-2">
                                <UserImage user={vote.voter}/>
                                <UserName user={vote.voter}/>
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Fragment>
    )
  }
}

export default Poll;
