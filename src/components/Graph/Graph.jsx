import { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ForceGraph2D from "react-force-graph-2d";
import {
  graph__container,
  graph__container_awaiter,
  graph__container_error,
  graph__container_icon,
} from "./Graph.module.css";
import dataContext from "../../context/dataContext";
import ZoomIcon from "../../assets/ZoomIcon";
import InfoUp from "../InfoUp/InfoUp";

const Graph = ({ handleStartingPoint }) => {
  const { data } = useContext(dataContext);
  const fgRef = useRef();
  const updateDuration = 2000;

  useEffect(() => {
    if (!fgRef.current) return;
    const fg = fgRef.current;
    fg.zoomToFit(updateDuration, 250);
  }, [data]);

  const handleEngineStop = () => {
    if (!fgRef.current) return;
    const fg = fgRef.current;

    fg.zoomToFit(updateDuration, 250);
  };

  if (data.nodes?.length > 0 && data.links.length > 0) {
    return (
      <div className={graph__container}>
        <ForceGraph2D
          ref={fgRef}
          graphData={data}
          nodeLabel="id"
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 14 / globalScale;
            ctx.font = `${fontSize}px Rebond Grotesque`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle =
              data.start === node.id
                ? "yellow"
                : data.needed.includes(node.id)
                ? "#5AFF20"
                : "#FFF";
            ctx.fillText(label, node.x, node.y);
          }}
          linkColor={() => "#414141"}
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={1}
          linkDirectionalParticleColor={() => "yellow"}
          enablePanInteraction={false}
          enableZoomInteraction={false}
          backgroundColor="#252525"
          warmupTicks={10}
          cooldownTime={0}
          onEngineStop={handleEngineStop}
          autoPauseRedraw={false}
        />
        <div className={graph__container_error}>
          <select onChange={handleStartingPoint}>
            <option value="">None</option>
            {data.nodes.map((node) => {
              return (
                <option key={node.id} value={node.id}>
                  {node.id}
                </option>
              );
            })}
          </select>
          <InfoUp
            label="Riddle Interactive"
            content="If the algorithm is not working, the API is overloaded. Please try again later."
            example={[
              "1. Add the airports you want to the graph.",
              "2. Make the connection",
              "3. Click on the airport you want to start from.",
              "4. Click on Run and wait for the algorithm to run.",
            ]}
          />
        </div>
        <span className={graph__container_icon}>
          <ZoomIcon />
        </span>
      </div>
    );
  }

  if (data.nodes?.length > 0 && data.links.length === 0) {
    return (
      <div className={graph__container}>
        <h3 className={graph__container_awaiter}>Waiting for connections...</h3>
      </div>
    );
  }

  return (
    <div className={graph__container}>
      <h3 className={graph__container_awaiter}>Waiting for data...</h3>
    </div>
  );
};

export default Graph;

Graph.propTypes = {
  data: PropTypes.object,
  handleStartingPoint: PropTypes.func,
};
