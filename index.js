import express from 'express'

const app = express()

const port = 3000;
app.use(express.json())

let footballData =[]
let newid =1
//create new player
app.post('/footballname',(req,res)=>{
    const {name,team} = req.body
    const player ={id:newid++,name,team}
    footballData.push(player)
    res.status(200).send(footballData)
    
})

//get all football players
app.get('/footballnames',(req,res)=>{
    res.status(200).send(footballData)

})

//get data by id
app.get('/footballname/:id',(req,res)=>{
    const footballer = footballData.find(football =>football.id === parseInt(req.params.id))
    if(footballer){
        res.status(200).send(footballer)
    }else{
        res.status(404).send({message:"id is not found"})
    }
})

//update data by id
app.put("/updateplayer/:id",(req,res)=>{
    const footballer = footballData.find(football => football.id === parseInt(req.params.id))
    if(!footballer){
       return res.status(404).send({message:"not found"})

    }

    const {name,team} = req.body
    footballer.name = name
    footballer.team = team
    res.status(202).send(footballer)
    

})

app.listen(port , ()=>{
    console.log(`server is running at port ${port}`);
    
})

//delete by playerid

app.delete("/deleteplayer/:id",(req,res)=>{
    const index = footballData.findIndex(football => football.id===parseInt(req.params.id))
    if(index === -1){
        res.status(404).send({message:"index not found"})
    }
    // footballData.splice(index,1)
    footballData=footballData.filter(football => football.id != parseInt(req.params.id))
    res.status(200).send({message:"deleted succesfully"})
})