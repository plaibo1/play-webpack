import { createRoot } from "react-dom/client";
import { List } from "./components/List/List";
import "./style.css";

const root = createRoot(document.getElementById("root"));

const test = { test: null } as { test: null | string };

const App = () => {
  test.test ??= "asd";
  return (
    <div>
      <div className="bg-red-500">Hello react and webpack</div>
      {test.test}
      <List />
    </div>
  );
};

root.render(<App />);
