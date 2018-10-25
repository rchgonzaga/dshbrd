import React from "react"
import { Provider, Subscribe, Container } from "unstated"
import Sessions from '../services/api/session/index'

import UNSTATED from "unstated-debug"
UNSTATED.logStateChanges = true


// Create a Container for our React Context. This container will
// hold state and methods just like a react component would:
export class ApiContainer extends Container {
  constructor() {
    super()

    // The state will be available to any component we inject
    // the Container instance into
    this.state = {
      loggedIn: false,
      sideMenuVisible: false,
      isLoadingSession: false,
      ticketList: [],
      count: 10,
      barData: [
        {
          id: "elixir",
          label: "elixir",
          value: 250,
          color: "hsl(173, 70%, 50%)"
        },
        {
          id: "erlang",
          label: "erlang",
          value: 493,
          color: "hsl(240, 70%, 50%)"
        },
        {
          id: "scala",
          label: "scala",
          value: 455,
          color: "hsl(145, 70%, 50%)"
        },
        {
          id: "lisp",
          label: "lisp",
          value: 490,
          color: "hsl(225, 70%, 50%)"
        },
        {
          id: "rust",
          label: "rust",
          value: 211,
          color: "hsl(230, 70%, 50%)"
        }
      ],
      pieData: [
        {
          country: "AD",
          "hot dog": 152,
          "hot dogColor": "hsl(212, 70%, 50%)",
          burger: 105,
          burgerColor: "hsl(285, 70%, 50%)",
          sandwich: 140,
          sandwichColor: "hsl(197, 70%, 50%)",
          kebab: 71,
          kebabColor: "hsl(55, 70%, 50%)",
          fries: 137,
          friesColor: "hsl(242, 70%, 50%)",
          donut: 40,
          donutColor: "hsl(324, 70%, 50%)"
        },
        {
          country: "AE",
          "hot dog": 0,
          "hot dogColor": "hsl(160, 70%, 50%)",
          burger: 78,
          burgerColor: "hsl(28, 70%, 50%)",
          sandwich: 21,
          sandwichColor: "hsl(246, 70%, 50%)",
          kebab: 152,
          kebabColor: "hsl(295, 70%, 50%)",
          fries: 8,
          friesColor: "hsl(13, 70%, 50%)",
          donut: 25,
          donutColor: "hsl(80, 70%, 50%)"
        },
        {
          country: "AF",
          "hot dog": 143,
          "hot dogColor": "hsl(48, 70%, 50%)",
          burger: 86,
          burgerColor: "hsl(65, 70%, 50%)",
          sandwich: 89,
          sandwichColor: "hsl(32, 70%, 50%)",
          kebab: 130,
          kebabColor: "hsl(147, 70%, 50%)",
          fries: 141,
          friesColor: "hsl(12, 70%, 50%)",
          donut: 74,
          donutColor: "hsl(146, 70%, 50%)"
        },
        {
          country: "AG",
          "hot dog": 162,
          "hot dogColor": "hsl(212, 70%, 50%)",
          burger: 84,
          burgerColor: "hsl(187, 70%, 50%)",
          sandwich: 71,
          sandwichColor: "hsl(48, 70%, 50%)",
          kebab: 55,
          kebabColor: "hsl(22, 70%, 50%)",
          fries: 38,
          friesColor: "hsl(334, 70%, 50%)",
          donut: 199,
          donutColor: "hsl(203, 70%, 50%)"
        },
        {
          country: "AI",
          "hot dog": 2,
          "hot dogColor": "hsl(66, 70%, 50%)",
          burger: 173,
          burgerColor: "hsl(311, 70%, 50%)",
          sandwich: 29,
          sandwichColor: "hsl(9, 70%, 50%)",
          kebab: 46,
          kebabColor: "hsl(217, 70%, 50%)",
          fries: 174,
          friesColor: "hsl(40, 70%, 50%)",
          donut: 73,
          donutColor: "hsl(58, 70%, 50%)"
        },
        {
          country: "AL",
          "hot dog": 63,
          "hot dogColor": "hsl(310, 70%, 50%)",
          burger: 168,
          burgerColor: "hsl(325, 70%, 50%)",
          sandwich: 59,
          sandwichColor: "hsl(345, 70%, 50%)",
          kebab: 105,
          kebabColor: "hsl(4, 70%, 50%)",
          fries: 118,
          friesColor: "hsl(308, 70%, 50%)",
          donut: 121,
          donutColor: "hsl(141, 70%, 50%)"
        },
        {
          country: "AM",
          "hot dog": 198,
          "hot dogColor": "hsl(150, 70%, 50%)",
          burger: 53,
          burgerColor: "hsl(146, 70%, 50%)",
          sandwich: 90,
          sandwichColor: "hsl(220, 70%, 50%)",
          kebab: 47,
          kebabColor: "hsl(273, 70%, 50%)",
          fries: 37,
          friesColor: "hsl(58, 70%, 50%)",
          donut: 78,
          donutColor: "hsl(324, 70%, 50%)"
        }
      ]
    }
  }

  increment() {
    this.setState({ count: this.state.count + 10 })
  }

  changeAiMothaFocka() {
    this.setState({
      barData: [
        {
          id: "elixir",
          label: "elixir",
          value: Math.floor(Math.random() * 100) + 1,
          color: "hsl(173, 70%, 50%)"
        },
        {
          id: "erlang",
          label: "erlang",
          value: Math.floor(Math.random() * 100) + 1,
          color: "hsl(240, 70%, 50%)"
        },
        {
          id: "scala",
          label: "scala",
          value: Math.floor(Math.random() * 100) + 1,
          color: "hsl(145, 70%, 50%)"
        },
        {
          id: "lisp",
          label: "lisp",
          value: Math.floor(Math.random() * 100) + 1,
          color: "hsl(225, 70%, 50%)"
        },
        {
          id: "rust",
          label: "rust",
          value: Math.floor(Math.random() * 100) + 1,
          color: "hsl(230, 70%, 50%)"
        }
      ]
    })
  }

    getCurrentSession() {
        this.setState({
            isLoadingSession: true
        })
        Sessions.getSession().then(data => {
            this.setState({
                ticketList: data
            })
            this.setState({
                isLoadingSession: false
            })
        })
    }

  decrement() {
    this.setState({ count: this.state.count - 1 })
  }

  async handleSideMenu() {
    this.setState({ sideMenuVisible: !this.state.sideMenuVisible })
  }

  // These methods will also be avaiable anywhere we inject our
  // container context
  async login() {
    console.log("Logging in")
    this.setState({ loggedIn: true })
  }

  async logout() {
    console.log("Logging out")
    this.setState({ loggedIn: false })
  }
}

// Following the Singleton Service pattern (think Angular Service),
// we will instantiate the Container from within this module
const Api = new ApiContainer()

// Then we will wrap the provider and subscriber inside of functional
// React components. This simplifies the resuse of the module as we
// will be able to import this module as a depenency without having
// to import Unstated and/or create React Contexts  manually in the
// places that we want to Provide/Subscribe to the API Service.
export const ApiProvider = props => {
  // We leave the injector flexible, so you can inject a new dependency
  // at any time, eg: snapshot testing
  return <Provider inject={props.inject || [Api]}>{props.children}</Provider>
}

export const ApiSubscribe = props => {
  // We also leave the subscribe "to" flexible, so you can have full
  // control over your subscripton from outside of the module
  return <Subscribe to={props.to || [Api]}>{props.children}</Subscribe>
}

export default Api

// IMPORT NOTE:
// With the above export structure, we have the ability to
// import like this:

// import Api, {ApiProvider, ApiSubscribe, ApiContainer}

// Api: Singleton Api instance, exported as default.
//      Contains your instantiated .state and methods.

// ApiProvider: Context Provider...
//      Publishes your React Context into the top of the
//      React App into the component tree.

// ApiSubscribe: Context Subsriber...
//      Subscribes to the higher Context from any place
//      lower than the point at which the Context was provided.

// ApiContainer:Context Container Class...
//      Used to instantiate new copy of your service if so desired.
//      Can be used for testing, or subsrcibing your class to a new
//      data source that uses the same data model/methods.
