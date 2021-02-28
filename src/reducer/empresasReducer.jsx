const EmpresaReducer = (state, action) => {
  switch (action?.type) {
    case "añadir":
      return {
        ...state,
        empresas: [...state.empresas, action?.payload],
      };
    default:
      break;
  }
};
export default EmpresaReducer;
