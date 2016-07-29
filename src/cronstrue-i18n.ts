import { ExpressionDescriptor } from "./expressionDescriptor"
import { allLocalesLoader } from "./i18n/allLocalesLoader"

ExpressionDescriptor.initialize(new allLocalesLoader());

export = ExpressionDescriptor;
