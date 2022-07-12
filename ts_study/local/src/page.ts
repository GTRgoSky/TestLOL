// commonJS amd cmd umd ES6 module https://segmentfault.com/a/1190000012419990
import { Header, Content, Footer } from "./components";
export default class Page {
    constructor() {
        new Header();
        new Content();
        new Footer();
    }
}

// namespace Home {
//     export class Page {
//         constructor() {
//             new Components.Header();
//             new Components.Content();
//             new Components.Footer();
//         }
//     }
// }

