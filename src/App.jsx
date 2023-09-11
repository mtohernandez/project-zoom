import Graph from "./components/Graph/Graph";
import Grid from "./components/Grid/Grid";
import Container from "./components/Container/Container";
import DataTaker from "./components/DataTaker/DataTaker";
import Airports from "./components/Airport/Airports";
import DataProvider from "./context/DataProvider";
import Button from "./components/Button/Button";

function App() {
  return (
    <DataProvider>
      <Grid>
        <Container area="nodes">
          <Airports />
          <DataTaker label="Nodes" input="Type a node. (max 10 characters)" button="launch" />
          <Button />
        </Container>
        <Container area="graph">
          <Graph />
        </Container>
      </Grid>
    </DataProvider>
  );
}

export default App;
