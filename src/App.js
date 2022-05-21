import './App.css'
import { Provider, useSelector } from 'react-redux';
import configureStore from './store/store';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./assets/styles/main.css";
import ClientApp from './ClientApp';


const theme = createTheme({
  palette: {
    mainBrown: {
      main: '#a52a2a',
    },
  },
});

function App() {
  const store = configureStore()

  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ClientApp/>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
