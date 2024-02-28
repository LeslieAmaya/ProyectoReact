import './App.css'
import Login from './components/Login';
import Home from './components/Home';

var x=localStorage.getItem('user');

function App() {
  let actual;
  if(x==null){
    actual = <Login/>;
  }
  else{
    actual = <Home/>;
  }
  return (
    <div>
      <header className="App-header">
        {actual}
      </header>
    </div>
  );
}

export default App;
