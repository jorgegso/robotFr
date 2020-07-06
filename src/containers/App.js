import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
// import { robots } from '../robots';
import SearchBox from '../components/SearchBox';
// import { render } from '@testing-library/react';
import './App.css'
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'

// import { setSerchField } from '../actions';
// import { requestRobots } from '../reducers';
import { setSearchField, requestRobots } from '../actions'


const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPendig: state.requestRobots.isPendig,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends Component {
  
  componentDidMount() {
    this.props.onRequestRobots();
  }
  render() {
    // const { robots } = this.state;
    const { onSearchChange, searchField, robots, isPending } = this.props
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    return isPending ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f2'>RobotsFraids</h1>
          <SearchBox searchChange={onSearchChange} />
          <Scroll>
            <ErrorBoundry>
              <CardList robots={filteredRobots} />
            </ErrorBoundry>
          </Scroll>
        </div>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);