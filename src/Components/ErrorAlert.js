import React, { Component } from 'react';

class ErrorAlert extends Component {

  static async getResponseError(response) {
    if (!response)
      return null;

    let message = null;
    let messages = null;

    try {
      const text = await response.text();
      if (text) {
        const body = JSON.parse(text);
        if (body && body.message) {
          message = body.message;
        }

        if (body && body.messages) {
          messages = body.messages;
        }
      }
    }
    catch (e) {
      // console.error(e);
    }

    let heading = null;

    if (response.status === 422 && !message && messages) {
      heading = `${response.status} ${response.statusText}`;
      return {
        response: response,
        heading: heading,
        message: null,
        messages: messages,
      };
    }

    if (response && response.status && response.statusText) {
      heading = `${response.status} ${response.statusText}`;
    }

    if (!message) {
      message = `${response.status} ${response.statusText}`;
    }

    if (heading === message)
      heading = null;

    return {
      response: response,
      heading: heading,
      message: message,
      messages: messages,
    };
  }

  render() {
    const { error = {}, canClose = true } = this.props;
    const { heading, message } = error || {};

    if (!heading && !message)
      return null;

    return (
      <div className='alert alert-danger alert-dismissible fade show' role='alert'>
        {heading ? (<h6 className="alert-heading">{heading}</h6>) : null}
        <p className="mb-0">{message}</p>
        {canClose && (
          <button onClick={this.props.clearError} type="button" className="close" data-dismiss="alert"
                  aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        )}
      </div>
    );
  }
}

export default ErrorAlert;