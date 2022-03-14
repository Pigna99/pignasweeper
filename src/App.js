import Container from "./components/Container";
import Settings from "./components/Settings";
import Info from "./components/Info";

function App() {
  return (
    <div className="front_page">
      <h1>PignaSweeper</h1>
      <Settings/>
      <Info/>
      <Container/>
    </div>
  );
}

export default App;
