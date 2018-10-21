import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css';
import { Button, Header, Icon, Image, Menu, Container, Sidebar } from 'semantic-ui-react'

class App extends Component {
    state = { visible: false }

  handleButtonClick = () => this.setState({ visible: !this.state.visible })

  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    const { visible } = this.state
    return (
      <div>
        <Button onClick={this.handleButtonClick}>Toggle visibility</Button>

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
              Home
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
            <Container fluid style={{height: window.outerHeight}}>
              <Header as='h3'>Application Content</Header>
              <Image src='/images/wireframe/paragraph.png' />
            </Container>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default App;
