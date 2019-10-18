

const sum = (a, b) => a + b;


test('case 1', () => {
    expect(sum(1, 2)).toBe(3)
})

describe('LOGIN', () => {
    test('LOGIN01', () => {
        console.log('test for describe inner 1');
        expect(true).toEqual(true);
    });
    test('LOGIN02', () => {
        console.log('test for describe inner 1');
        expect(false).toEqual(true);
    });
    test('LOGIN03', () => {
        console.log('test for describe inner 1');
        expect('true').toEqual(true);
    });
});