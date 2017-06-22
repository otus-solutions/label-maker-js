describe('Data Builder Service', function() {
  var Mock = {};
  // var Service;
  var tubesList = [
    {
      "code": "261500002",
      "type": "Urina"
     },

    {
      "code": "261500001",
      "type": "Urina"
     },

    {
      "code": "261400008",
      "type": "EDTA"
     },

    {
      "code": "261400007",
      "type": "EDTA"
     },

    {
      "code": "261400006",
      "type": "EDTA"
     },

    {
      "code": "261400005",
      "type": "EDTA"
     },

    {
      "code": "261300002",
      "type": "Citrato"
     },

    {
      "code": "261200004",
      "type": "Fluoreto"
     },

    {
      "code": "261200003",
      "type": "Fluoreto"
     },

    {
      "code": "261100008",
      "type": "Gel"
     },

    {
      "code": "261100007",
      "type": "Gel"
     },

    {
      "code": "261100006",
      "type": "Gel"
     }
   ];
  var baseInfo = {
    recruitment_number: '1073915',
    participant_name: 'Susana',
    gender: 'F',
    birthday: '06/11/1961',
    cq_group: 'Nenhum',
};

  beforeEach(function() {
    module('otusjs.labelMaker.dataBuilder');

    inject(function(_$injector_) {
      Service = _$injector_.get('otusjs.labelMaker.dataBuilder.DataBuilderService');
    });
  });

  describe('fetchTubesData method', function() {
     it('asd', function() {
        Service.fetchTubesData();
     });
  });

  describe('fetchTubesData method', function() {

  });


});
