import { useState } from "react";
import DataContext from "./context/dataContext";
import Graph from "./components/Graph/Graph";
import Grid from "./components/Grid/Grid";
import Container from "./components/Container/Container";
import DataTaker from "./components/DataTaker/DataTaker";
import Airports from "./components/Airport/Airports";
import { transformNodes } from "./utils/transformNodes";
import { transformLinks } from "./utils/transformLinks";
import { run__reset } from "./App.module.css";

function App() {
  const [data, setData] = useState({
    nodes: [],
    links: [],
    start: "",
    needed: [],
  });

  const addToNodes = (nodeID) => {
    if (!nodeID) return;
    if (data.nodes.find((node) => node.id === nodeID)) return;
    setData((prevState) => {
      return {
        ...prevState,
        nodes: [...prevState.nodes, { id: nodeID, group: 1 }],
      };
    });
  };

  const addToLinks = (source, target) => {
    if (!source || !target) return;
    if (
      data.links.find(
        (link) => link.source.id === source && link.target.id === target
      )
    )
      return;
    if (data.links.find((link) => link.source.id === source)) {
      const newLinks = data.links.map((link) => {
        if (link.source.id === source) {
          return {
            ...link,
            target: target,
          };
        }
        return link;
      });
      setData((prevState) => {
        return {
          ...prevState,
          links: newLinks,
        };
      });
    } else {
      setData((prevState) => {
        return {
          ...prevState,
          links: [...prevState.links, { source: source, target: target }],
        };
      });
    }
  };

  const deleteNode = (node) => {
    const { nodes, links } = data;
    const newNodes = nodes.filter((n) => n.id !== node);
    const newLinks = links.filter(
      (link) => link.source.id !== node && link.target.id !== node
    );
    setData((prevState) => {
      if (prevState.start === node) {
        return {
          ...prevState,
          nodes: newNodes,
          links: newLinks,
          start: "",
        };
      }
      return {
        ...prevState,
        nodes: newNodes,
        links: newLinks,
      };
    });
  };

  const changeStartingPoint = (e) => {
    setData((prevState) => {
      return {
        ...prevState,
        start: e.target.value,
      };
    });
  };

  const runData = async () => {
    const nodesToPost = transformNodes(data.nodes);
    const linksToPost = transformLinks(data.links);
    const startingPoint = data.start;

    if (!startingPoint) return;

    const dataToPost = {
      starting_connection: startingPoint,
      airport_codes: nodesToPost,
      connections: linksToPost,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToPost),
    };

    const response = await fetch(
      "https://project-api-zoom.onrender.com/airport-connections",
      requestOptions
    );
    const json = await response.json();

    if(json.error) {
      alert(json.error);
      return;
    }

    const newLinks = json.connections.map((connection) => {
      return {
        source: data.start,
        target: connection,
      };
    });

    setData((prevState) => {
      return {
        ...prevState,
        links: [...prevState.links, ...newLinks],
        needed: json.connections,
      };
    });
  };

  const reset = () => {
    setData({
      nodes: [],
      links: [],
      start: "",
      needed: [],
    });
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
      }}
    >
      <Grid>
        <Container area="nodes">
          <Airports
            handleLinkChange={addToLinks}
            handleNodeDelete={deleteNode}
          />
          <DataTaker
            label="Nodes"
            contentPopUp="Must follow this format:"
            input="Type a node."
            button="launch"
            action={addToNodes}
            runData={runData}
          />
          <button
            className={run__reset}
            onClick={data.needed.length > 0 ? reset : runData}
          >
            {data.needed.length > 0 ? "Reset" : "Run"}
          </button>
        </Container>
        <Container area="graph">
          <Graph data={data} handleStartingPoint={changeStartingPoint} />
        </Container>
      </Grid>
    </DataContext.Provider>
  );
}

export default App;
