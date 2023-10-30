
const Info  = require("../Model/model");

const display_all_todos = async(req,res)=>{
        try {
            const result = await Info.find({});
            res.send(result);
        } catch (error) {
            res.json({display_error:error})
            console.log("error while displaying",error)
        }
}

const add_info = async(req,res)=>{
    const {data} = req.body;
    // const id = await Info.countDocuments();
    const newData = new Info({
        data,
        // id
    })
    try {
        // await Info.create({data:data})
        await newData.save();
        res.send({msg:"success",newData}); 
        console.log(newData)
        // id+=1; 
    } catch (error) {
        res.send(error)
        console.log(error)
    }
}

const display_single_info = async(req,res)=>{
    try {
        const result = await Info.findOne({_id:req.params.id})
        if(!result)
            res.send(`no such record found with id:${req.params.id}`)
        else    
            res.send(result);
        console.log(req.params.id,"here")
    } catch (error) {
        res.send(error);     
    }
}

const delete_info = async(req,res)=>{
    try {
        await Info.findOneAndDelete({ _id:req.params.id})
        console.log(req.params.id);
        res.send("Success")
    } catch (error) {
        res.status(500).json(error.message)
        console.log(error)
    }
} 
 
const edit_info = async(req,res)=>{
    try {
        console.log(req.body)
        const newtask = 
        await Info.findOneAndUpdate(
            { _id:req.params.id},
            { data:req.body.data},
            { returnNewDocument: true}
            )
        await newtask.save();
        console.log(newtask)
        // return res.status(201).send(newtask)
        res.send("Success")
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}
module.exports = {display_all_todos,add_info,display_single_info,delete_info,edit_info,delete_info} 