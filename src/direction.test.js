import expect from 'expect';
import { getDirectionName, isValidCoordinate, isValidDirection } from './direction.js';

before(() => {
  process.env.NODE_ENV = 'test';
});

it('should check if a coordinate is valid or invalid', () => {
  let wrongCoordinate = [2, 6];
  expect(isValidCoordinate(wrongCoordinate)).toBeFalsy();
});

it('should not accept invalid direction( other than N, S, E, W)',() =>{
   let invalidDirection = 'M';
   expect(isValidDirection(invalidDirection)).toBeFalsy();
})

it('should get correct direction full name(East, West, South, North) with short code (E,W,S,N)',() => {
    let direction = 'E';
    expect(getDirectionName(direction)).toBe('EAST')
})