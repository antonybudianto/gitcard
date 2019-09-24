import React, { Component } from 'react';

class SearchView extends Component {
  state = {
    username: '',
    loading: false,
    error: '',
    data: null
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedUser !== prevProps.selectedUser) {
      this.setState(
        {
          username: this.props.selectedUser.node.login
        },
        () => {
          this.doSearch();
        }
      );
    }
  }

  handleChangeUsername = text => {
    this.setState({
      username: text
    });
  };

  doSearch = () => {
    if (this.state.username === '') {
      return;
    }

    this.setState({
      loading: true,
      data: null,
      error: ''
    });

    fetch(`/api/gh/profile/${this.state.username}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Error fetch profile');
        }
        return res.json();
      })
      .then(res => {
        const langMap = res.data.language_map;
        const langArr = Object.entries(langMap);
        const sortedLangArr = langArr.sort((a, b) => b[1] - a[1]);
        const newData = {
          ...res.data,
          langArr: sortedLangArr
        };
        this.setState({
          loading: false,
          data: newData
        });
      })
      .catch(e => {
        console.error(e.message);
        this.setState({
          loading: false,
          error: 'Profile is not valid or server is busy. Please try again'
        });
      });
  };

  handleSearch = e => {
    e.preventDefault();
    this.doSearch();
  };

  render() {
    return (
      <div>
        <div className="App-content flex-wrap space-between">
          <div>
            <h3>Search username</h3>
            <form noValidate onSubmit={this.handleSearch}>
              <div className="flex-wrap">
                <input
                  placeholder="Search username"
                  type="text"
                  className="Search-input"
                  value={this.state.username}
                  disabled={this.state.loading}
                  onChange={e => this.handleChangeUsername(e.target.value)}
                />
                <button disabled={this.state.loading} className="Search-btn">
                  Search
                </button>
              </div>
            </form>
          </div>
          {this.state.data !== null ? (
            <div className="Search-result-container">
              <h3>Result for {this.state.data.username}:</h3>
              <div className="Search-result-summary flex-wrap align-center">
                <a
                  role="img"
                  rel="noopener noreferrer"
                  aria-label="User Image"
                  href={`https://github.com/${this.state.username}`}
                >
                  <img
                    className="Search-ava"
                    src={this.state.data.avatar_url}
                    alt={this.state.username}
                  />
                </a>
                <div className="Search-stat">
                  <div>
                    <span aria-label="image" role="img">
                      ⭐
                    </span>{' '}
                    {this.state.data.star_count} stars
                  </div>
                  <div>
                    <span aria-label="image" role="img">
                      📘
                    </span>{' '}
                    {this.state.data.repo_count} repos
                  </div>
                  <div>
                    <span aria-label="image" role="img">
                      📙
                    </span>{' '}
                    {this.state.data.fork_count} forks
                  </div>
                  <div>
                    <span aria-label="image" role="img">
                      📚
                    </span>{' '}
                    {this.state.data.language_count} languages
                  </div>
                </div>
                <div className="Search-stat flex-wrap Search-lang-container">
                  {this.state.data.langArr.map((l, i) => {
                    return (
                      <div key={i} className="Search-lang-item">
                        {l[0]}: <span>{l[1]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="Search-result-container">
              <h3>Find GitHub user total stars, repos, and others!</h3>
              {this.state.loading && (
                <div>Looking @{this.state.username}, please wait!</div>
              )}
              {this.state.error && <div>{this.state.error}</div>}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SearchView;