
import { Provider, Subscribe, Container } from 'unstated';

// class CounterContainer extends Container<CounterState> {
class CounterContainer extends Container {
  state = {
    count: 10
  };

  increment() {
    this.setState({ count: this.state.count + 12 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }
}

export default CounterContainer