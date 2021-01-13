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
import BuzzerForm from './BuzzerForm';
import BuzzerAdmin from './BuzzerAdmin';
import Voting from './Voting';


const App = () => {
  return (
    <AuthProvider>
      <Router>
          <PrivateRoute exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signUp" component={SignUp}/>
          <Route exact path="/results" component={Results}/>
          <Route exact path="/schedule" component={Schedule}/>
          <Route exact path="/scores" component={Scores}/>
          <Route exact path="/teams" component={Teams}/>
          <Route exact path="/news" component={News}/>
          <Route exact path="/rules" component={Rules}/>
          <Route exact path="/buzzerForm" component={BuzzerForm}/>
          <Route exact path="/buzzerAdmin" component={BuzzerAdmin}/>
          <Route exact path="/voting" component={Voting}/>
      </Router>
    </AuthProvider>
  );
}

export default App;
