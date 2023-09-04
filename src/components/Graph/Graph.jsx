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

const Graph = () => {
  const { data } = useContext(dataContext);
  const fgRef = useRef();
  const updateDuration = 2000;

  useEffect(() => {
    if (!fgRef.current) return;
    const fg = fgRef.current;
    fg.zoomToFit(updateDuration, 150);
  }, [data]);

  const handleEngineStop = () => {
    if (!fgRef.current) return;
    const fg = fgRef.current;

    fg.zoomToFit(updateDuration, 150);
  };

  if (data.nodes.length > 0 && data.links.length > 0) {
    return (
      <div className={graph__container}>
        <ForceGraph2D
          ref={fgRef}
          graphData={data}
          nodeLabel="id"
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Rebond Grotesque`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#fff";
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
        <h3 className={graph__container_error}>
          If the graph turns gray, check your data.
        </h3>
        <span className={graph__container_icon}>
          <ZoomIcon />
        </span>
      </div>
    );
  }

  if (data.nodes.length > 0 && data.links.length === 0) {
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
};
