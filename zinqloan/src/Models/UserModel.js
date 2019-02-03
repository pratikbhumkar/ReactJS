/**
 * This model stores the user data
 */
class User{
    //Setting default values.
    constructor(){
        this.User_FirstNameNew='FirstName';
        this.User_LastNameNew='LastName';
        this.email='Email'
        this.status='couple'
        this.report='Congratulations!'
        this.income=0
        this.expense=0
        this.timestamp=""
        this.browsingHistory=[]
        this.cookieKey=0
        this.userKey=0
    }

    getUserCookieKey(){
        return this.cookieKey
    }
    /**
     * Setter for first name
     * @param {}  cookieKey First Name of the user 
     */
    setUserCookieKey(cookieKey){
        this.cookieKey=cookieKey
    }


    getUserKey(){
        return this.userKey
    }
    /**
     * Setter for first name
     * @param {}  userKey First Name of the user 
     */
    setUserKey(userKey){
        this.userKey=userKey
    }


    getUserTimestamp(){
        return this.timestamp
    }
    /**
     * Setter for first name
     * @param {}  timestamp First Name of the user 
     */
    setUserTimestamp(timestamp){
        this.timestamp=timestamp
    }
    getUserHistory(){
        return this.browsingHistory
    }
    /**
     * Setter for first name
     * @param {}  timestamp First Name of the user 
     */
    setUserHistory(browsingHistory){
        this.browsingHistory=browsingHistory
    }

    getUserExpense(){
        return this.expense
    }
    /**
     * Setter for first name
     * @param {}  expense First Name of the user 
     */
    setUserExpense(expense){
        this.expense=expense
    }



    getUserIncome(){
        return this.income
    }
    /**
     * Setter for first name
     * @param {}  income First Name of the user 
     */
    setUserIncome(income){
        this.income=income
    }



    getUserEmail(){
        return this.email
    }
    /**
     * Setter for first name
     * @param {}  FirstName First Name of the user 
     */
    setUserEmail(email){
        this.email=email
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