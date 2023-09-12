import {
  ADD_TO_NODES,
  ADD_TO_LINKS,
  DELETE_NODE,
  CHANGE_START_NODE,
  RESET_DATA,
  SET_NEEDED,
} from "../actions/actionTypes";

export const initialState = {
  nodes: [],
  links: [],
  start: "",
  needed: [],
  loading: false,
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_NODES:
      if (action.payload.trim() === "") return state;
      if (state.nodes.find((node) => node.id === action.payload.trim())) return state;
      return {
        ...state,
        nodes: [...state.nodes, { id: action.payload.trim(), group: 1 }],
      };

    case ADD_TO_LINKS:
      if (action.payload.source === "") return state;
      if (action.payload.target === "") {
        return {
          ...state,
          links: state.links.filter(
            (link) => link.source.id !== action.payload.source
          ),
        };
      }

      if (
        state.links.find(
          (link) =>
            link.source.id === action.payload.source &&
            link.target.id === action.payload.target
        )
      )
        return state;

      if (
        state.links.find((link) => link.source.id === action.payload.source)
      ) {
        const newLinks = state.links.map((link) => {
          if (link.source.id === action.payload.source) {
            return {
              ...link,
              target: action.payload.target,
            };
          }
          return link;
        });
        return {
          ...state,
          links: newLinks,
        };
      } else {
        return {
          ...state,
          links: [
            ...state.links,
            { source: action.payload.source, target: action.payload.target },
          ],
        };
      }

    case DELETE_NODE:
      return {
        ...state,
        nodes: state.nodes.filter((n) => n.id !== action.payload),
        links: state.links.filter(
          (link) =>
            link.source.id !== action.payload &&
            link.target.id !== action.payload
        ),
        start: state.start === action.payload ? "" : state.start,
      };

    case CHANGE_START_NODE:
      return {
        ...state,
        start: action.payload,
      };
    
    case SET_NEEDED:
      return {
        ...state,
        links: [...state.links, ...action.payload.links],
        needed: action.payload.needed,
      };

    case RESET_DATA:
      return initialState;
    default:
      return state;
  }
};
