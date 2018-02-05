import { helper } from '@ember/component/helper';

export function statusRule(params/*, hash*/) {
 const statusRule = {
   "loading setting" : "Awaiting receipt",
   "yellow hand paper" : "Response waiting",
   "yellow cube" : "Completion of purchase",
   "green shipping" : "Local delivery",
   "green plane" : "International Shipping",
   "red credit card alternative" : "Card error",
   "crosshairs" : "Order reception",
   "green check" : "Delivery complete",
   "red remove" : "Order cancellation",
   "yellow warning" : "Order cancellation"
 }

 return statusRule[params];
}

export default helper(statusRule);