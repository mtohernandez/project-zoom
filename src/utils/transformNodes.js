export const transformNodes = (input) => {
  try {
    const nodes = JSON.parse(input);
    const nodesArray = Object.keys(nodes).map((key) => {
      return {
        id: nodes[key],
        group: key,
      };
    });
    return nodesArray;
  } catch (error) {
    console.log("error");
  }
};
