// namespace Components {
//     export class Header {
//         constructor() {
//             const elem = document.createElement('div');
//             elem.innerText = 'This is Header';
//             document.body.appendChild(elem);
//         }
//     }
define("components", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //     export class Content {
    //         constructor() {
    //             const elem = document.createElement('div');
    //             elem.innerText = 'This is Content';
    //             document.body.appendChild(elem);
    //         }
    //     }
    //     export class Footer {
    //         constructor() {
    //             const elem = document.createElement('div');
    //             elem.innerText = 'This is Footer';
    //             document.body.appendChild(elem);
    //         }
    //     }
    //     export namespace SubComponents {
    //         export class Test { }
    //     }
    // }
    var Header = /** @class */ (function () {
        function Header() {
            var elem = document.createElement('div');
            elem.innerText = 'This is Header';
            document.body.appendChild(elem);
        }
        return Header;
    }());
    exports.Header = Header;
    var Content = /** @class */ (function () {
        function Content() {
            var elem = document.createElement('div');
            elem.innerText = 'This is Content';
            document.body.appendChild(elem);
        }
        return Content;
    }());
    exports.Content = Content;
    var Footer = /** @class */ (function () {
        function Footer() {
            var elem = document.createElement('div');
            elem.innerText = 'This is Footer';
            document.body.appendChild(elem);
        }
        return Footer;
    }());
    exports.Footer = Footer;
    var SubComponents;
    (function (SubComponents) {
        var Test = /** @class */ (function () {
            function Test() {
            }
            return Test;
        }());
        SubComponents.Test = Test;
    })(SubComponents = exports.SubComponents || (exports.SubComponents = {}));
});
define("page", ["require", "exports", "components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Page = /** @class */ (function () {
        function Page() {
            new components_1.Header();
            new components_1.Content();
            new components_1.Footer();
        }
        return Page;
    }());
    exports.default = Page;
});
// namespace Home {
//     export class Page {
//         constructor() {
//             new Components.Header();
//             new Components.Content();
//             new Components.Footer();
//         }
//     }
// }
