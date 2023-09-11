// transform connections [
// ["JFK", "LAX"],
// ["JFK", "ORD"]]

// to
// [
//   { source: "JFK", target: "LAX", value: 1 },
//   { source: "JFK", target: "ORD", value: 1 },
// ];

export const transformLinks = (links) => {
  const transformedLinks = links.map((link) => {
    if (link.source.id === link.target.id) return;
    return [link.source.id, link.target.id];
  });
  return transformedLinks;
};
