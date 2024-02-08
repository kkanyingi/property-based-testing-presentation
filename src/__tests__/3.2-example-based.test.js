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

const emptyInput = {active: [], archive: []};

const oldAbandonedTask = {
    created: START - ONE_HOUR,
    title: 'Abandoned, not completed',
};

const populatedArchive = {
    active: [oldCompletedTask],
    archive: [oldAbandonedTask],
};

const expectedPopulated = {
    active: [],
    archive: [oldCompletedTask, oldAbandonedTask],
};

describe.each`
    description            | input               | date     | expected
-----------------------------------------------------------------------------
    ${'Basic example'}     | ${basicInput}       | ${START} | ${expectedBasic}
    ${'Empty arrays'}      | ${emptyInput}       | ${START} | ${emptyInput}
    ${'Populated archive'} | ${populatedArchive} | ${START} | ${expectedPopulated}
`('$description', ({input, date, expected}) => {
    test(`Given a sample state and date,
          when we run moveOldTasksToArchive(),
          it should return the expected output`, () => {
        expect(moveOldTasksToArchive(input, date))
            .toEqual(expected);
    });
});