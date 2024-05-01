import './App.css';
import Body from './components/body';
import Header from './components/header/header';
import Footer from './components/footer';

function App() {
  return (
    <div >

      <div className="App" >
        <Header />
        <Body />
      </div>
      <div className="footer">
        <Footer />

      </div>
    </div>
  );
}

export default App;
