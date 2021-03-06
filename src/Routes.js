import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import { Menu, Container, Sidebar } from "semantic-ui-react"
import { Subscribe } from "unstated"

import Api from "./state/Api"

import DashCloudLegacy from "./pages/dash/DashCloudLegacy"
import podpyar from "./pages/dashpodpyar/DashPodPyAr"
import Bar from "./pages/barter/Bar"
import LoginLogoutButton from "./components/LoginLogoutButtons"

class RoutesChild extends React.Component {
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
    let update_width = window.innerWidth - 100
    let update_height = window.innerHeight - 49
    this.setState({ width: update_width, height: update_height })
  }

  handleItemClick = (e, { name }) => {
    console.log(name)
    document.title = name + " - If you can't measure it, you can't improve it."
    this.setState({ activeItem: name })
  }

  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    const { globalApi } = this.props
    return (
      <Router>
        <div>
          <Menu
            attached="top"
            size="large"
            inverted
            style={{ backgroundColor: "#003f62" }}
          >
            {/* Shows only if logged = true */}
            {globalApi.state.loggedIn ? (
              <Menu.Item
                icon="bars"
                simple="true"
                onClick={() => globalApi.handleSideMenu()}
              />
            ) : (
              ""
            )}

            {/* Shows only if logged = true */}
            {globalApi.state.loggedIn ? (
              <Menu.Item
                active={this.state.activeItem === "ITS Cloud & Legacy"}
                onClick={this.handleItemClick}
                as={Link}
                name="ITS Cloud & Legacy"
                to="/"
              >
                ITS Cloud & Legacy
              </Menu.Item>
            ) : (
              ""
            )}

            {/* Shows only if logged = true */}
            {globalApi.state.loggedIn ? (
              <Menu.Item
                active={this.state.activeItem === "POD PY & AR"}
                onClick={this.handleItemClick}
                as={Link}
                name="POD PY & AR"
                to="/podpyar"
              >
                POD PY & AR
              </Menu.Item>
            ) : (
              ""
            )}

            {/* Shows only if logged = true */}
            {globalApi.state.loggedIn ? (
              <Menu.Item
                active={this.state.activeItem === "Barter"}
                onClick={this.handleItemClick}
                as={Link}
                name="Barter"
                to="/barter"
              >
                Barter
              </Menu.Item>
            ) : (
              ""
            )}

            {/* Shows only if logged = true */}
            {/*globalApi.state.loggedIn ? (
              <Dropdown
                item
                icon="wrench"
                simple
                style={{
                  display: globalApi.state.loggedIn ? "" : "none"
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
            )*/}

            <Menu.Menu position="right">
              <div className="ui right aligned category search item">
                <div className="ui transparent icon input">
                  <LoginLogoutButton />
                </div>
                <div className="results" />
              </div>
            </Menu.Menu>
          </Menu>

          <Sidebar.Pushable>
            {/* Shows only if logged = true */}
            {globalApi.state.loggedIn ? (
              <Sidebar
                as={Menu}
                animation="push"
                icon="labeled"
                inverted
                onHide={this.handleSidebarHide}
                vertical
                visible={globalApi.state.sideMenuVisible}
                width="thin"
                style={{
                  display: globalApi.state.loggedIn ? "" : "none",
                  backgroundColor: "#055885"
                }}
              >{/*
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
                </Menu.Item>*/}
              </Sidebar>
            ) : (
              ""
            )}

            <Sidebar.Pusher>
              <Container
                fluid
                style={{
                  height: this.state.height,
                  padding: "10px",
                  overflowX: "hidden",
                  overflowY: "auto"
                }}
              >
                <div>
                  <div>
                    <Route exact path="/" component={DashCloudLegacy} />
                    <Route path="/podpyar" component={podpyar} />
                    <Route path="/barter" component={Bar} />
                  </div>
                </div>
              </Container>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </Router>
    )
  }
}

export default function Routes() {
  const [name] = useState("Dashboards - If you can't measure it, you can't improve it.")

  useEffect(() => {
    document.title = name
  })

  return (
    <Subscribe to={[Api]}>
      {api => <RoutesChild api={{}} globalApi={api} />}
    </Subscribe>
  )
}
