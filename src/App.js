import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import StateWiseCases from './components/StateWiseCases'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/state/:stateCode" component={StateWiseCases} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="not-found" component={NotFound} />
    </Switch>
  </BrowserRouter>
)
export default App
