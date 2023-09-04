// transform connections [
// ["JFK", "LAX"],
// ["JFK", "ORD"]]

// to
// [
//   { source: "JFK", target: "LAX", value: 1 },
//   { source: "JFK", target: "ORD", value: 1 },
// ];

export const transformLinks = (input) => {
  try {
    const cleanUp = input
      .replace(/\s+/g, "")
      .replace("[[", "")
      .replace("],]", "")
      .replace("]]", "")
      .split("],["); 
    
    const links = cleanUp.map((link) => {
      const [source, target] = link.split(",");
      return {
        source: source.replace(/"/g, ""),
        target: target.replace(/"/g, ""),
        value: 1,
      };
    });

    return links;
  } catch (error) {
    console.log("error");
  }
};
