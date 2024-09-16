const ChitterModel = require('./chitterModel');

describe('chitterModel', () => {
  const model = new ChitterModel();

  describe('#getChitters', () => {
    it('returns an empty array with no chitters', () => {
      expect(model.getPeeps()).toEqual([]);
    })

    it('returns the peeps present in the array', () => {
      model.addPeep('Bipolar weather we have today');
      model.addPeep('Queen\'s jubilee weekend');
      expect(model.getPeeps()).toEqual(['Bipolar weather we have today', 'Queen\'s jubilee weekend']);
    })

    it('return an empty array when the peeps are reset', () => {
      model.reset();
      expect(model.getPeeps()).toEqual([]);
    })
  })
})


//  npm run build