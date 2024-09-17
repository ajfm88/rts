import "./App.css";
import Chicken from "./Chicken";
import Greeter from "./Greeter";
import ListPicker from "./ListPicker";
import Die from "./Die";
import DoubleDice from "./DoubleDice";

function App() {
  return (
    <>
      <DoubleDice />
      <DoubleDice />
      {/* <ListPicker values={[1, 2, 3]} />
      <ListPicker values={["a", "b", "c"]} /> */}
      {/* <Greeter />
      <Greeter person="Ted" from="Colt" />
      <Greeter person="Rosa" from="Elton" />
      <Die numSides={20} />
      <Die />
      <Die numSides={10} /> */}
    </>
  );
}

export default App;
