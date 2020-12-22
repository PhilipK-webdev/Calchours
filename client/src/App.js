import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "../src/components/nav/Nav"
import Footer from './components/footer/Footer';
function App() {
  return (
    <div className="container-fluid m-0 p-0">
      <Router>
        <Nav />

        <footer data-test="footer" className="page-footer font-small pt-4">
          <Footer />
        </footer>
      </Router>
    </div>
  );
}

export default App;
