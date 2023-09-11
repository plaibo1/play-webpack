import { createRoot } from "react-dom/client";
import { List } from "./components/List/List";

const root = createRoot(document.getElementById("root"));

const test = { test: null } as { test: null | string };

const App = () => {
  test.test ??= "asd";
  return (
    <div>
      <div>Hello react and webpack</div>
      {test.test}
      <List />
    </div>
  );
};

root.render(<App />);
