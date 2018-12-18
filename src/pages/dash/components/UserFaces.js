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

export default (props) => {
  const [todos, dispatch] = useReducer(todosReducer, [])
  const {total, totalOneDay, totalRestDay, totalThreeDay} = props.data
  return (
    <div style={{width: '350px'}}>
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
            {(totalOneDay / total * 100).toFixed(1)}% <br/>issues resolved within 1 day
          </Grid.Column>
          <Grid.Column>
            <Icon
              name="meh outline"
              size="huge"
              color="orange"
              onClick={() => dispatch({ type: "RESET" })}
            />
            <br />
            {(totalThreeDay / total * 100).toFixed(1)}% <br/>issues resolved between 1 and 3 days
          </Grid.Column>
          <Grid.Column>
            <Icon
              name="frown outline"
              size="huge"
              color="red"
              onClick={() => dispatch({ type: "RESET" })}
            />
            <br />
            {
              ((totalRestDay + (total - (totalRestDay+totalOneDay+totalThreeDay))) / total * 100).toFixed(1)
            }% <br/>issues resolved within 3 or more days
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}
