import React from "react";
import { Pane } from "evergreen-ui";
import Search from "./components/Search";

const App: React.FC<{}> = () => {
  return (
    <Pane width="100vw"  display="flex" flexGrow={1} justifyContent="center">
      <Search />
    </Pane>
  );
};

export default App;
