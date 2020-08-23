import cloneDeep from 'clone-deep';

const SET_ACTIVE_CELL_INPUT_VALUE = (state, { value, input }) => {
  const newState = { ...state };

  newState.isEditMode = true;

  newState.activeCellInputData = {
    ...newState.activeCellInputData,
    formulaValue: cloneDeep(value),
    cellValue: cloneDeep(value),
  };

  return newState;
};

export default SET_ACTIVE_CELL_INPUT_VALUE;
