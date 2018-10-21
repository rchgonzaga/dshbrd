
import { Provider, Subscribe, Container } from 'unstated';

type CounterState = {
  count: number
};


// class CounterContainer extends Container<CounterState> {
class CounterContainer extends Container {
  state = {
    count: 0
  };

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }
}

export default CounterContainer