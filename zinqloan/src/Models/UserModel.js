/**
 * This model stores the user data
 */
class User{
    //Setting default values.
    constructor(){
        this.User_FirstNameNew='FirstName';
        this.User_LastNameNew='LastName';
        this.status='couple'
        this.report='Congratulations!'
    }
    /**
     * Getter for First name
     * @returns First Name of user.
     */
    getUserFirstName(){
        return this.User_FirstNameNew
    }
    /**
     * Setter for first name
     * @param {}  FirstName First Name of the user 
     */
    setUserFirstName(FirstName){
        this.User_FirstNameNew=FirstName
    }
    /**
     * Getter for Last name
     * @returns Last Name of user.
     */
    getUserLastName(){
        return this.User_LastNameNew
    }
    /**
     * Setter for Last name
     * @param {}  LastName Last Name of the user 
     */
    setUserLastName(LastName){
        this.User_LastNameNew=LastName
    }
    /**
     * Getter for Status
     * @returns Status of user.
     */
    getUserStatus(){
        return this.status
    }
    /**
     * Setter for status
     * @param {}  status status of the user 
     */
    setUserStatus(status){
        this.status=status
    }
    /**
     * Getter for reports
     * @returns reports of user.
     */
    getUserReport(){
        return this.report
    }
    /**
     * Setter for report
     * @param {}  report report of the user 
     */
    setUserReport(report){
        this.report=report
    }
}

export default User;