import React, { Component } from 'react';
import loadedState from './initialState';
import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ErrorBoundaryContainer from './components/Error/ErrorBoundaryContainer';
import FileListContainer from './components/Library/BookListContainer';
import packagejson from '../package.json';
import BookInfoContainer from './components/Library/BookInfoContainer';
import LibraryNavBar from "./components/NavBar/NavBar";
import UploadForm from './components/Library/UploadForm';

const cacheStore = window.sessionStorage.getItem('hyrda-redux-store');
const initialState = cacheStore ? JSON.parse(cacheStore) : loadedState;
export const store = applyMiddleware(thunk)(createStore)(
  appReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const saveState = () => {
  window.sessionStorage.setItem(
    'hydra-redux-store',
    JSON.stringify(store.getState())
  );
};
store.subscribe(function () {
  console.log(store.getState());
});

store.subscribe(saveState);

class App extends Component {

  render() {
    return (
      <Provider store={store}>
          <BrowserRouter basename={packagejson.baseURL}>
            <ErrorBoundaryContainer>
            <LibraryNavBar />
              <Switch>
                <Route exact path="/" component={FileListContainer} store={store} />
                <Route exact path="/bookinfo" component={BookInfoContainer} store={store} />
                <Route exact path="/upload" component={UploadForm} store={store} />
              </Switch>
            </ErrorBoundaryContainer>
          </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
