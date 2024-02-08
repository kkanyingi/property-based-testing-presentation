import { ONE_MINUTE } from "./constants";

export const moveOldTasksToArchive = ({active, archive}, currentTime) => ({
    active: active.filter(({completed}) => currentTime - completed < ONE_MINUTE),
    archive: active.filter(({completed}) => currentTime - completed >= ONE_MINUTE).concat(archive),
});

export const fixedMoveOldTasksToArchive = ({ active, archive }, currentTime) => ({
    active: active.filter(
      ({ completed }) =>
        completed === undefined || currentTime - completed < ONE_MINUTE
    ),
    archive: active
      .filter(
        ({ completed }) =>
          completed !== undefined && currentTime - completed >= ONE_MINUTE
      )
      .concat(archive),
  });