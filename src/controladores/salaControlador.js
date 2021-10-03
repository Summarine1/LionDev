const controller = {};

controller.list = (req,res)=>{
   req.getConnection((err, conn)=>{
       conn.query('SELECT * FROM sala', (err, salas)=>{
           if(err){
               res.json(err);
           }
           res.render('salas');
           data:salas
       });
   });
};


controller.save=(req, res)=>{
    req.getConnection((err, conn)=>{
        conn.query('INSERT INTO sala set ?', [req.body], (err,rows)=>{
            console.log(rows);
            res.send(':D');
        });
    })
}; 
module.exports=controller;