import * as fc from 'fast-check';
import { fixedMoveOldTasksToArchive } from '../lib/helper';
import { ONE_MINUTE } from '../lib/constants';

const genTodo = () => fc.record(
    {
        created: fc.date(),
        title: fc.string(),
        offset: fc.nat(),
    },
    { requiredKeys: ['created', 'title'] }
).map(({created, title, offset}) => ({
    created: created.getTime(),
    title,
    completed: offset !== undefined ? created.getTime() + offset : undefined,
}));

const genTaskState = () => fc.record({
    active: fc.array(genTodo()),
    archive: fc.array(genTodo()),
});


describe('moveOldTasksToArchive()', () => {
    test('should ALWAYS return the same total number of tasks', () => {
        const lengthProperty = fc.property(genTaskState(), fc.date(), (s, dt) => {
            const newState = fixedMoveOldTasksToArchive(s, dt.getTime());
            const actualLength = newState.active.length + newState.archive.length;
            const expectedLength = s.active.length + s.archive.length;
            expect(actualLength).toBe(expectedLength);
        });
        fc.assert(lengthProperty, {numRuns: 10000});
    });

    test('should NEVER have more tasks in the archive then we started with', () => {
        const noNewTasksProperty = fc.property(genTaskState(), fc.date(), (s, dt) => {
            const {archive} = fixedMoveOldTasksToArchive(s, dt.getTime());
            expect(archive.every(task => s.archive.includes(task) || s.active.includes(task))).toBe(
                true
            );
        });
        fc.assert(noNewTasksProperty, {numRuns: 10000});
    });

    test('should ALWAYS return .active state that is either incomplete, or, completed less than 60 seconds before the date ', () => {
        const allActiveRecentProperty = fc.property(genTaskState(), fc.date(), (s, dt) => {
            const newState = fixedMoveOldTasksToArchive(s, dt.getTime());
            expect(
                newState.active.some(
                    ({completed}) => completed !== undefined && dt - completed > ONE_MINUTE
                )
            ).toBe(false);
        });
        fc.assert(allActiveRecentProperty, {numRuns: 10000});
    });
});