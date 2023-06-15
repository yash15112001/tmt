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

const sequelize =  require('sequelize')
const axios = require('axios')

const xlsx = require('xlsx')
const User = require('../models/user')
const CurrShareData = require('../models/curr_share_data')
const PrevShareData = require('../models/prev_share_data')
const ShareExchangeData = require('../models/share_exchange_data')
const Portfolio = require('../models/portfolio')

const upload_formalise_and_populate_new_data = async (req,res)=>{
    if(!req.file) res.status(400).json({message:"no file uploaded",success:false})
    else{
        try {
            const fileBuffer = req.file.buffer;
            const workbook = xlsx.read(fileBuffer)
            const sheetName = workbook.SheetNames[0]    
            const worksheet = workbook.Sheets[sheetName]

            const jsonData = xlsx.utils.sheet_to_json(worksheet)

            for(let i=2;i<jsonData.length;i++){
                // if jsonData[i]['RUDRA GLOBAL INFRA PRODUCTS LIMITED'] does not exists create -> exists -> if not active -> update
                // if jsonData[i].__EMPTY_3 does not exists create -> exists -> if not active -> update
                // if jsonData[i].__EMPTY_4 does not exists create -> exists -> if not active -> update
                // after that using ref of these users' array and rest of data and add in curr_share_data

                let name1,name2,name3;
                if(jsonData[i]['RUDRA GLOBAL INFRA PRODUCTS LIMITED']){
                    name1 = isNaN(jsonData[i]['RUDRA GLOBAL INFRA PRODUCTS LIMITED']) ? jsonData[i]['RUDRA GLOBAL INFRA PRODUCTS LIMITED'].trim() : jsonData[i]['RUDRA GLOBAL INFRA PRODUCTS LIMITED']
                    const user = await User.findOne({
                        where: {name1},
                    });
                    if(user){
                        //check if the user is active or not? if not then update it to active
                        user.is_active = true
                        await user.save();
                    }else{
                        // create user with address
                        let addl1,addl2,addl3,addl4,pincode,is_active=true;

                        // here destructurlize the address and make it's format compatable to calculate state,country,city wise delta
                        addl1 = isNaN(jsonData[i].__EMPTY_5) ? jsonData[i].__EMPTY_5.trim() : jsonData[i].__EMPTY_5
                        if(jsonData[i].__EMPTY_6)   addl2 = isNaN(jsonData[i].__EMPTY_6) ? jsonData[i].__EMPTY_6.trim() : jsonData[i].__EMPTY_6
                        if(jsonData[i].__EMPTY_7)   addl3 = isNaN(jsonData[i].__EMPTY_7) ? jsonData[i].__EMPTY_7.trim() : jsonData[i].__EMPTY_7
                        if(jsonData[i].__EMPTY_8)   addl4 = isNaN(jsonData[i].__EMPTY_8) ? jsonData[i].__EMPTY_8.trim() : jsonData[i].__EMPTY_8 
                        pincode = isNaN(jsonData[i].__EMPTY_9) ? jsonData[i].__EMPTY_9.trim() : jsonData[i].__EMPTY_9
                        pincode = Number(pincode)

                        // try {
                        //     const response = await axios.get(`http://api.zippopotam.us/us/${pincode}`);
                        //     const { city, state, country } = response.data.places[0];
                        // } catch (error) {
                            
                        // }
                        

                        // create user in user database:
                        // use name2 as user's name
                        
                        await User.create({
                            name: name1,
                            addl1,addl2,addl3,addl4,pincode,is_active
                        })
                    }
                }

                if(jsonData[i].__EMPTY_3){
                    
                    name2 = isNaN(jsonData[i].__EMPTY_3) ? jsonData[i].__EMPTY_3.trim() : jsonData[i].__EMPTY_3
                    const user = await User.findOne({
                        where: {name2},
                    });
                    if(user){
                        //check if the user is active or not? if not then update it to active
                        user.is_active = true
                        await user.save();
                    }else{
                        // create user with address
                        let addl1,addl2,addl3,addl4,pincode,is_active=true;
                        addl1 = isNaN(jsonData[i].__EMPTY_5) ? jsonData[i].__EMPTY_5.trim() : jsonData[i].__EMPTY_5
                        if(jsonData[i].__EMPTY_6)   addl2 = isNaN(jsonData[i].__EMPTY_6) ? jsonData[i].__EMPTY_6.trim() : jsonData[i].__EMPTY_6
                        if(jsonData[i].__EMPTY_7)   addl3 = isNaN(jsonData[i].__EMPTY_7) ? jsonData[i].__EMPTY_7.trim() : jsonData[i].__EMPTY_7
                        if(jsonData[i].__EMPTY_8)   addl4 = isNaN(jsonData[i].__EMPTY_8) ? jsonData[i].__EMPTY_8.trim() : jsonData[i].__EMPTY_8 
                        pincode = isNaN(jsonData[i].__EMPTY_9) ? jsonData[i].__EMPTY_9.trim() : jsonData[i].__EMPTY_9
                        pincode = Number(pincode)

                        // create user in user database:
                        // use name2 as user's name
                        
                        await User.create({
                            name: name2,
                            addl1,addl2,addl3,addl4,pincode,is_active
                        })
                    }
                }

                if(jsonData[i].__EMPTY_4){
                    name3 = isNaN(jsonData[i].__EMPTY_4) ? jsonData[i].__EMPTY_4.trim() : jsonData[i].__EMPTY_4
                    const user = await User.findOne({
                        where: {name3},
                    });
                    if(user){
                        //check if the user is active or not? if not then update it to active
                        user.is_active = true
                        await user.save();
                    }else{
                        // create user with address
                        let addl1,addl2,addl3,addl4,pincode,is_active=true;
                        addl1 = isNaN(jsonData[i].__EMPTY_5) ? jsonData[i].__EMPTY_5.trim() : jsonData[i].__EMPTY_5
                        if(jsonData[i].__EMPTY_6)   addl2 = isNaN(jsonData[i].__EMPTY_6) ? jsonData[i].__EMPTY_6.trim() : jsonData[i].__EMPTY_6
                        if(jsonData[i].__EMPTY_7)   addl3 = isNaN(jsonData[i].__EMPTY_7) ? jsonData[i].__EMPTY_7.trim() : jsonData[i].__EMPTY_7
                        if(jsonData[i].__EMPTY_8)   addl4 = isNaN(jsonData[i].__EMPTY_8) ? jsonData[i].__EMPTY_8.trim() : jsonData[i].__EMPTY_8 
                        pincode = isNaN(jsonData[i].__EMPTY_9) ? jsonData[i].__EMPTY_9.trim() : jsonData[i].__EMPTY_9
                        pincode = Number(pincode)

                        // create user in user database:
                        // use name2 as user's name
                        
                        await User.create({
                            name: name1,
                            addl1,addl2,addl3,addl4,pincode,is_active
                        })
                    }
                }

                // after all users created/found -> save instance in curr_share_data with all_user_id and other info
                const share_owners = []

                if(jsonData[i]['RUDRA GLOBAL INFRA PRODUCTS LIMITED']){
                    name1 = isNaN(jsonData[i]['RUDRA GLOBAL INFRA PRODUCTS LIMITED']) ? jsonData[i]['RUDRA GLOBAL INFRA PRODUCTS LIMITED'].trim() : jsonData[i]['RUDRA GLOBAL INFRA PRODUCTS LIMITED']
                    const user = await User.findOne({
                        where: {name1},
                    });
                    if(user){
                        share_owners.push(user.id)
                    }
                }

                if(jsonData[i].__EMPTY_3){
                    name2 = isNaN(jsonData[i].__EMPTY_3) ? jsonData[i].__EMPTY_3.trim() : jsonData[i].__EMPTY_3
                    const user = await User.findOne({
                        where: {name2},
                    });
                    if(user){
                        share_owners.push(user.id)
                    }
                }

                if(jsonData[i].__EMPTY_4){
                    name3 = isNaN(jsonData[i].__EMPTY_4) ? jsonData[i].__EMPTY_4.trim() : jsonData[i].__EMPTY_4
                    const user = await User.findOne({
                        where: {name3},
                    });
                    if(user){
                        share_owners.push(user.id)
                    }
                }

                let share_quantity,hold_minor,share_type,dpid,holder_fol,is_considered;
                share_quantity = isNaN(jsonData[i].__EMPTY_10) ? jsonData[i].__EMPTY_10.trim() : jsonData[i].__EMPTY_10
                hold_minor = isNaN(jsonData[i].__EMPTY_11) ? jsonData[i].__EMPTY_11.trim() : jsonData[i].__EMPTY_11
                share_type = isNaN(jsonData[i].__EMPTY_12) ? jsonData[i].__EMPTY_12.trim() : jsonData[i].__EMPTY_12
                dpid = isNaN(jsonData[i].__EMPTY_1) ? jsonData[i].__EMPTY_1.trim() : jsonData[i].__EMPTY_1
                holder_fol = isNaN(jsonData[i].__EMPTY_2) ? jsonData[i].__EMPTY_2.trim() : jsonData[i].__EMPTY_2
                is_considered= false

                // using share_owners,share_quantity,hold_minor,share_type,dpid,holder_fol -> save instance in curr_share_data

                await CurrShareData.create({
                    share_owners,share_quantity,hold_minor,share_type,dpid,holder_fol,is_considered
                })
            
            }

            return res.status(200).json({jsonData,message:"File uploaded and formatted json data.",success:true})
        } catch (error) {
            return res.status(500).json({message:"Error occurred while uploading excel file",success:false})                
        }
    }
};

const clear_prev_table_data = async(req,res)=>{
    PrevShareData.destory({truncate:true}).then(()=>{
        return res.status(200).json({message:"Preious week's data has been wiped.",success:true})
    }).catch((error)=>{
        return res.status(500).json({message:"Error occured while deleting old data.",message2:error.message,success:false})
    })
};

const move_curr_to_prev = async(req,res)=>{
    CurrShareData.findAll().then((data)=>{
        return PrevShareData.bulkCreate(data.map((row)=>row.toJSON()));
    }).then(()=>{
        return CurrShareData.destory({truncate:true});
    }).then(()=>{
        return res.status(200).json({message:"Data Moved Successfully.",success:true})
    }).catch((error)=>{
        return res.status(500).json({message:"Some Error Occurred During moving Data.",message2:error.message,success:false})
    })
};

const calculate_share_exchange = async(req,res)=>{
    try {
        const prevWeekData = await PrevShareData.findAll();
        const currWeekData = await CurrShareData.findAll();

        for(const currData of currWeekData){
            const prevData = prevWeekData.find(data => data.share_owners === currData.share_owners && !data.is_considered);
            if(prevData){
                const shareDelta = currData.share_quantity - prevData.share_quantity;
                let new_hold_minor_status,new_share_type_status
                
                const in_between = " to "
                if(prevData.hold_minor !== currData.hold_minor) new_hold_minor_status = prevData.hold_minor+in_between+currData.hold_minor;
                else new_hold_minor_status = prevData.hold_minor;

                if(prevData.share_type !== currData.share_type) new_share_typee_status = prevData.share_type+in_between+currData.share_type;
                else new_share_type_status = prevData.share_type

                await ShareExchangeData.create({
                    share_delta: shareDelta,
                    share_owners: currData.share_owners,
                    curr_share_data_index: currData.id,
                    prev_share_data_index: prevData.id,
                    hold_minor_status: new_hold_minor_status,
                    share_type_status: new_share_type_status         
                });

                prevData.is_considered = true;
                await prevData.save();
                currData.is_considered = true;
                await currData.save();
            }
        }

        for(const currData of currWeekData){
            if(!currData.is_considered){
                const shareDelta = currData.share_quantity;
                await ShareExchangeData.create({
                    share_delta: shareDelta,
                    share_owners: currData.share_owners,
                    curr_share_data_index: currData.id,
                    prev_share_data_index: null,
                    hold_minor_status: currData.hold_minor,
                    share_type_status: currData.share_type
                });

                currData.is_considered = true;
                await currData.save();
            }
        }

        // those instances which are left in the prevWeekData as is_considered:false -> for group -> either some one left group -> either some one joinedd group -> either every one split and some/all have sold thier stakes
        // those instances which are left in the prevWeekData as is_considered:false -> for one person -> either joined a group -> sold all shares -> in this case mark them in active

        for(const prevData of prevWeekData){
            if(!prevData.is_considered){
                const shareDelta = -prevData.share_quantity;
                await ShareExchangeData.create({
                    share_delta: shareDelta,
                    share_owners: prevData.share_owners,
                    curr_share_data_index: null,
                    prev_share_data_index: prevData.id,
                    hold_minor_status: prevData.hold_minor,
                    share_type_status: prevData.share_type
                });

                prevData.is_considered = true;
                await prevData.save();
            }
        }

        return res.status(200).json({message:"The Share Delta has been calculated successfully.",success:true})

    } catch (error) {
        return res.status(500).json({message2:error.message,message:"Error Occurred While calculating the share delta information.",success:false})
    }
};

const calculate_all_user_portfolio = async(req,res)=>{
    try {
        const users = await User.findAll();
        const share_exchage_data = await ShareExchangeData.findAll();
        // for those user with no mention in the share_exchage_data are inactive for more than 2 weeks

        // for every one else there id will be mentioned in the share_exchage_data
        // for those whose total standings goes to zero will become in active (prev week holdings >0 , curr week holding:0) (active->inactive)
        // those who were in active last week means last weeks holdings were 0 but curr week has holdings will become active (prev week holdings:0, curr week holding>0) (inactive->active)

        for(const user of users){
            const share_exchange_data_indexes = [];
            const shareExchangeData = await ShareExchangeData.findAll({
                where:{
                    share_owners:{
                        [sequelize.Op.contains]:[user.id]
                    }
                }
            });
            let prev_week_total=0,curr_week_total=0;
            // shareExchangeData.forEach(data=>{
            //     // calculate prev_week_total from instance of prev_share_data(id:data.prev_share_data_index)
            //     // calculate curr_week_total from instance of curr_share_data(id:data.curr_share_data_index)
            //     const prev_share_data_instance = await PrevShareData.findByPk(data.prev_share_data_index)
            //     share_exchange_data_indexes.push(data.id);
            // });

            for(let data of shareExchangeData){
                if(data.prev_share_data_index!==null){
                    const prev_share_data_instance = await PrevShareData.findByPk(data.prev_share_data_index)
                    prev_week_total += (prev_share_data_instance.share_quantity/prev_share_data_instance.share_owners.length).toFixed(3)
                }

                if(data.curr_share_data_index!==null){
                    const curr_share_data_instance = await CurrShareData.findByPk(data.curr_share_data_index)
                    curr_week_total += (curr_share_data_instance.share_quantity/curr_share_data_instance.share_owners.length).toFixed(3)
                }
                share_exchange_data_indexes.push(data.id);
            }
            
            let total_delta = curr_week_total-prev_week_total;

            if(curr_week_total == 0){
                // make the user inactive
                if(user.is_active==true){
                    user.is_active=false;
                    await user.save();
                }
            }else{
                // make the user active
                if(user.is_activee==false){
                    user.is_active=true;
                    await user.save();
                }
            }

            // save userId,share_exchange_data_indexes,prev_week_total,curr_week_total,total_delta in portfolio

            await Portfolio.create({
                userId:user.id,
                share_exchange_data_indexes,
                prev_week_total,
                curr_week_total,
                total_delta
            })
        }

        return res.status(200).json({message:"Portfolio calculated for everyone.",success:true})

    } catch (error) {
        return res.status(500).json({message2:error.message,message:"Error Occurred While calculating all user portfolio information.",success:false})
    }
};



const allApis = () => {

    // const state_wise_exchage = async(req,res)=>{

    // };

    // const city_wise_exchage = async(req,res)=>{

    // };

    // const country_wise_exchage = async(req,res)=>{

    // };

    return {

        // state_wise_exchage,
        // city_wise_exchage,
        // country_wise_exchage
    }
}

module.exports = {
    upload_formalise_and_populate_new_data,
    clear_prev_table_data,
    move_curr_to_prev,
    calculate_share_exchange,
    calculate_all_user_portfolio,
}