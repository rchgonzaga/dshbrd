import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css';
import { Button, Header, Icon, Menu, Container, Sidebar, Dropdown } from 'semantic-ui-react'
import { Subscribe } from 'unstated'

import AppStateContainer from './state/AppStateContainer'
import Routes from "./Routes";

const Counter = () => {
  return (
    <Subscribe to={[AppStateContainer]}>{counter => (
        <div>
          <button onClick={() => counter.decrement()}>-</button>
          <span>{counter.state.count}</span>
          <button onClick={() => counter.increment()}>+</button>
        </div>
  )}</Subscribe>
  );
}

    
    
class App extends Component {
  state = { 
    visible: false,
    width:  800,
    height: 182
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    // if(window.innerWidth < 500) {
      // this.setState({ width: 450, height: 102 });
    // } else {
      let update_width  = window.innerWidth-100;
      let update_height = window.innerHeight-39;
      this.setState({ width: update_width, height: update_height });
    // }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleButtonClick = () => this.setState({ visible: !this.state.visible })

  handleSidebarHide = () => this.setState({ visible: false })

  /**
   * Render method()
   */
  render() {
    const { visible, activeItem } = this.state
    return (
      <Subscribe to={[AppStateContainer]}>{counter => (
      <div>
        <Menu attached='top' inverted>
          <Menu.Item icon='bars' simple
            onClick={this.handleButtonClick}
          />

          <Menu.Item
            name='item1'
            active={activeItem === 'item1'}
            onClick={this.handleItemClick}
          >
            Item 1
          </Menu.Item>

          <Menu.Item
            name='item2'
            active={activeItem === 'item2'}
            onClick={this.handleItemClick}
          >
            Item 2
          </Menu.Item>

          <Dropdown item icon='wrench' simple>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Icon name='dropdown' />
                <span className='text'>New</span>

                <Dropdown.Menu>
                  <Dropdown.Item>Document</Dropdown.Item>
                  <Dropdown.Item>Image</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Item>Open</Dropdown.Item>
              <Dropdown.Item>Save...</Dropdown.Item>
              <Dropdown.Item>Edit Permissions</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Export</Dropdown.Header>
              <Dropdown.Item>Share</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Menu position='right'>
            <div className='ui right aligned category search item'>
              <div className='ui transparent icon input'>
                <input className='prompt' type='text' placeholder='Search animals...' />
                <i className='search link icon' />
              </div>
              <div className='results' />
            </div>
          </Menu.Menu>
        </Menu>


        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width='thin'
          >
            <Menu.Item as='a'>
              <Icon name='home' />
              <Counter />
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <Container fluid style={{height: this.state.height}}>
                  <div>
                  <Header as='h3'>Application Content</Header>
                  <span>{counter.state.count}</span>
                  <Routes />
                  </div>
            </Container>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
      )}</Subscribe>
    );
  }
}

export default App;
