import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import {
  Header,
  Icon,
  Menu,
  Container,
  Sidebar,
  Dropdown
} from "semantic-ui-react"
import { Subscribe } from "unstated"

import ApiSubscribe from "./state/Api"

import Home from "./pages/Home"
import Foo from "./pages/Foo"
import Bar from "./pages/Bar"
import Counter from "./components/Counter"

class Routes extends React.Component {
  state = {
    visible: false,
    width: 800,
    height: 182,
    activeItem: ""
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions.bind(this))
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this))
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    // if(window.innerWidth < 500) {
    // this.setState({ width: 450, height: 102 });
    // } else {
    let update_width = window.innerWidth - 100
    let update_height = window.innerHeight - 43
    this.setState({ width: update_width, height: update_height })
    // }
  }

  handleItemClick = (e, { name }) => {
    console.log(name)
    this.setState({ activeItem: name })
  }

  // handleButtonClick = () => this.setState({ visible: !this.state.visible })

  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    const { activeItem } = this.state
    return (
      <Subscribe to={[ApiSubscribe]}>
        {appContainer => (
          <Router>
            <div>
              <Menu
                attached="top"
                size="large"
                inverted
                style={{ backgroundColor: "#003f62" }}
              >
                {/* Shows only if logged = true */}
                {appContainer.state.loggedIn ? (
                  <Menu.Item
                    icon="bars"
                    simple="true"
                    onClick={() => appContainer.handleSideMenu()}
                  />
                ) : (
                  ""
                )}

                {/* Shows only if logged = true */}
                {appContainer.state.loggedIn ? (
                  <Menu.Item
                    active={activeItem === "home"}
                    onClick={this.handleItemClick}
                    as={Link}
                    name="home"
                    to="/"
                  >
                    Home
                  </Menu.Item>
                ) : (
                  ""
                )}

                {/* Shows only if logged = true */}
                {appContainer.state.loggedIn ? (
                  <Menu.Item
                    active={activeItem === "foo"}
                    onClick={this.handleItemClick}
                    as={Link}
                    name="foo"
                    to="/foo"
                  >
                    Foo
                  </Menu.Item>
                ) : (
                  ""
                )}

                {/* Shows only if logged = true */}
                {appContainer.state.loggedIn ? (
                  <Menu.Item
                    active={activeItem === "bar"}
                    onClick={this.handleItemClick}
                    as={Link}
                    name="bar"
                    to="/bar"
                  >
                    Bar
                  </Menu.Item>
                ) : (
                  ""
                )}

                {/* Shows only if logged = true */}
                {appContainer.state.loggedIn ? (
                  <Dropdown
                    item
                    icon="wrench"
                    simple
                    style={{
                      display: appContainer.state.loggedIn ? "" : "none"
                    }}
                  >
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Icon name="dropdown" />
                        <span className="text">New</span>

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
                ) : (
                  ""
                )}

                <Menu.Menu position="right">
                  <div className="ui right aligned category search item">
                    <div className="ui transparent icon input">
                      <Counter />
                      <input
                        className="prompt"
                        type="text"
                        placeholder="Search animals..."
                      />
                      <i className="search link icon" />
                    </div>
                    <div className="results" />
                  </div>
                </Menu.Menu>
              </Menu>

              <Sidebar.Pushable>
                {/* Shows only if logged = true */}
                {appContainer.state.loggedIn ? (
                  <Sidebar
                    as={Menu}
                    animation="push"
                    icon="labeled"
                    inverted
                    onHide={this.handleSidebarHide}
                    vertical
                    visible={appContainer.state.sideMenuVisible}
                    width="thin"
                    style={{
                      display: appContainer.state.loggedIn ? "" : "none",
                      backgroundColor: "#055885"
                    }}
                  >
                    <Menu.Item as="a">
                      <Icon name="home" />
                      <Counter />
                    </Menu.Item>
                    <Menu.Item as="a">
                      <Icon name="gamepad" />
                      Games
                    </Menu.Item>
                    <Menu.Item as="a">
                      <Icon name="camera" />
                      Channels
                      <Counter />
                    </Menu.Item>
                  </Sidebar>
                ) : (
                  ""
                )}

                <Sidebar.Pusher>
                  <Container
                    fluid
                    style={{ height: this.state.height, padding: "10px" }}
                  >
                    <div>
                      <Header as="h3">Application Content</Header>
                      <span>{appContainer.state.count}</span>
                      <div>
                        <Link to="/">Home</Link> |&nbsp;
                        <Link to="/foo">Foo</Link> |&nbsp;
                        <Link to="/bar">Bar</Link>
                        <hr />
                        <Route exact path="/" component={Home} />
                        <Route path="/foo" component={Foo} />
                        <Route path="/bar" component={Bar} />
                      </div>
                    </div>
                  </Container>
                </Sidebar.Pusher>
              </Sidebar.Pushable>
            </div>
          </Router>
        )}
      </Subscribe>
    )
  }
}

export default Routes
