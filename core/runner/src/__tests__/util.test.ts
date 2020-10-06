import {findNextShort} from "../util";

test('findNextShort empty', function () {
    expect(findNextShort('abc', [])).toEqual('a');
});

test('findNextShort a', function () {
    expect(findNextShort('abc', ['a'])).toEqual('A');
});

test('findNextShort ab', function () {
    expect(findNextShort('abc', ['a', 'A'])).toEqual('b');
});

test('findNextShort abc', function () {
    expect(findNextShort('ab', ['a', 'b', 'A', 'B'])).toEqual('c');
});

test('findNextShort abAB', function () {
    expect(findNextShort('ab', ['a', 'b', 'A', 'B'])).toEqual('c');
});
