describe('HELLO', function(){
    it("#hello", function(){
        spyOn(HELLO, 'initialize');

        PAGE.hello();

        expect(HELLO.initialize).toHaveBeenCalled();
    });

    describe('initialize', function(){
        beforeEach(function(){
            this.oldArgs = PAGE.args;
        });

        it('initialize without PAGE.args', function(){
            delete PAGE.args;
            HELLO.initialize();
        });

        it('initialize with PAGE.args', function(){
            PAGE.args = {};
            HELLO.initialize();
        });

        it('initialize with specific PAGE.args', function(){
            PAGE.args = {world:true};
            HELLO.initialize();
        });

        afterEach(function(){
            PAGE.args = this.oldArgs;
        });
    });
});
