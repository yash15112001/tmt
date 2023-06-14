// apis
// clear prev_share_data
// copy data of curr_share_data to prev_share_data
// read data from excel file and save it in curr_share_data and in user
// calculate the data for share_exchange from curr_share_data and prev_share_data
// find the details of the personlized portfolio for user with user id.
// - this includes both personal and shared ownership share details with delta
// - based on that also show the information if the person has either formed new shared ownership or left any shared ownership in which user was a week ago
// abstract the database crud operations to ../services/crud.services

// based on address -> state wise data holding and delta over week for state

// api 1
// read data of excel file and accordingly save it in user and curr_share_data

// api 2
// clear the data of prev_share_data

// api 3
// transfer the data from curr_share_data to prev_share_data(after transfer delete the data from curr_share_data)

// api 4
// clear the data of share_exchange_data and calculate new data based on data saved in curr and prev share_data

// api 5
// from data saved in share_exchange_data -> get the data of user as personalized portfolio
// - this includes both personal and shared ownership share details with delta
// - based on that also show the information if the person has either formed new shared ownership or left any shared ownership in which user was a week ago

// api 6
// calculate the state wise holdings and state wise delta
// in prev and curr data -> group shares sharing same state and then calculate total shares

