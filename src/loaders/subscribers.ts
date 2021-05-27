import signUpSubscriber from "../subscribers/signupTest.js";
/**
 * todo - future use case - instead of having the listeners be active here, we could utilize an external queue(s) to have workers initiate/run the tasks.  Additional benefits include non-blocking for anything that could possibly be CPU intenseive/whatever, persisting even if our overall API goes down, scheduling/delaying jobs, and establishing re-tries
 *
 * @export
 */
export default function subscriberLoader(): void {
    /**
     * first, let's initiate our listeners 
    */
   const signUpListener = new signUpSubscriber();  
}