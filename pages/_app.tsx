import { MyApp } from '../app/App';

class Application extends MyApp {

  // TODO super.render() vyřešit lépe
  render() {
    return (
      super.render()
    );
  }
}

const decorate = (app: React.ElementType) => app;

const App = decorate(Application);

export default App;
