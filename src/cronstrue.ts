import { ExpressionDescriptor } from "./expressionDescriptor";
import { enLocaleLoader } from "./i18n/enLocaleLoader";

ExpressionDescriptor.initialize(new enLocaleLoader());
export default ExpressionDescriptor;

let toString = ExpressionDescriptor.toString;
export { toString };
