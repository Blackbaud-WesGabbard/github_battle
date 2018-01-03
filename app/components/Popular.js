var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

function SelectLanguage (props) {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  console.log('sel;ect lang');
  return (
    <ul className="languages">
      {languages.map(function (lang) {
        return (
          <li
            style={lang === props.selectedLanguage ? {color: 'red'}: null}
            onClick={props.onSelect.bind(null, lang)}
            key={lang}>
            {lang}
          </li>
        )
      }, this)}
    </ul>
  )
}

function RepoGrid (props) {
  console.log(props);
  return (
    <ul className="popular-list">
      {props.repo.map(function(repo, index) {
        <li key="repo.name" className="popular-item">
          {repo.name}
          <div className="popular-rank">#{index + 1}</div>
        </li>
      })}
    </ul>
  )
}
RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

class Popular extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount () {
    console.log('enter mount');
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang,
        repos: null,
      }
    });

    api.fetchPopularRepos(lang)
      .then(function(repos) {
        this.setState(function() {
          return {
            repos: repos
          }
        }.bind(this));
      })
  }

  render() {
    return (
      <div>
        <SelectLanguage 
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        <RepoGrid repos={this.state.repos} />
      </div>
    )
  }
}

module.exports = Popular;