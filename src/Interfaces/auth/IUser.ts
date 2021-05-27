
/**
 * interface to define what our user object will consist of 
 * This will be used to create the documents we're storing with mongoose but also interacting with around our APi
 *
 * @export
 * @interface IUser
 */
export default interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    salt: string;
    hash: string;
}