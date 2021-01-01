import './App.css';
import { AuthProvider } from './Auth';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Results from './Results';
import Schedule from './Schedule';
import Scores from './Scores';
import Teams from './Teams';
import News from './News';
import Rules from './Rules';


const App = () => {
  return (
    <AuthProvider>
      <Router>
          <PrivateRoute exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signUp" component={SignUp}/>
          <Route path="/results" component={Results}/>
          <Route path="/schedule" component={Schedule}/>
          <Route path="/scores" component={Scores}/>
          <Route path="/teams" component={Teams}/>
          <Route path="/news" component={News}/>
          <Route path="/rules" component={Rules}/>
      </Router>
    </AuthProvider>
  );
}

export default App;
