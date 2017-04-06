//directive for enter to send msg
export function ngEnter(){
     return function(scope, element, attrs) {
        element.bind("keydown", (e) => {
            if(e.which === 13) {
                scope.$apply(() => {
                    scope.$eval(attrs.ngEnter, {'e': e});
                });
                e.preventDefault();
            }
        });
    };
}