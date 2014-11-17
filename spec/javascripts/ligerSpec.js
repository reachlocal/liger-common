describe('LIGER', function() {
    it("#openPage", function(){
        spyOn(cordova, 'exec');
        LIGER.openPage('test','test',{"foo":"bar"});

        expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "openPage", [ 'test', 'test', {"foo":"bar"}, {}]);
	});

    it("#closePage", function(){
        spyOn(cordova, 'exec');
        LIGER.closePage();

        expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "closePage", []);
    });

    it("#closeToPage", function(){
        spyOn(cordova, 'exec');
        LIGER.closeToPage('test');

        expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "closePage", ['test']);
    });    

    it("#updateParent", function(){
        spyOn(cordova, 'exec');
        LIGER.updateParent({'foo':'bar'});

        expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "updateParent", [null, {'foo':'bar'}]);
    });

    it("#updateParentPage", function(){
        spyOn(cordova, 'exec');
        LIGER.updateParentPage('test',{'foo':'bar'});

        expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "updateParent", ['test', {'foo':'bar'}]);
    });

    it("#childUpdates", function(){
        spyOn(PAGE, 'childUpdates');
        LIGER.childUpdates({'foo':'bar'});
        expect(PAGE.childUpdates).toHaveBeenCalledWith({'foo':'bar'});
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

        spyOn(cordova, 'exec');
        LIGER.getPageArgs(testSuccess, testFail, "Liger", "getPageArgs", []);

        expect(cordova.exec).toHaveBeenCalledWith(testSuccess, testFail, "Liger", "getPageArgs", []);
    });    

    it("#openDialog", function(){
        spyOn(cordova, 'exec');
        LIGER.openDialog('test',{'foo':'bar'});

        expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "openDialog", ['test', {'foo':'bar'}, {}]);
    });

    it("#openDialogWithTitle", function(){
        spyOn(cordova, 'exec');
        LIGER.openDialogWithTitle('test', 'test', {'foo':'bar'});

        expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "openDialogWithTitle", ['test', 'test', {'foo':'bar'}, {}]);
    });

    it("#closeDialog", function(){
        spyOn(cordova, 'exec');
        LIGER.closeDialog({'foo':'bar'});

        expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "closeDialog", [{'foo':'bar'}]);
    });

    it("#closeDialogArguments", function(){
        spyOn(PAGE, 'closeDialogArguments');
        LIGER.closeDialogArguments({'foo':'bar'});

        expect(PAGE.closeDialogArguments).toHaveBeenCalledWith({'foo':'bar'});
    });

    it("#toolbar", function(){
        spyOn(cordova, 'exec');
        LIGER.toolbar(['test','test1','test2']);

        expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "toolbar", [['test','test1','test2']]);
    });

    it("#userCanRefresh", function(){
        spyOn(cordova, 'exec');
        LIGER.userCanRefresh(true);
        expect(cordova.exec).toHaveBeenCalledWith(null, null, "Liger", "userCanRefresh", [true]);
    });
});
