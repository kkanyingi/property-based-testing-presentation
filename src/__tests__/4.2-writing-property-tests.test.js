import * as fc from 'fast-check';
import { moveOldTasksToArchive } from '../lib/helper';

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
            const newState = moveOldTasksToArchive(s, dt.getTime());
            const actualLength = newState.active.length + newState.archive.length;
            const expectedLength = s.active.length + s.archive.length;
            expect(actualLength).toBe(expectedLength);
        });
        fc.assert(lengthProperty, {numRuns: 10000});
    });
});