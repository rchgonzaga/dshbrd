import React, { useReducer } from "react"
import { Icon, Grid } from "semantic-ui-react"

const todosReducer = (todos, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        {
          text: action.text,
          complete: false
        },
        ...todos
      ]
    case "TOGGLE_COMPLETE":
      return todos.map(
        (todo, k) =>
          k === action.i
            ? {
                ...todo,
                complete: !todo.complete
              }
            : todo
      )
    case "RESET":
      console.log("aaá")
      return []
    default:
      return todos
  }
}

export default () => {
  const [todos, dispatch] = useReducer(todosReducer, [])

  return (
    <div>
      <br />
      <br />
      <Grid textAlign="center" columns={3} divided>
        <Grid.Row>
          <Grid.Column>
            <Icon
              name="smile outline"
              size="huge"
              color="green"
              onClick={() => dispatch({ type: "RESET" })}
            />
            <br />
            65% tickets answered in less than 1 day
          </Grid.Column>
          <Grid.Column>
            <Icon
              name="meh outline"
              size="huge"
              color="orange"
              onClick={() => dispatch({ type: "RESET" })}
            />
            <br />
            25% tickets answered in more than 3 day
          </Grid.Column>
          <Grid.Column>
            <Icon
              name="frown outline"
              size="huge"
              color="red"
              onClick={() => dispatch({ type: "RESET" })}
            />
            <br />
            10% tickets answered in more than 7 day
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}