const { moveOldTasksToArchive } = require("../lib/helper");

const START = 1636521855000;
const ONE_MINUTE = 60000;
const ONE_HOUR = 60 * ONE_MINUTE;

const newTask = {
    created: START - ONE_MINUTE,
    title: 'A mighty task of spectacular derring-do',
    completed: START,
};

const oldCompletedTask = {
    created: START - ONE_HOUR,
    completed: START - ONE_HOUR + ONE_MINUTE,
    title: 'should be archived',
};

const basicInput = {
    active: [newTask, oldCompletedTask],
    archive: [],
};

const expectedBasic = {
    active: [newTask],
    archive: [oldCompletedTask],
};

describe('moveOldTasksToArchive()', () => {
    it('should move the old item to the archive', () => {
        expect(moveOldTasksToArchive(basicInput, START))
            .toEqual(expectedBasic);
    });
});