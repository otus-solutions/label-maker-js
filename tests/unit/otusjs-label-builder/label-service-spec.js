xdescribe('Data Builder Service', function() {
  var Mock = {};
  var Service;

  var Injections = {};

  beforeEach(function() {
    module('otusjs.labelMaker.labelBuilder');

    inject(function(_$injector_) {

      Injections = {
        DataBuilder: mockDataBuilder(_$injector_)
      };

      Service = _$injector_.get('otusjs.labelMaker.labelBuilder.LabelService', Injections);
    });
  });

  describe('method', function() {
    it('asd', function() {
      //   Service.getTubesData();
    });
  });

  function mockDataBuilder(_$injector_) {
   //  Mock.DataBuilder = _$injector_.get('otusjs.labelMaker.dataBuilder.DataBuilderService');
    return Mock.DataBuilder;
  }


});
