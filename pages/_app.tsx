import { MyApp } from '../app/App';
import { AppContext } from 'next/app';

class Application extends MyApp {
  static async getInitialProps(context: AppContext) {
    const initialProps = await MyApp.getInitialProps(context);
    return {
      ...initialProps,
      theme: undefined // custom theme
    };
  }
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
