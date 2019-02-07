import User from '../Models/UserModel'

var user =new User()
var intialState={
    user:user,
    SessionKey:0
}



var reducer= (state=intialState,action)=>{
    var date= new Date()

    if(action.type ==='User_Login'){
        user.setUserFirstName(action.FirstName)
        user.setUserLastName(action.LastName)
        user.setUserEmail(action.Email)
        var browsingHistory=user.getUserHistory()
        browsingHistory=browsingHistory.concat("User_Login")
        user.setUserHistory(browsingHistory)
        user.setUserTimestamp(date.toDateString())
        user.setUserCookieKey(action.SessionKey)
        fetch(`http://localhost:5000/log/add?user_email=${action.Email}
        &sessionkey=${state.SessionKey}&page=${'User_Login'}&entry_type=${'success'}&user_action=${'User_Login_success'}`)
        
    }
    if(action.type==='User_Welcome') {
        browsingHistory=user.getUserHistory()
        browsingHistory=browsingHistory.concat("User_Welcome")
        user.setUserHistory(browsingHistory)
        user.setUserStatus(action.status)
        fetch(`http://localhost:5000/log/add?user_email=${action.Email}
        &sessionkey=${state.SessionKey}&page=${'User_Welcome'}&entry_type=${'success'}&user_action=${'User_Welcome_success'}`)
        
    }
    if(action.type==='User_Status') {
        browsingHistory=user.getUserHistory()
        browsingHistory=browsingHistory.concat("User_Status")
        user.setUserHistory(browsingHistory)
        user.setUserStatus(action.status)
        fetch(`http://localhost:5000/log/add?user_email=${action.Email}
        &sessionkey=${state.SessionKey}&page=${'User_Status'}&entry_type=${'success'}&user_action=${'User_Status_success'}`)
        
    }
    if(action.type==='User_Selection') {
        browsingHistory=user.getUserHistory()
        browsingHistory=browsingHistory.concat("User_Selection")
        user.setUserHistory(browsingHistory)
        fetch(`http://localhost:5000/log/add?user_email=${action.Email}
        &sessionkey=${state.SessionKey}&page=${'User_Selection'}&entry_type=${'success'}&user_action=${'User_Selection_success'}`)
        
    }
    if(action.type==='User_Income_Expenses') {
        browsingHistory=user.getUserHistory()
        browsingHistory=browsingHistory.concat("User_Income_Expenses")
        user.setUserHistory(browsingHistory)
        user.setUserIncome(action.income)
        user.setUserExpense(action.expense)
        user.setUserReport(action.report)
        var  userObjString=JSON.stringify(user)
        fetch(`http://localhost:5000/log/add?user_email=${action.Email}
        &sessionkey=${state.SessionKey}&page=${'User_Income_Expenses'}&entry_type=${'success'}&user_action=${'User_Income_Expenses_success'}`)
        
        fetch(`http://localhost:5000/user/history?userObj=${userObjString}`)
        .then((response) => { 
            return response.json() 
        }).then((response) => {
        })
        .catch((err)=> console.log(err) )

    }
    if(action.type==='User_Report') {
        browsingHistory=user.getUserHistory()
        browsingHistory=browsingHistory.concat("User_Report")
        user.setUserHistory(browsingHistory)
        fetch(`http://localhost:5000/log/add?user_email=${action.Email}
        &sessionkey=${state.SessionKey}&page=${'User_Selection'}&entry_type=${'success'}&user_action=${'User_Selection_success'}`)
        
    }
    return state
}

export default reducer;