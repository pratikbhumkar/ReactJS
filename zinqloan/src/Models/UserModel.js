class User{
    constructor(){
        this.User_FirstNameNew='FirstName';
        this.User_LastNameNew='LastName';
        this.status='couple'
        this.report=''
    }
    getUserFirstName(){
        return this.User_FirstNameNew
    }
    setUserFirstName(FirstName){
        this.User_FirstNameNew=FirstName
    }
    getUserLastName(){
        return this.User_LastNameNew
    }
    setUserLastName(LastName){
        this.User_LastNameNew=LastName
    }
    getUserStatus(){
        return this.status
    }
    setUserStatus(status){
        this.status=status
    }
    getUserReport(){
        return this.report
    }
    setUserReport(report){
        this.report=report
    }
}

export default User;