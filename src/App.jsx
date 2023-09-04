import { useState } from "react";
import { transformNodes } from "./utils/transformNodes";
import { transformLinks } from "./utils/transformLinks";
import DataContext from "./context/dataContext";
import Graph from "./components/Graph/Graph";
import Grid from "./components/Grid/Grid";
import Container from "./components/Container/Container";
import DataTaker from "./components/DataTaker/DataTaker";
import Airports from "./components/Airport/Airports";
import Links from "./components/Links/Links";

const example1 = "['JFK', 'LAX', 'ORD', 'MIA']";
const example2 = "[['JFK', 'LAX'], ['JFK', 'ORD'], ['JFK', 'MIA']]";

function App() {
  const [data, setData] = useState({
    nodes: [],
    links: [],
  });

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
      }}
    >
      <Grid>
        <Container area="nodes">
          <Airports />
          <DataTaker
            example={example1}
            label="Nodes"
            input="Copy and paste the list of nodes (airports)."
            button="launch"
            action={(data) => {
              if (!data) return;
              setData({ nodes: transformNodes(data), links: [] });
            }}
          />
        </Container>
        <Container area="connections">
          <Links />
          <DataTaker
            example={example2}
            label="Connections"
            input="Copy and paste the list of connections."
            button="link"
            action={(data) => {
              if (!data) return;
              setData((prevState) => {
                return {
                  nodes: prevState.nodes,
                  links: transformLinks(data),
                };
              });
            }}
            isDisabled={data.nodes.length === 0}
          />
        </Container>
        <Container area="graph">
          <Graph data={data} />
        </Container>
      </Grid>
    </DataContext.Provider>
  );
}

export default App;
