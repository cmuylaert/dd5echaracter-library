import React from 'react';
import debounce from 'lodash.debounce';

class SearchForm extends React.Component {
  componentWillMount = () => {
     this.delayedOnChangeName = debounce((evt) => {
       this.props.onNameChange(evt.target.value)
     }, 250)
    }
  onChangeName = (evt) => {
    evt.persist()
    this.delayedOnChangeName(evt)
  }
  render () {
    return (
      <div className="search-form">
        <div className="free-text-filters">
          <input className="name-filter"
                 type="text"
                 placeholder="Name"
                 name="name"
                 onChange={this.onChangeName} />
        </div>
      </div>
    );
  }
}
SearchForm.propTypes = {
  onNameChange: React.PropTypes.func.isRequired,
};
export default SearchForm;
