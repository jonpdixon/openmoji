const { filter } = require('lodash');
const { expect } = require('chai');

const argv = require('optimist').demand('openmoji-data-json').argv;
const openmojiDataJson = argv['openmoji-data-json'];
const openmojis = require(openmojiDataJson);

const { createDoc } = require('./utils/utils');
const validLayerNames = ['grid', 'line', 'color', 'hair', 'skin', 'skin-shadow', 'color-foreground', 'line-supplement'];


describe('Layers', function() {
  const emojis = filter(openmojis, (e) => { return e.skintone == '' });

  describe('#line layer existing?', function() {
    emojis.forEach(emoji => {
      it(`${emoji.emoji} ${emoji.hexcode}.svg should have a #line layer`, function(){
        const doc = createDoc(emoji);
        expect( doc.querySelector('#line') ).to.exist;
      });
    });
  });

  describe('#color layer existing?', function() {
    emojis.forEach(emoji => {
      it(`${emoji.emoji} ${emoji.hexcode}.svg should have a #color layer`, function(){
        const doc = createDoc(emoji);
        expect( doc.querySelector('#color') ).to.exist;
      });
    });
  });

  describe('#grid layer existing?', function() {
    emojis.forEach(emoji => {
      it(`${emoji.emoji} ${emoji.hexcode}.svg should have a #grid layer`, function(){
        const doc = createDoc(emoji);
        expect( doc.querySelector('#grid') ).to.exist;
      });
    });
  });

  describe('Layers (<g> elements) have valid OpenMoji layer names?', function() {
    emojis.forEach(emoji => {
      it(`${emoji.emoji} ${emoji.hexcode}.svg should only have valid OpenMoji layers`, function() {
        const doc = createDoc(emoji);
        const query = doc.querySelectorAll('svg > g');
        query.forEach(el => {
          expect(validLayerNames).to.include(el.getAttribute('id'));
        });
      });
    });
  });

});
