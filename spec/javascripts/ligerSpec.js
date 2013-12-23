require(['app/vendor/liger.js'], function(){ 
  require('app/vendor/liger.js');
});

describe('LIGER', function() {
	it("#openPage", function(){
		runs(function(){
            spyOn(cordova, 'exec');
            LIGER.openPage('test','test',{"foo":"bar"});
        });

        runs(function() {
            expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "openPage", [ 'test', 'test', {"foo":"bar"}]);
        });
	});

    it("#closePage", function(){
        runs(function(){
            spyOn(cordova, 'exec');
            LIGER.closePage();
        });

        runs(function() {
            expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "closePage", []);
        });
    });

    it("#closeToPage", function(){
        runs(function(){
            spyOn(cordova, 'exec');
            LIGER.closeToPage('test');
        });

        runs(function() {
            expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "closePage", ['test']);
        });
    });    

    it("#updateParent", function(){
        runs(function(){
            spyOn(cordova, 'exec');
            LIGER.updateParent({'foo':'bar'});
        });

        runs(function() {
            expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "updateParent", [null, {'foo':'bar'}]);
        });
    });

    it("#updateParentPage", function(){
        runs(function(){
            spyOn(cordova, 'exec');
            LIGER.updateParentPage('test',{'foo':'bar'});
        });

        runs(function() {
            expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "updateParent", ['test', {'foo':'bar'}]);
        });
    });

    it("#childUpdates", function(){
        runs(function(){
            spyOn(PAGE, 'childUpdates');
            LIGER.childUpdates({'foo':'bar'});
        });

        runs(function() {
            expect(PAGE.childUpdates).toHaveBeenCalledWith({'foo':'bar'});
        });
    });    

    it("#openPageArguments", function(){
        beforeEach(function(){
            PAGE.args = null;
        });

        LIGER.openPageArguments({'foo':'bar'});
        expect(PAGE.args).toEqual({'foo':'bar'});
    });    

    xit("#getPageArgs", function(){
        var testSuccess = function(args){
            PAGE.gotPageArgs(args);
        };

        var testFail = function(error){
            return false;
        }

        runs(function(){
            spyOn(cordova, 'exec');
            LIGER.getPageArgs(testSuccess, testFail, "Liger", "getPageArgs", []);
        });

        runs(function() {
            expect(cordova.exec).toHaveBeenCalledWith(testSuccess, testFail, "Liger", "getPageArgs", []);
        });
    });    

    it("#openDialog", function(){
        runs(function(){
            spyOn(cordova, 'exec');
            LIGER.openDialog('test',{'foo':'bar'});
        });

        runs(function() {
            expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "openDialog", ['test', {'foo':'bar'}]);
        });
    });

    it("#openDialogWithTitle", function(){
        runs(function(){
            spyOn(cordova, 'exec');
            LIGER.openDialogWithTitle('test', 'test', {'foo':'bar'});
        });

        runs(function() {
            expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "openDialogWithTitle", ['test', 'test', {'foo':'bar'}]);
        });
    });

    it("#closeDialog", function(){
        runs(function(){
            spyOn(cordova, 'exec');
            LIGER.closeDialog({'foo':'bar'});
        });

        runs(function() {
            expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "closeDialog", [{'foo':'bar'}]);
        });
    });

    it("#closeDialogArguments", function(){
        runs(function(){
            spyOn(PAGE, 'closeDialogArguments');
            LIGER.closeDialogArguments({'foo':'bar'});
        });

        runs(function() {
            expect(PAGE.closeDialogArguments).toHaveBeenCalledWith({'foo':'bar'});
        });
    });

    it("#toolbar", function(){
        runs(function(){
            spyOn(cordova, 'exec');
            LIGER.toolbar(['test','test1','test2']);
        });

        runs(function() {
            expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "toolbar", [['test','test1','test2']]);
        });
    });

    it("#userCanRefresh", function(){
        runs(function(){
            spyOn(cordova, 'exec');
            LIGER.userCanRefresh(true);
        });

        runs(function() {
            expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "userCanRefresh", [true]);
        });
    });
});